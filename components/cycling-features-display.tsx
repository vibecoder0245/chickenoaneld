"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile" // Ensure this path is correct
import { cn } from "@/lib/utils"

const DEFAULT_WORDS = ["Performance", "Security", "Reliability", "Speed"]
const DEFAULT_STATIC_MOBILE_WORD = "Precision"

interface CyclingFeaturesDisplayProps {
  /** Words to cycle through on desktop. */
  featureWords?: string[]
  /** Interval in milliseconds for word cycling. */
  interval?: number
  /** Additional CSS classes for the root element. */
  className?: string
  /** CSS classes for the text itself (applies to both static and cycling words). */
  textClassName?: string
  /** The static word to display on mobile devices. */
  staticMobileWord?: string
}

export default function CyclingFeaturesDisplay({
  featureWords = DEFAULT_WORDS,
  interval = 2000,
  className,
  textClassName,
  staticMobileWord = DEFAULT_STATIC_MOBILE_WORD,
}: CyclingFeaturesDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted || isMobile || !featureWords || featureWords.length === 0) {
      return // Don't start interval if not mounted, on mobile, or no words
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featureWords.length)
    }, interval)

    return () => clearInterval(timer)
  }, [hasMounted, isMobile, featureWords, interval])

  const effectiveTextClassName = cn("inline-block", textClassName)

  if (!hasMounted || isMobile) {
    // Render static word if not mounted yet (SSR, initial client render) or if mobile
    return (
      <span className={cn("inline-block", className)}>
        <span className={effectiveTextClassName}>{staticMobileWord}</span>
      </span>
    )
  }

  // Desktop: Original cycling functionality
  if (!featureWords || featureWords.length === 0) {
    // Handle case with no words for desktop
    return (
      <span className={cn("inline-block", className)}>
        <span className={effectiveTextClassName}></span>
      </span>
    )
  }

  return (
    <span className={cn("inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={featureWords[currentIndex]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={effectiveTextClassName}
        >
          {featureWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
