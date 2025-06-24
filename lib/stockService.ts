// lib/stockService.ts
import "server-only";

const shopifyQL = `
query getInventory($first:Int!){
  products(first:$first){
    edges{
      node{
        id
        title
        variants(first:20){edges{node{sku inventoryQuantity}}}
      }
    }
  }
}`;

type StockRow = {
  sku: string;
  provider: "Shopify" | "SellAuth";
  qty: number;
};

export async function getLiveStock(): Promise<StockRow[]> {
  const rows: StockRow[] = [];

  /* -------- Shopify -------- */
  try {
    const r = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: shopifyQL, variables: { first: 100 } }),
      }
    ).then((x) => x.json());

    r.data.products.edges.forEach((p: any) =>
      p.node.variants.edges.forEach(({ node }: any) =>
        rows.push({
          sku: node.sku ?? p.node.title,
          provider: "Shopify",
          qty: node.inventoryQuantity ?? 0,
        })
      )
    );
  } catch (e) {
    console.error("[Shopify] stock fetch failed", e);
  }

  /* -------- SellAuth -------- */
  try {
    const sell = await fetch(
      `https://api.sellauth.com/v1/inventory?shop_id=${process.env.SELLAUTH_SHOP_ID}`,
      {
        headers: { Authorization: `Bearer ${process.env.SELLAUTH_API_KEY}` },
        next: { revalidate: 60 }, // cache 1 min
      }
    );

    // if SellAuth sends Cloudflare HTML we bail out
    if (sell.headers
      .get("content-type")
      ?.startsWith("text/html")) throw new Error("SellAuth Cloudflare page");

    const json = (await sell.json()) as { sku: string; quantity: number }[];
    json.forEach((x) =>
      rows.push({ sku: x.sku, provider: "SellAuth", qty: x.quantity })
    );
  } catch (e) {
    console.error("[SellAuth] stock fetch failed", e);
  }

  return rows;
}

/* ---------- “Add Keys” helper ---------- */
export async function addKeysToSellAuth(
  sku: string,
  keys: string[]
): Promise<boolean> {
  const r = await fetch(
    `https://api.sellauth.com/v1/keys/import?shop_id=${process.env.SELLAUTH_SHOP_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SELLAUTH_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sku, keys }),
    }
  );
  return r.ok;
}
