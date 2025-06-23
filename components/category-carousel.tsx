"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
// We are deliberately NOT using 'products' or 'categoryMap' from lib/products for this test

export interface TestCarouselItem {
  id: string
  name: string
  image: string
  slug: string
  logoImage?: string
}

// --- HARDCODED TEST ITEMS ---
const testItems: TestCarouselItem[] = [
  {
    id: "test1",
    name: "TEST ITEM 1 - SHOULD BE VISIBLE",
    image: "/placeholder.svg?width=288&height=384",
    slug: "test1",
    logoImage: "/placeholder.svg?width=128&height=40",
  },
  {
    id: "test2",
    name: "TEST ITEM 2 - SHOULD BE VISIBLE",
    image: "/placeholder.svg?width=288&height=384",
    slug: "test2",
    logoImage: "/placeholder.svg?width=128&height=40",
  },
]
// --- END HARDCODED TEST ITEMS ---

const GameCard = ({ item, priorityLoad }: { item: TestCarouselItem; priorityLoad: boolean }) => (
  <Link href={`/catalog/${item.slug}`} className="block group/card" aria-label={`View ${item.name} products`}>
    <figure
      className={cn(
        "relative flex h-80 w-60 sm:h-96 sm:w-72 cursor-pointer flex-col items-center justify-end rounded-2xl overflow-hidden shadow-xl bg-neutral-900/80 backdrop-blur-sm",
        "transition-all duration-300 ease-out-quart",
        "group-hover/card:[transform:perspective(800px)_rotateX(2deg)_rotateY(-4deg)_scale(1.05)] group-hover/card:shadow-brand/40 group-hover/card:shadow-2xl",
      )}
    >
      <Image
        src={item.image || "/placeholder.svg"} // Using hardcoded image
        alt={item.name}
        fill
        className="h-full w-full rounded-2xl object-cover transition-transform duration-500 ease-out-quart group-hover/card:scale-105"
        sizes="(max-width: 640px) 60vw, (max-width: 768px) 72vw, 288px"
        priority={priorityLoad}
      />
      <div className="absolute bottom-0 h-2/3 w-full rounded-xl bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2 p-4 z-10">
        {item.logoImage && (
          <div className="relative h-10 w-32 md:h-12 md:w-36">
            <Image
              src={item.logoImage || "/placeholder.svg"} // Using hardcoded logo
              alt={`${item.name} Logo`}
              fill
              className={cn("object-contain")}
              sizes="128px"
            />
          </div>
        )}
        <figcaption className="text-center font-mono text-sm sm:text-base font-semibold text-neutral-100 group-hover/card:text-white transition-colors">
          {item.name} {/* Displaying hardcoded name */}
        </figcaption>
      </div>
      <span
        className={cn(
          "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "animate-button-shimmer bg-[length:200%_100%] opacity-0 group-hover/card:opacity-30 transition-opacity duration-500",
        )}
        style={{ backgroundPosition: "200% 0" }}
        aria-hidden="true"
      />
    </figure>
  </Link>
)

export default function CategoryCarousel() {
  if (!testItems || testItems.length === 0) {
    return <div className="py-10 text-center text-neutral-400">No TEST items to display.</div>
  }

  const itemsToRender = [...testItems, ...testItems, ...testItems] // Duplicating hardcoded items

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg py-8 border-4 border-red-500">
      {" "}
      {/* ADDED RED BORDER FOR VISIBILITY */}
      <p className="text-red-500 text-2xl font-bold p-4">
        THIS IS THE TEST CAROUSEL - IF YOU SEE THIS, THE FILE IS UPDATING
      </p>
      <div
        className="group/marquee flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)]"
        style={{ "--duration": "20s" } as React.CSSProperties} // Faster for testing
      >
        <div className="flex shrink-0 animate-marquee-rtl justify-around [gap:var(--gap)] group-hover/marquee:[animation-play-state:paused]">
          {itemsToRender.map((item, index) => (
            <GameCard item={item} key={`${item.id}-set1-${index}`} priorityLoad={index < testItems.length} />
          ))}
        </div>
        <div
          className="flex shrink-0 animate-marquee-rtl justify-around [gap:var(--gap)] group-hover/marquee:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {itemsToRender.map((item, index) => (
            <GameCard item={item} key={`${item.id}-set2-${index}`} priorityLoad={false} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[50px] sm:w-[100px] bg-gradient-to-r from-background to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[50px] sm:w-[100px] bg-gradient-to-l from-background to-transparent"></div>
    </div>
  )
}
