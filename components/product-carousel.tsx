"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products as allProducts, type Product } from "@/lib/products" // Ensure Product type is exported or defined
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

const TRANSITION_DURATION = 500 // ms, keep in sync with Tailwind duration class

export default function ProductCarousel() {
  const carouselProductSlugs = [
    "fn-private",
    "fn-supreme",
    "rust-ultimate",
    "rust-supreme",
    "r6-ultimate",
    "cod-bo6-blaze",
  ]

  const productsToShow = useMemo(
    () => allProducts.filter((p) => carouselProductSlugs.includes(p.slug)),
    [carouselProductSlugs], // carouselProductSlugs is constant, so this memoizes productsToShow effectively
  )

  const [visibleItems, setVisibleItems] = useState(4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  const enableInfiniteScroll = useMemo(
    () => productsToShow.length > visibleItems,
    [productsToShow.length, visibleItems],
  )

  // Effect to initialize/reset carousel state when products, visibility, or mode changes
  useEffect(() => {
    if (productsToShow.length === 0) {
      setDisplayProducts([])
      setCurrentIndex(0)
      return
    }

    if (enableInfiniteScroll) {
      // Slice carefully: if visibleItems > productsToShow.length, slice might behave unexpectedly for prepending.
      // However, enableInfiniteScroll condition already handles this.
      const itemsToPrepend = productsToShow.slice(productsToShow.length - visibleItems)
      const itemsToAppend = productsToShow.slice(0, visibleItems)
      setDisplayProducts([...itemsToPrepend, ...productsToShow, ...itemsToAppend])
      setCurrentIndex(visibleItems) // Start at the first "real" item
    } else {
      setDisplayProducts(productsToShow)
      setCurrentIndex(0)
    }
    setIsTransitionEnabled(true) // Ensure transitions are on after reset
  }, [productsToShow, visibleItems, enableInfiniteScroll])

  // Effect for handling window resize and setting visibleItems
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1)
      else if (window.innerWidth < 768) setVisibleItems(2)
      else if (window.innerWidth < 1024) setVisibleItems(3)
      else setVisibleItems(4)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Effect for handling the "jump" in infinite scroll
  useEffect(() => {
    if (!enableInfiniteScroll || !isTransitionEnabled) {
      // If not infinite, or if a jump is already in progress (transition disabled), do nothing.
      // The second part (isTransitionEnabled) is key to allow the non-transitioned jump to complete.
      return
    }

    const actualItemCount = productsToShow.length
    let jumpTimeoutId: NodeJS.Timeout

    // Check if we've slid to the appended clones (representing the start of the list)
    if (currentIndex === actualItemCount + visibleItems) {
      jumpTimeoutId = setTimeout(() => {
        setIsTransitionEnabled(false) // Disable transition for the jump
        setCurrentIndex(visibleItems) // Jump to the actual start
        // Force a reflow/repaint before re-enabling transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitionEnabled(true)
          })
        })
      }, TRANSITION_DURATION)
    }
    // Check if we've slid to the prepended clones (representing the end of the list)
    else if (currentIndex === visibleItems - 1) {
      jumpTimeoutId = setTimeout(() => {
        setIsTransitionEnabled(false) // Disable transition for the jump
        setCurrentIndex(actualItemCount + visibleItems - 1) // Jump to the actual end
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitionEnabled(true)
          })
        })
      }, TRANSITION_DURATION)
    }

    return () => {
      if (jumpTimeoutId) clearTimeout(jumpTimeoutId)
    }
  }, [currentIndex, productsToShow.length, visibleItems, enableInfiniteScroll, isTransitionEnabled])

  const nextSlide = useCallback(() => {
    if (!enableInfiniteScroll && currentIndex >= productsToShow.length - visibleItems) return

    setIsTransitionEnabled(true) // Ensure transition is on for user-initiated slides
    setCurrentIndex((prev) => prev + 1)
  }, [enableInfiniteScroll, currentIndex, productsToShow.length, visibleItems])

  const prevSlide = useCallback(() => {
    if (!enableInfiniteScroll && currentIndex === 0) return

    setIsTransitionEnabled(true) // Ensure transition is on for user-initiated slides
    setCurrentIndex((prev) => prev - 1)
  }, [enableInfiniteScroll, currentIndex])

  if (productsToShow.length === 0) {
    return <div className="text-center py-10">No products to display in carousel.</div>
  }

  const isPrevDisabled = !enableInfiniteScroll && currentIndex === 0
  const isNextDisabled = !enableInfiniteScroll && currentIndex >= productsToShow.length - visibleItems

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/50 border-border text-foreground hover:bg-primary/10"
          onClick={prevSlide}
          disabled={isPrevDisabled || (productsToShow.length <= visibleItems && !enableInfiniteScroll)}
          aria-label="Previous products"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>

      <div className="overflow-hidden">
        <div
          className={cn("flex ease-out", {
            "transition-transform duration-500": isTransitionEnabled, // TRANSITION_DURATION should match 500
          })}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {displayProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`} // Ensure unique keys if products are cloned
              className="p-2"
              style={{ minWidth: `${100 / visibleItems}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/50 border-border text-foreground hover:bg-primary/10"
          onClick={nextSlide}
          disabled={isNextDisabled || (productsToShow.length <= visibleItems && !enableInfiniteScroll)}
          aria-label="Next products"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
