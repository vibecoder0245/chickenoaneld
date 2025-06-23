"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react" // Keep ShoppingCart for the "View Product" button
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"
// AddToCartButton is no longer needed here
// import { AddToCartButton } from "./product/add-to-cart-button"

interface ProductCardV2Props {
  product: Product
}

export function ProductCardV2({ product }: ProductCardV2Props) {
  const isUpdating = product.stockStatus === "updating"
  const isOffline = product.stockStatus === "offline"
  const isUnavailable = isUpdating || isOffline

  // Determine the starting price
  const sortedOptions = product.purchaseOptions ? [...product.purchaseOptions].sort((a, b) => a.price - b.price) : []
  const startingDisplayPrice = sortedOptions.length > 0 ? sortedOptions[0].displayPrice : "N/A"

  return (
    <div className="group relative z-10 w-full rounded-3xl border border-white/10 bg-white bg-opacity-[0.04] p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/5 flex flex-col">
      <Link href={`/products/${product.slug}`} className={cn("block", isUnavailable && "pointer-events-none")}>
        <div className="relative h-[200px] cursor-pointer overflow-hidden rounded-2xl">
          <Image
            alt={product.displayName || product.name}
            loading="lazy"
            width={600}
            height={400}
            decoding="async"
            className="h-full w-full rounded-2xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            src={product.image || "/placeholder.svg?width=600&height=400&query=product+image"}
            style={{ color: "transparent" }}
          />
          {isUnavailable && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl">
              <span className="text-white font-bold text-lg uppercase tracking-wider">
                {isUpdating ? "Updating" : "Offline"}
              </span>
            </div>
          )}
          {product.tag && !isUnavailable && (
            <div className="absolute top-3 left-3 z-20">
              <span className="rounded-md border border-gray-600/50 bg-black/40 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-gray-200 shadow-md">
                {product.tag}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <h3 className="text-lg font-semibold text-white leading-tight">
          <Link
            href={`/products/${product.slug}`}
            className={cn("hover:text-blue-400 transition-colors", isUnavailable && "pointer-events-none")}
          >
            {product.displayName || product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-400/80 line-clamp-2 flex-grow min-h-[40px]">{product.description}</p>

        {/* Updated Action Area */}
        <div className="mt-auto flex w-full flex-row items-center justify-between gap-3 pt-2">
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "flex-1 h-11 inline-flex items-center justify-center gap-2 whitespace-nowrap",
              "text-sm font-medium text-gray-300",
              "rounded-full border border-white/10 bg-[#383a40] hover:bg-[#4a4c52]", // Using a slightly darker gray, rounded-lg
              "shadow-md",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-neutral-950",
              isUnavailable && "opacity-50 pointer-events-none",
            )}
            aria-disabled={isUnavailable}
            tabIndex={isUnavailable ? -1 : undefined}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>View Product</span>
          </Link>

          <div className="flex flex-col items-end whitespace-nowrap pl-2">
            {isUnavailable || !product.purchaseOptions || product.purchaseOptions.length === 0 ? (
              <>
                <span className="text-xs text-gray-500">Price</span>
                <span className="text-2xl font-bold text-gray-400">N/A</span>
              </>
            ) : (
              <>
                <span className="text-xs text-gray-500">From</span>
                <span className="text-2xl font-bold text-blue-400">{startingDisplayPrice}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
