"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const reviews = [
  {
    id: 1,
    name: "Alex M.",
    date: "May 15, 2023",
    rating: 5,
    comment:
      "Absolutely game-changing software. The aimbot is incredibly smooth and natural looking. Customer support was also very helpful when I had questions about setup.",
    verified: true,
  },
  {
    id: 2,
    name: "Jamie K.",
    date: "June 3, 2023",
    rating: 4,
    comment:
      "Great product overall. The visuals enhancement is amazing and gives a real competitive edge. Only reason for 4 stars is that the update took a bit longer than expected.",
    verified: true,
  },
  {
    id: 3,
    name: "Taylor R.",
    date: "April 22, 2023",
    rating: 5,
    comment:
      "Been using CDN Cheats for over a year now. The software is constantly updated and improved. Never had any detection issues. Worth every penny!",
    verified: true,
  },
  {
    id: 4,
    name: "Morgan P.",
    date: "July 8, 2023",
    rating: 4,
    comment:
      "The RUST version works flawlessly. I've tried other providers before but this one has the most features and best performance. Highly recommend.",
    verified: true,
  },
  {
    id: 5,
    name: "Casey L.",
    date: "May 30, 2023",
    rating: 5,
    comment:
      "Incredible software with amazing customization options. The macro system is particularly impressive. Support team responds quickly to any issues.",
    verified: true,
  },
  {
    id: 6,
    name: "Jordan B.",
    date: "June 17, 2023",
    rating: 5,
    comment:
      "Best gaming enhancement software I've used. The ESP features are outstanding and the aimbot is fully customizable. No performance impact on my system.",
    verified: true,
  },
]

export default function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + visibleItems >= reviews.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, reviews.length - visibleItems) : prevIndex - 1))
  }

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * (100 / visibleItems)}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] p-4">
              <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                  {review.verified && (
                    <div className="mt-4 flex items-center">
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified Purchase
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/80 hover:text-blue-400 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/80 hover:text-blue-400 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(reviews.length / visibleItems) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.floor(activeIndex / visibleItems) === index ? "bg-blue-500 w-6" : "bg-gray-600"
            }`}
            onClick={() => setActiveIndex(index * visibleItems)}
          />
        ))}
      </div>
    </div>
  )
}
