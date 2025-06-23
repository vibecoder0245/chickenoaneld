"use client"
import Link from "next/link"
import { Eye } from "lucide-react"
import { getAllProducts, categoryMap, type ProductCategory, type Product } from "@/lib/products"
import NewHeader from "@/components/new-header"
import { ProductCardV2 } from "@/components/product-card-v2"
import { CategorySwitcher } from "@/components/category-switcher"
import { ScrollFadeIn } from "@/components/scroll-fade-in"

export default function AllProductsClientPage() {
  const allProducts = JSON.parse(JSON.stringify(getAllProducts())) as Product[]

  const productsByCategory: Partial<Record<Exclude<ProductCategory, "all">, Product[]>> = {}
  allProducts.forEach((product) => {
    // Ensure product.category is a valid key and not 'all'
    if (product.category && product.category !== "all") {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = []
      }
      productsByCategory[product.category]!.push(product)
    }
  })

  // Order categories as they appear in categoryMap (excluding 'all')
  const orderedCategoryKeys = Object.keys(categoryMap).filter((key) => key !== "all") as Exclude<
    ProductCategory,
    "all"
  >[]

  return (
    <div className="bg-background text-foreground">
      <NewHeader />
      <main className="relative">
        <div className="pointer-events-none fixed left-[-10%] top-0 z-0 h-96 w-[700px] -rotate-45 animate-pulse rounded-full bg-gradient-to-br from-indigo-500/20 via-transparent to-blue-500/30 blur-[100px] duration-5000"></div>
        <div className="pointer-events-none fixed bottom-0 right-[-10%] z-0 h-96 w-[700px] -rotate-45 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/30 blur-[100px] duration-5000"></div>

        <div className="relative container mx-auto mt-[70px] px-4 pb-20 pt-10 sm:pb-40">
          <div className="relative z-10 flex flex-col gap-4">
            <ScrollFadeIn>
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <nav aria-label="breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
                      <li className="inline-flex items-center gap-1.5">
                        <Link href="/" className="transition-colors hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <span className="text-gray-600">/</span>
                        <span className="text-white">Products</span> {/* Current page is "All Products" */}
                      </li>
                    </ol>
                  </nav>
                  <h1 className="text-blue-400 text-4xl font-semibold">All Products</h1>
                </div>
                <CategorySwitcher currentCategory="all" />
              </div>
            </ScrollFadeIn>

            {orderedCategoryKeys.map((categoryKey) => {
              const productsInCategory = productsByCategory[categoryKey]
              const categoryName = categoryMap[categoryKey]

              if (productsInCategory && productsInCategory.length > 0) {
                return (
                  <div key={categoryKey} className="flex flex-col gap-10 overflow-hidden pt-10">
                    <ScrollFadeIn>
                      <div className="relative mb-4 flex items-center">
                        <span className="text-3xl font-bold text-white sm:text-4xl">{categoryName}</span>
                        <span className="absolute bottom-0 left-0 select-none whitespace-nowrap bg-gradient-to-b from-white to-transparent bg-clip-text text-6xl font-bold text-transparent opacity-5 md:text-[70px] md:leading-[70px]">
                          {categoryName}
                        </span>
                      </div>
                    </ScrollFadeIn>
                    <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {productsInCategory.map((product, index) => (
                        <ScrollFadeIn key={product.id} delay={index * 0.05}>
                          <ProductCardV2 product={product} />
                        </ScrollFadeIn>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            })}

            {allProducts.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p>No products found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Footer is rendered by app/layout.tsx, so it's not explicitly here */}
    </div>
  )
}
