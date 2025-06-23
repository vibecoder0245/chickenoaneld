"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { products, type Product } from "@/lib/products"
import { locations, type LocationData } from "@/lib/locations"
import { X } from "lucide-react"

interface NotificationData {
  product: Product
  location: LocationData
  time: string
  id: string
}

export default function PurchaseNotification() {
  const [notification, setNotification] = useState<NotificationData | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

  const formatTime = (): string => {
    const date = new Date()
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString()
    return `today at ${hours}:${minutesStr} ${ampm}`
  }

  const showRandomNotification = useCallback(() => {
    if (products.length === 0 || locations.length === 0) return

    const randomProduct = getRandomElement(products)
    const randomLocation = getRandomElement(locations)
    const randomTime = formatTime()

    setNotification({
      product: randomProduct,
      location: randomLocation,
      time: randomTime,
      id: Date.now().toString(), // Unique ID for key prop
    })
    setIsVisible(true)

    // Auto-hide after 7 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 7000)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const scheduleNextNotification = () => {
      const randomDelay = Math.random() * (30000 - 10000) + 10000 // 10 to 30 seconds
      intervalId = setTimeout(() => {
        showRandomNotification()
        scheduleNextNotification() // Schedule the next one after showing
      }, randomDelay)
    }

    // Initial delay before first notification
    const initialDelay = Math.random() * (15000 - 5000) + 5000 // 5 to 15 seconds for the very first one
    const firstTimeoutId = setTimeout(() => {
      showRandomNotification()
      scheduleNextNotification()
    }, initialDelay)

    return () => {
      clearTimeout(firstTimeoutId)
      clearTimeout(intervalId)
    }
  }, [showRandomNotification])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!notification) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 50, transition: { duration: 0.3 } }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-4 left-4 z-50 w-full max-w-[260px] overflow-hidden rounded-lg bg-neutral-800/90 shadow-2xl backdrop-blur-lg border border-neutral-700/60"
        >
          <Link
            href={`/products/${notification.product.slug}`}
            className="block hover:bg-neutral-700/30 transition-colors duration-150"
          >
            <div className="flex flex-row justify-between">
              <div className="p-2.5 flex-grow">
                <span className="text-neutral-400 line-clamp-1 whitespace-pre-wrap text-xs">Someone purchased</span>
                <span className="line-clamp-2 block max-w-full overflow-ellipsis text-sm font-semibold text-white">
                  {notification.product.name}
                </span>
                <span className="first-letter-capitalize text-neutral-400 line-clamp-1 whitespace-pre-wrap text-xs">
                  {notification.time}
                </span>
                <div className="mt-1.5 inline-flex items-center">
                  <div className="text-neutral-400 line-clamp-1 capitalize text-xs">
                    <span className="mr-1 lowercase">from</span>
                    {notification.location.city}
                  </div>
                </div>
              </div>
              <div className="relative h-auto w-16 flex-shrink-0">
                {/* Removed the problematic outer conditional: notification.product.thumbnailImage && (...) */}
                {/* The Image component will now always render, and its src prop handles the placeholder. */}
                <Image
                  alt={notification.product.name || "Product image"}
                  loading="lazy"
                  decoding="async"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 64px, 64px"
                  src={
                    notification.product.thumbnailImage || // Fallback to placeholder if thumbnailImage is falsy
                    `/placeholder.svg?width=64&height=64&query=${encodeURIComponent(notification.product.name || "product")}`
                  }
                />
              </div>
            </div>
          </Link>
          <button
            onClick={handleClose}
            aria-label="Close notification"
            className="absolute top-2 right-2 p-1 text-neutral-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
