"use client"

import type React from "react"
import { forwardRef, useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { Zap, ShieldCheck, Eye, Crosshair, Cpu, Settings, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface FeatureCircleProps {
  className?: string
  children?: React.ReactNode
  title: string
  description: string
  style?: React.CSSProperties
}

const FeatureCircle = forwardRef<HTMLDivElement, FeatureCircleProps>(
  ({ className, children, title, description, style }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("z-10 flex flex-col items-center justify-center text-center p-2 group", className)}
        style={style}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border-2 border-foreground/10 dark:border-foreground/20 bg-card 
                     shadow-lg w-20 h-20 md:w-24 md:h-24 mb-3 
                     group-hover:border-brand-blue group-hover:shadow-brand-blue/30 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {children}
        </motion.div>
        <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 group-hover:text-brand-blue transition-colors">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-foreground/60 max-w-[120px] md:max-w-[150px]">{description}</p>
      </motion.div>
    )
  },
)
FeatureCircle.displayName = "FeatureCircle"

const FeatureIcon = ({
  icon: Icon,
  colorClass = "text-brand-blue",
}: { icon: React.ElementType; colorClass?: string }) => (
  <Icon className={`w-8 h-8 md:w-10 md:h-10 ${colorClass} group-hover:scale-110 transition-transform duration-300`} />
)

// Helper to map Tailwind color classes to actual HSL/color values for beams
// This is a simplified example; you might want a more robust solution or define these in your theme
const tailwindClassToColor = (twClass: string): string => {
  if (twClass.includes("red")) return "hsl(0, 70%, 60%)"
  if (twClass.includes("cyan")) return "hsl(190, 70%, 60%)"
  if (twClass.includes("green")) return "hsl(120, 70%, 50%)"
  if (twClass.includes("purple")) return "hsl(270, 70%, 60%)"
  if (twClass.includes("orange")) return "hsl(30, 70%, 60%)"
  if (twClass.includes("yellow")) return "hsl(50, 70%, 60%)"
  return "hsl(var(--brand-cyan))" // Default
}

const features = [
  {
    id: "aimbot",
    title: "Precision Aim",
    description: "Lock on with unmatched accuracy.",
    icon: Crosshair,
    colorClass: "text-red-400", // Tailwind class for icon
  },
  {
    id: "esp",
    title: "Advanced ESP",
    description: "See everything, miss nothing.",
    icon: Eye,
    colorClass: "text-cyan-400",
  },
  {
    id: "stealth",
    title: "Stealth Mode",
    description: "Undetected & secure gameplay.",
    icon: ShieldCheck,
    colorClass: "text-green-400",
  },
  {
    id: "custom",
    title: "Full Control",
    description: "Customize every feature.",
    icon: Settings,
    colorClass: "text-purple-400",
  },
  {
    id: "performance",
    title: "Optimized Core",
    description: "Smooth, lag-free experience.",
    icon: Cpu,
    colorClass: "text-orange-400",
  },
  {
    id: "updates",
    title: "Rapid Updates",
    description: "Always ahead of the game.",
    icon: Rocket,
    colorClass: "text-yellow-400",
  },
]

export default function CheatFeaturesBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ radius: 280, coreSize: 100 })
  const featureRefs: React.MutableRefObject<HTMLDivElement | null>[] = features.map(() => useRef(null))

  useEffect(() => {
    setIsMounted(true)
    const updateDimensions = () => {
      const newRadius = window.innerWidth < 768 ? 160 : 260 // Adjusted for potentially smaller feature circles too
      const newCoreSize = window.innerWidth < 768 ? 80 : 100
      setDimensions({ radius: newRadius, coreSize: newCoreSize })
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const beamPropsBase = {
    pathOpacity: 0.1,
    pathWidth: 2.5,
    duration: 5,
    gradientStopColor: "hsl(var(--brand-purple))", // Common stop color
  }

  return (
    <section className="py-16 md:py-24 bg-background dark:bg-neutral-950/70 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <Badge
            variant="outline"
            className="mb-4 border-brand-blue/50 text-brand-blue bg-brand-blue/10 py-1.5 px-5 text-base font-medium backdrop-blur-sm"
          >
            <Zap className="w-5 h-5 mr-2.5" /> Core Technology
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-gray-400">
            Our Feature Ecosystem
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Experience the synergy of interconnected features, all powered by a robust and constantly evolving core for
            peak performance and undetectability.
          </p>
        </div>

        <div
          className="relative w-full flex items-center justify-center"
          ref={containerRef}
          style={{ minHeight: `${dimensions.radius * 2 + dimensions.coreSize + 100}px` }} // Dynamic height
        >
          {/* Central Hub */}
          <div
            className="absolute group"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <FeatureCircle ref={coreRef} title="CDN Core" description="Secure & Powerful">
              <Zap
                className={`w-10 h-10 md:w-12 md:h-12 text-brand-purple group-hover:text-brand-cyan transition-colors duration-300 animate-pulse`}
              />
            </FeatureCircle>
          </div>

          {/* Surrounding Features in a Circle */}
          {isMounted &&
            features.map((feature, index) => {
              const angle = (index / features.length) * 2 * Math.PI - Math.PI / 2 // Start from top
              const x = dimensions.radius * Math.cos(angle)
              const y = dimensions.radius * Math.sin(angle)
              return (
                <div
                  key={feature.id}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                  ref={featureRefs[index]}
                >
                  <FeatureCircle title={feature.title} description={feature.description}>
                    <FeatureIcon icon={feature.icon} colorClass={feature.colorClass} />
                  </FeatureCircle>
                </div>
              )
            })}

          {/* Beams connecting features to the core */}
          {isMounted &&
            featureRefs.map((ref, index) => (
              <AnimatedBeam
                key={`beam-${features[index].id}`}
                containerRef={containerRef}
                fromRef={ref}
                toRef={coreRef}
                curvature={(index % 2 === 0 ? 1 : -1) * 20 * (((index + 1) / features.length) * 1.5)} // Adjusted curvature
                duration={4 + Math.random() * 2}
                delay={index * 0.25}
                {...beamPropsBase}
                gradientStartColor={tailwindClassToColor(features[index].colorClass)}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
