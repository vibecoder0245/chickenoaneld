import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"

import type { Product } from "@/lib/products"
import { CyberButton } from "@/components/ui/cyber-button"

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  /* DEBUG 1: This log MUST appear. */
  console.log(
    "✅ ProductCard RENDERED for:",
    product.slug,
    "| Input carouselImage:",
    product.carouselImage,
    "| Input image:",
    product.image,
  )

  const imgSrc = product.carouselImage ?? product.image ?? "/placeholder.svg?height=400&width=300"

  /* DEBUG 2: This log shows the FINAL image source being used. */
  console.log("➡️ ProductCard for:", product.slug, "| FINAL imgSrc:", imgSrc)

  const displayPrice =
    product.purchaseOptions && product.purchaseOptions.length > 0 ? product.purchaseOptions[0].displayPrice : "N/A"

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/20">
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name} />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          key={imgSrc} // Adding a key might help if Next/Image is caching aggressively based on props
          src={imgSrc || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
          priority={product.slug === "r6-ultimate"} // Prioritize loading for the R6 image for testing
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-neutral-50">{product.name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-blue-400">{displayPrice}</p>
          <CyberButton size="sm" variant="secondary" className="z-20 relative">
            <Eye className="h-4 w-4" />
            <span className="ml-2">View</span>
          </CyberButton>
        </div>
      </div>
    </div>
  )
}
