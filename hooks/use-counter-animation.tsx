"use client"

import { useState, useEffect } from "react"

export function useCounterAnimation(end: number, start = 0, duration = 2000, delay = 0) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let animationFrame: number
    const timeoutId = setTimeout(() => {
      let startTime: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)

        // Ease-out quint function: t => 1 - pow(1 - t, 5)
        // Or easeOutExpo: t => t === 1 ? 1 : 1 - pow(2, -10 * t)
        const easing = 1 - Math.pow(1 - percentage, 4) // Using easeOutQuart for a slightly softer end

        const currentCount = start + (end - start) * easing

        // For float values, don't prematurely floor if the target is a float
        // The display formatting will handle flooring for integers
        setCount(currentCount)

        if (progress < duration) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end) // Ensure we end at the exact target
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrame)
    }
  }, [end, start, duration, delay])

  return count
}
