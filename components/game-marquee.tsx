"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { carouselImages } from "@/lib/carousel-images"

const gameMarqueeItems = carouselImages

export default function GameMarquee() {
  if (!gameMarqueeItems || gameMarqueeItems.length === 0) {
    return <div className="py-10 text-center text-neutral-400">No games to display.</div>
  }

  const duplicatedItems = [...gameMarqueeItems, ...gameMarqueeItems, ...gameMarqueeItems]

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg py-4">
      <div
        className="group/marquee flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]"
        style={{ "--duration": "80s" } as React.CSSProperties}
      >
        {/* First set of items (visible and focusable) */}
        <div className="flex shrink-0 animate-marquee-rtl justify-around [gap:var(--gap)] group-hover/marquee:[animation-play-state:paused]">
          {duplicatedItems.map((item, i) => (
            <Link
              key={`${item.id}-1-${i}`}
              href={item.href}
              className="relative mx-4 h-80 w-60 flex-shrink-0 group"
              aria-label={`Go to ${item.id} page`}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                priority={i < gameMarqueeItems.length} // Prioritize only the first actual set
                className="object-cover rounded-2xl duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 70vw, 240px"
              />
            </Link>
          ))}
        </div>
        {/* Second set of items (aria-hidden and not focusable) */}
        <div
          className="flex shrink-0 animate-marquee-rtl justify-around [gap:var(--gap)] group-hover/marquee:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {duplicatedItems.map((item, i) => (
            <Link
              key={`${item.id}-2-${i}`}
              href={item.href}
              className="relative mx-4 h-80 w-60 flex-shrink-0 group"
              tabIndex={-1} // Make non-focusable
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt="" // Alt text can be empty for decorative images in aria-hidden container
                fill
                priority={false}
                className="object-cover rounded-2xl duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 70vw, 240px"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[50px] sm:w-[100px] bg-gradient-to-r from-neutral-950 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[50px] sm:w-[100px] bg-gradient-to-l from-neutral-950 to-transparent"></div>
    </div>
  )
}
