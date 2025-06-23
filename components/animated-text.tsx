"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  baseText: string
  alternatingWords: string[]
  className?: string // For the root H1 layout/positioning
  wordClassName?: string // For the styling of the text itself (font, color, gradient, etc.)
  animationDuration?: number // in seconds
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  baseText,
  alternatingWords,
  className,
  wordClassName,
  animationDuration = 3, // Default duration for each word display
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (alternatingWords.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % alternatingWords.length)
    }, animationDuration * 1000) // Convert seconds to milliseconds

    return () => clearInterval(interval)
  }, [alternatingWords, animationDuration])

  if (alternatingWords.length === 0) {
    // If no alternating words, just display baseText with combined classes
    return <h1 className={cn(className, wordClassName)}>{baseText}</h1>
  }

  // Find the longest word to set a min-width for the container of the animated word
  const longestWord = alternatingWords.reduce((a, b) => (a.length > b.length ? a : b), "")

  return (
    <h1 className={cn("flex items-baseline justify-center whitespace-nowrap", className)}>
      <span className={cn(wordClassName)}>{baseText}&nbsp;</span>
      <div className="relative inline-block align-baseline">
        {" "}
        {/* Container for sizer and animated word */}
        {/* Sizer element: invisible, but sets the width. Crucially uses wordClassName for accurate sizing. */}
        <span className={cn("invisible", wordClassName)} aria-hidden="true">
          {longestWord}
        </span>
        {/* Animated word: absolutely positioned within the sizer's space */}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn("absolute inset-0 text-left", wordClassName)} // text-left ensures shorter words align left
          >
            {alternatingWords[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </h1>
  )
}

export default AnimatedText
