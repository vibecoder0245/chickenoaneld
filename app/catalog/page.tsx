import { redirect } from "next/navigation"

export default function CatalogRedirectPage() {
  // Redirect from the base /catalog page to the first category, e.g., Fortnite.
  redirect("/catalog/fortnite")
}
