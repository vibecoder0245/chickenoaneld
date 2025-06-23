import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { categoryMap, type ProductCategory } from "@/lib/products"
import CategoryPageClient from "./CategoryPageClient"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryKey = params.category as Exclude<ProductCategory, "all">

  // If 'all' is attempted on this dynamic route, or category is invalid, show 404
  if (params.category === "all" || !categoryMap[categoryKey] || categoryMap[categoryKey] === categoryMap.all) {
    notFound()
  }

  const categoryName = categoryMap[categoryKey]
  return {
    title: `CDN Cheats - ${categoryName}`,
    description: `Browse all our products for ${categoryName}.`,
  }
}

export function generateStaticParams() {
  return Object.keys(categoryMap)
    .filter((category) => category !== "all") // Exclude 'all' from static params for this page
    .map((category) => ({
      category,
    }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryKey = params.category as Exclude<ProductCategory, "all">

  // Double-check to ensure 'all' doesn't render this client component
  if (params.category === "all" || !categoryMap[categoryKey] || categoryMap[categoryKey] === categoryMap.all) {
    notFound()
  }

  return <CategoryPageClient params={params} />
}
