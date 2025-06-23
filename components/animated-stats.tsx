"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Star, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCounterAnimation } from "@/hooks/use-counter-animation" // Import the hook

interface StatItemProps {
  targetValue: number // The numerical value to animate to
  label: string
  suffix?: string
  isRating?: boolean
  delay: number
  animationDuration?: number
}

const StatItem: React.FC<StatItemProps> = ({
  targetValue,
  label,
  suffix,
  isRating = false,
  delay,
  animationDuration = 2000, // Default animation duration
}) => {
  // Use the counter animation hook
  // The hook's delay parameter is used to stagger the start of each stat's animation
  const animatedCount = useCounterAnimation(targetValue, 0, animationDuration, delay)

  let displayValue: string
  if (isRating) {
    // For ratings, format to one decimal place
    displayValue = animatedCount.toFixed(1)
    // Ensure that if the target is an integer (e.g. 5.0), it doesn't display as "5.0" if not desired
    // However, for 4.9, toFixed(1) is correct.
    // If targetValue has no decimal, and animatedCount is at targetValue, remove .0
    if (targetValue % 1 === 0 && animatedCount === targetValue) {
      displayValue = targetValue.toString()
    }
  } else {
    // For other numbers, display as an integer
    displayValue = Math.floor(animatedCount).toString()
  }

  return (
    <motion.div
      className="flex flex-col items-center text-center mx-2 sm:mx-4 w-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // The motion.div's delay is slightly offset from the counter's delay for visual sync
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className="flex items-baseline justify-center">
        <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
          {displayValue}
        </span>
        {suffix && !isRating && (
          <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 ml-0.5">
            {suffix}
          </span>
        )}
        {isRating && <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-blue-400 inline-block ml-1" />}
      </div>
      <p className="text-[10px] xs:text-[11px] sm:text-xs text-foreground/60 dark:text-foreground/50 uppercase tracking-wider font-medium mt-1">
        {label}
      </p>
    </motion.div>
  )
}

export default function AnimatedStats() {
  const statsData = useMemo(
    () => [
      { targetValue: 100, suffix: "%", label: "Undetected", delay: 0 },
      { targetValue: 24, suffix: "/7", label: "Support", delay: 200 }, // Stagger delays
      { targetValue: 11, suffix: "K+", label: "Users", delay: 400 }, // Animate to 11, "K+" is suffix
      { targetValue: 4.9, label: "Rating", delay: 600, isRating: true },
    ],
    [],
  )

  return (
    <div className="flex flex-col items-center my-8 md:my-10">
      <Badge
        variant="outline"
        className="mb-4 border-brand/50 text-brand bg-brand/10 py-1 px-3 text-xs font-medium backdrop-blur-sm"
      >
        <Zap className="w-3.5 h-3.5 mr-2 text-brand" /> {/* Ensure icon color matches */}
        Our Stats
      </Badge>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-5 sm:gap-x-3 sm:gap-y-6 place-items-center w-full max-w-2xl px-2">
        {statsData.map((stat) => (
          <StatItem
            key={stat.label}
            targetValue={stat.targetValue}
            label={stat.label}
            suffix={stat.suffix}
            isRating={stat.isRating}
            delay={stat.delay}
            // animationDuration={2000} // Optionally pass duration
          />
        ))}
      </div>
    </div>
  )
}
