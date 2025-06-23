"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"

interface ScrollFadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  once?: boolean
}

export function ScrollFadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  once = true,
}: ScrollFadeInProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once }} variants={variants}>
      {children}
    </motion.div>
  )
}
