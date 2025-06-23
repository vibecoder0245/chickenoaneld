import type { Metadata } from "next"
import AllProductsClientPage from "./AllProductsClientPage" // This import should now be correct

export const metadata: Metadata = {
  title: "CDN Cheats - All Products",
  description: "Browse all available products from CDN Cheats, organized by game category.",
}

export default function AllProductsPage() {
  return <AllProductsClientPage />
}
