/* ------------------------------------------------------------------
   lib/stockService.ts
   – merges stock from Shopify-EDP and SellAuth into one object
   – return shape:  { "EDP-123": 42, "SA-77": 9 }
   ---------------------------------------------------------------- */

import "server-only"                // ⬅ server component safety
import { headers } from "next/headers"

/* =========================================================================
   1.  ENV ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

const {
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_STORE_DOMAIN,
  SELLAUTH_API_KEY,
  SELLAUTH_SHOP_ID,
} = process.env

if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN)
  console.warn("[stockService]  Missing Shopify env vars")

if (!SELLAUTH_API_KEY || !SELLAUTH_SHOP_ID)
  console.warn("[stockService]  Missing SellAuth env vars")

/* =========================================================================
   2.  HELPERS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

type StockHash = Record<string, number>

async function fetchShopify(): Promise<StockHash> {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN) return {}

  /* A simple Storefront-API query that returns quantityAvailable per variant */
  const query = /* GraphQL */ `
    {
      products(first: 50) {
        edges {
          node {
            id
            variants(first: 10) {
              edges {
                node {
                  id
                  sku
                  quantityAvailable
                }
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
    // guarantee fresh data in Server Components 👇
    next: { revalidate: 0, tags: ["shopify-stock"] },
  })

  if (!res.ok) {
    console.error("[Shopify] stock fetch failed", await res.text())
    return {}
  }

  const json = (await res.json()) as any
  const out: StockHash = {}

  json.data.products.edges.forEach((p: any) =>
    p.node.variants.edges.forEach((v: any) => {
      if (v.node.sku)
        out[`EDP-${v.node.sku}`] = v.node.quantityAvailable ?? 0
    }),
  )

  return out
}

async function fetchSellAuth(): Promise<StockHash> {
  if (!SELLAUTH_API_KEY || !SELLAUTH_SHOP_ID) return {}

  const url = `https://seller-api.sellauth.com/v1/shops/${SELLAUTH_SHOP_ID}/products/stock`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SELLAUTH_API_KEY}` },
    next: { revalidate: 0, tags: ["sellauth-stock"] },
  })

  if (!res.ok) {
    console.error("[SellAuth] stock fetch failed", await res.text())
    return {}
  }

  /* expected: [{id:"77", sku:"VALO-77", stock:12}, …] */
  const arr = (await res.json()) as { id: string; sku?: string; stock: number }[]
  const out: StockHash = {}

  arr.forEach((p) => (out[`SA-${p.id}`] = p.stock))
  return out
}

/* =========================================================================
   3.  PUBLIC API  ––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

export async function getUnifiedStock(): Promise<StockHash> {
  /* Run both fetches in parallel – no caching so every dashboard load is fresh */
  const [edp, sa] = await Promise.all([fetchShopify(), fetchSellAuth()])

  /* merge hashes */
  return { ...edp, ...sa }
}
