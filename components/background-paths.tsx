"use client"

import Link from "next/link"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // Assuming you have this
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface FloatingPathsProps {
  position: number
  className?: string
}

function SingleFloatingPathsSet({ position, className }: FloatingPathsProps) {
  const paths = Array.from({ length: 18 }, (_, i) => ({
    // Reduced number for performance
    id: i,
    d: `M-${380 - i * 10 * position} -${189 + i * 12}C-${
      380 - i * 10 * position
    } -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${
      152 - i * 10 * position
    } ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${
      684 - i * 10 * position
    } ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`,
    // color: `rgba(15,23,42,${0.05 + i * 0.015})`, // Adjusted opacity
    width: 0.3 + i * 0.02, // Adjusted width
  }))

  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>Background Paths</title>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor" // Will inherit text color (e.g., text-slate-950/10 dark:text-white/10)
          strokeWidth={path.width}
          strokeOpacity={0.05 + path.id * 0.015} // Use direct opacity
          initial={{ pathLength: 0.3, opacity: 0.6 }} // Opacity here is for the motion itself
          animate={{
            pathLength: 1,
            opacity: [0.1, 0.3, 0.1], // Pulsing opacity for the animation
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 30 + Math.random() * 15, // Slower, more varied
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  )
}

interface BackgroundPathsPageProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  children?: React.ReactNode // To allow embedding this as a section background
  className?: string
  contentClassName?: string
  fullScreen?: boolean // If true, it takes min-h-screen
}

export default function BackgroundPaths({
  title = "Unlock Advanced Features",
  subtitle = "Experience the next level of gaming with our sophisticated cheat engine, designed for precision and power.",
  ctaText = "Explore Features",
  ctaLink = "#features",
  children,
  className,
  contentClassName,
  fullScreen = false,
}: BackgroundPathsPageProps) {
  const words = title.split(" ")

  if (children) {
    return (
      <div className={cn("relative w-full overflow-hidden", className)}>
        <div className="absolute inset-0 pointer-events-none text-foreground/10 dark:text-white/5">
          <SingleFloatingPathsSet position={1} />
          <SingleFloatingPathsSet position={-1} className="opacity-70" />
        </div>
        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden bg-background",
        fullScreen ? "min-h-screen" : "py-20 md:py-32",
        className,
      )}
    >
      <div className="absolute inset-0 pointer-events-none text-foreground/10 dark:text-white/5">
        <SingleFloatingPathsSet position={1} />
        <SingleFloatingPathsSet position={-1} className="opacity-70" />
      </div>

      <div className={cn("relative z-10 container mx-auto px-4 md:px-6 text-center", contentClassName)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-3 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.08 + letterIndex * 0.025,
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-br from-foreground to-foreground/70 
                                        dark:from-white dark:to-white/70"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-foreground/70 dark:text-white/60 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          )}

          {ctaText && ctaLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            >
              <Button
                size="lg"
                asChild
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold
                         text-white transition-all duration-300 ease-out-quart overflow-hidden
                         bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple hover:from-brand-blue/90 hover:via-brand-cyan/90 hover:to-brand-purple/90
                         rounded-lg shadow-lg hover:shadow-brand-cyan/40 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-background"
              >
                <Link href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
