"use client"

import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GameLogo {
  name: string
  logo: string
  width: number
  height: number
}

const gameLogos: GameLogo[] = [
  { name: "Fortnite", logo: "/placeholder.svg?width=120&height=40", width: 120, height: 40 },
  { name: "COD", logo: "/placeholder.svg?width=120&height=40", width: 120, height: 40 },
  { name: "Rust", logo: "/placeholder.svg?width=90&height=40", width: 90, height: 40 },
  { name: "Rainbow Six Siege", logo: "/placeholder.svg?width=150&height=40", width: 150, height: 40 },
]

const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  ...props
}: {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  [key: string]: any
}) => {
  return (
    <div
      {...props}
      className={cn(
        "group/marquee flex overflow-hidden p-2 [--duration:60s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover/marquee:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

export default function GameMarqueeCarousel() {
  if (gameLogos.length === 0) {
    return null
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 bg-background/70 backdrop-blur-sm">
      <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem_md:4rem]">
        {gameLogos.map((game) => (
          <div
            key={game.name}
            className="group relative flex items-center justify-center h-10 mx-4 overflow-hidden rounded-md"
          >
            <Image
              src={game.logo || "/placeholder.svg"}
              alt={`${game.name} logo`}
              width={game.width}
              height={game.height}
              className="object-contain h-full w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span
              className={cn(
                "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent",
                "animate-button-shimmer bg-[length:200%_100%]",
                "opacity-0 group-hover:opacity-50 transition-opacity duration-500 ease-out-quart",
                "pointer-events-none",
              )}
              style={{ backgroundPosition: "200% 0" }}
              aria-hidden="true"
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}
