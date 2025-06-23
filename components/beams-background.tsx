"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface AnimatedGradientBackgroundProps {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  originFocus?: "center" | "wide"
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

function createBeam(
  canvasWidth: number,
  canvasHeight: number,
  originFocus: "center" | "wide",
  index: number,
  totalBeams: number,
  isMobileDevice: boolean,
): Beam {
  let beamX: number
  if (originFocus === "center") {
    // Tighter spread for mobile if centered
    beamX = canvasWidth / 2 + (Math.random() - 0.5) * (canvasWidth * (isMobileDevice ? 0.15 : 0.3))
  } else {
    // Wider start for desktop, potentially more spread out for mobile too but fewer beams overall
    beamX = Math.random() * canvasWidth * 1.5 - canvasWidth * 0.25
  }

  const angle = -35 + Math.random() * 10

  return {
    x: beamX,
    y: canvasHeight + 20 + Math.random() * 50,
    // Significantly reduce width for mobile
    width: (isMobileDevice ? 8 : 40) + Math.random() * (isMobileDevice ? 12 : 80),
    // Reduce length for mobile
    length: canvasHeight * (isMobileDevice ? 0.7 : 1.2) + Math.random() * (canvasHeight * (isMobileDevice ? 0.3 : 0.6)),
    angle: angle,
    // Slightly faster base speed for mobile
    speed: (isMobileDevice ? 0.25 : 0.3) + Math.random() * (isMobileDevice ? 0.35 : 0.6),
    // Significantly reduce opacity for mobile
    opacity: (isMobileDevice ? 0.02 : 0.1) + Math.random() * (isMobileDevice ? 0.03 : 0.1),
    hue: 190 + (index * 50) / totalBeams, // Hue can remain consistent
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03, // Pulse speed can remain consistent
  }
}

function resetBeam(
  beam: Beam,
  index: number,
  canvasWidth: number,
  canvasHeight: number,
  originFocus: "center" | "wide",
  totalBeams: number,
  isMobileDevice: boolean,
) {
  beam.y = canvasHeight + 20 + Math.random() * 50
  beam.width = (isMobileDevice ? 8 : 40) + Math.random() * (isMobileDevice ? 12 : 80)
  beam.speed = (isMobileDevice ? 0.25 : 0.3) + Math.random() * (isMobileDevice ? 0.35 : 0.6)
  beam.hue = 190 + (index * 50) / totalBeams
  beam.opacity = (isMobileDevice ? 0.02 : 0.1) + Math.random() * (isMobileDevice ? 0.03 : 0.1)
  beam.angle = -30 + Math.random() * 10
  beam.length =
    canvasHeight * (isMobileDevice ? 0.7 : 1.2) + Math.random() * (canvasHeight * (isMobileDevice ? 0.3 : 0.6))
  beam.pulse = Math.random() * Math.PI * 2

  if (originFocus === "center") {
    beam.x = canvasWidth / 2 + (Math.random() - 0.5) * (canvasWidth * (isMobileDevice ? 0.15 : 0.3))
  } else {
    // Fewer columns for 'wide' on mobile to reduce density
    const columns = Math.max(1, Math.floor(totalBeams / (isMobileDevice ? 2 : 5)))
    const column = index % columns
    const spacingX = canvasWidth / (columns + 1)
    beam.x = (column + 1) * spacingX + (Math.random() - 0.5) * spacingX * 0.8
  }
  return beam
}

export default function BeamsBackground({
  className,
  intensity = "strong",
  originFocus = "wide",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const isMobile = useIsMobile()
  const isMobileEffective = isMobile && hasMounted

  // Drastically reduce beam count for mobile
  const numBeamsMap = {
    subtle: isMobileEffective ? 3 : 15,
    medium: isMobileEffective ? 5 : 25,
    strong: isMobileEffective ? 7 : 35, // Max 7 beams for strong on mobile
  }
  const TOTAL_BEAMS = numBeamsMap[intensity]

  // Further reduce base opacity multiplier for mobile
  const baseOpacityMap = {
    subtle: isMobileEffective ? 0.15 : 0.6,
    medium: isMobileEffective ? 0.25 : 0.8,
    strong: isMobileEffective ? 0.35 : 1.0,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      canvas.width = newWidth * dpr
      canvas.height = newHeight * dpr
      canvas.style.width = `${newWidth}px`
      canvas.style.height = `${newHeight}px`
      ctx.scale(dpr, dpr)

      beamsRef.current = Array.from({ length: TOTAL_BEAMS }, (_, i) =>
        createBeam(newWidth, newHeight, originFocus, i, TOTAL_BEAMS, isMobileEffective),
      )
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const overallIntensityFactor = baseOpacityMap[intensity]
      const pulsingOpacity = beam.opacity * (0.7 + Math.sin(beam.pulse) * 0.3) * overallIntensityFactor

      const gradient = ctx.createLinearGradient(0, -beam.length / 2, 0, beam.length / 2)

      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 70%, 0)`)
      gradient.addColorStop(0.25, `hsla(${beam.hue}, 85%, 70%, ${pulsingOpacity * 0.6})`)
      gradient.addColorStop(0.5, `hsla(${beam.hue}, 85%, 70%, ${pulsingOpacity})`)
      gradient.addColorStop(0.75, `hsla(${beam.hue}, 85%, 70%, ${pulsingOpacity * 0.6})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 70%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, -beam.length / 2, beam.width, beam.length)
      ctx.restore()
    }

    let lastTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    function animate(currentTime: number) {
      animationFrameRef.current = requestAnimationFrame(animate)
      if (!canvas || !ctx) return

      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) {
        return
      }
      lastTime = currentTime - (deltaTime % frameInterval)

      const currentCanvasWidth = canvas.width / (window.devicePixelRatio || 1)
      const currentCanvasHeight = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight)

      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed * (deltaTime / 16.67)
        beam.pulse += beam.pulseSpeed * (deltaTime / 16.67)

        if (beam.y + beam.length / 2 < -50) {
          beamsRef.current[index] = resetBeam(
            beam,
            index,
            currentCanvasWidth,
            currentCanvasHeight,
            originFocus,
            TOTAL_BEAMS,
            isMobileEffective,
          )
        }
        drawBeam(ctx, beam)
      })
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity, TOTAL_BEAMS, originFocus, isMobileEffective]) // baseOpacityMap removed as it's now directly calculated using intensity and isMobileEffective

  // Keep blur moderate for mobile, could even go to blur(8px) if needed
  const blurAmount = isMobileEffective ? "blur(10px)" : "blur(20px)"

  return (
    <div className={cn("fixed inset-0 w-full h-full overflow-hidden bg-neutral-950 -z-10", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: blurAmount }} />
      <motion.div
        className="absolute inset-0 bg-neutral-950/30" // Base overlay opacity
        animate={{
          // Slightly less variation for mobile, or even a static opacity if preferred
          opacity: isMobileEffective ? [0.25, 0.3, 0.25] : [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}
