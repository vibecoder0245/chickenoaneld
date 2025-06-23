"use client"

import StyledBadge from "@/components/styled-badge"
import { Users, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const reviews = [
  {
    quote:
      "This product has completely transformed my workflow. I can't imagine going back to the old way of doing things! The precision is unmatched.",
    name: "Alex R.",
    title: "Pro Gamer & Streamer",
    avatar: "/images/testimonials/cat-with-headphones.jpg", // Updated path
  },
  {
    quote:
      "The customer support is outstanding. They were incredibly helpful in resolving my issue quickly and efficiently. Top-tier service!",
    name: "Jamie K.",
    title: "Esports Team Manager",
    avatar: "/images/testimonials/person-with-rolls-royce.jpg", // Updated path
  },
  {
    quote:
      "I highly recommend this to anyone looking for a reliable and effective solution. It's worth every penny and has boosted my K/D significantly!",
    name: "Casey L.",
    title: "Competitive Player",
    avatar: "/images/testimonials/person-with-cash.jpg", // Updated path
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const ReviewSection = () => {
  return (
    <section className="py-20 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <StyledBadge
            text="Community Approved"
            icon={Users}
            className="mb-4 border-teal-500/50 text-teal-400 bg-teal-500/10"
            blurColorClass="bg-teal-500"
            iconClassName="text-teal-400"
          />
          <h2 className="text-3xl md:text-5xl font-bold text-white">What Our Customers Say</h2>
          <p className="text-base md:text-lg text-gray-400 mt-3 max-w-xl">
            Hear directly from gamers who have experienced the CDN Cheats difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-neutral-800/50 dark:bg-neutral-900/60 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-neutral-700/50 flex flex-col h-full"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Quote className="w-10 h-10 text-brand/60 mb-5 transform -scale-x-100" /> {/* Flipped quote icon */}
              <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">"{review.quote}"</p>
              <div className="mt-auto pt-5 border-t border-neutral-700/70 flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-brand/50 shadow-md">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={`${review.name}'s testimonial avatar`} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-md text-gray-100">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewSection
