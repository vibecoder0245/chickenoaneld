"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Ensure this only runs in the browser
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior, // Use "instant" to avoid smooth scroll interference
        })
      } catch (e) {
        // Fallback for older browsers that might not support options object or "instant"
        window.scrollTo(0, 0)
      }
    }
  }, [pathname]) // Re-run effect when pathname changes

  return null // This component does not render any UI
}
