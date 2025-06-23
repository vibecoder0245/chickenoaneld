"use client"

import { motion } from "framer-motion"
import StyledBadge from "@/components/styled-badge"
import { Workflow, ShoppingCart, CreditCard, Rocket } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Data for the steps
const steps: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: ShoppingCart,
    title: "Browse & Select",
    description: "Explore our catalog and find the perfect enhancement for your game.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description: "Complete your purchase through our encrypted and secure payment gateway.",
  },
  {
    icon: Rocket,
    title: "Instant Access",
    description: "Receive your product and setup instructions immediately after payment.",
  },
]

// Animation variants for the main section
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// Animation variants for each step card
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3, // Staggered delay for each card
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

// Animation variants for the connecting lines (using scale)
const lineVariants = {
  hidden: (direction: "horizontal" | "vertical") => ({
    scaleX: direction === "horizontal" ? 0 : 1,
    scaleY: direction === "vertical" ? 0 : 1,
  }),
  visible: (delay: number) => ({
    scaleX: 1,
    scaleY: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
}

export default function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="py-16 md:py-24 bg-transparent relative"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-brand/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <StyledBadge
            text="How It Works"
            icon={Workflow}
            className="mb-4 border-purple-500/50 text-purple-400 bg-purple-500/10"
            blurColorClass="bg-purple-500"
            iconClassName="text-purple-400"
          />
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">Get Started in 3 Easy Steps</h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-xl mx-auto">
            From selection to domination, our process is designed for speed and security.
          </p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center w-full max-w-sm md:max-w-none md:flex-1">
              {/* Step Card */}
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-neutral-900/50 shadow-lg w-full"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={itemVariants}
              >
                <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-brand/20 to-purple-600/20 border border-white/10">
                  <step.icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/60">{step.description}</p>
              </motion.div>

              {/* Connecting Line (rendered between cards) */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Line (Horizontal) */}
                  <div className="hidden md:flex flex-1 h-1 mx-4 bg-brand/20 rounded-full">
                    <motion.div
                      className="h-full w-full bg-brand rounded-full origin-left"
                      custom={index * 0.3 + 0.3} // Delay starts after the card is visible
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={lineVariants}
                      custom-direction="horizontal" // Pass direction for variants
                    />
                  </div>
                  {/* Mobile Line (Vertical) */}
                  <div className="flex md:hidden w-1 h-16 my-4 bg-brand/20 rounded-full">
                    <motion.div
                      className="h-full w-full bg-brand rounded-full origin-top"
                      custom={index * 0.3 + 0.3} // Delay starts after the card is visible
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={lineVariants}
                      custom-direction="vertical" // Pass direction for variants
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
