// This module is intended for server-side use only.
// It uses server-only environment variables.
import Client from "shopify-buy"

const SHOPIFY_STORE_DOMAIN_SERVER = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN_SERVER = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const SHOPIFY_API_VERSION_PUBLIC = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2024-04"

if (!SHOPIFY_STORE_DOMAIN_SERVER) {
  throw new Error(
    "SHOPIFY_STORE_DOMAIN environment variable is not set. This is required for the Shopify client on the server. Ensure it's set in your Vercel project settings without the NEXT_PUBLIC_ prefix.",
  )
}
if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN_SERVER) {
  throw new Error(
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is not set. This is required for the Shopify client on the server. Ensure it's set in your Vercel project settings without the NEXT_PUBLIC_ prefix.",
  )
}

const shopifyClient = Client.buildClient({
  domain: SHOPIFY_STORE_DOMAIN_SERVER,
  storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN_SERVER,
  apiVersion: SHOPIFY_API_VERSION_PUBLIC,
})

export const shopify = shopifyClient
