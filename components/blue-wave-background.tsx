"use client"

import { useEffect, useRef, useState } from "react"

export default function BlueWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false)
  const mouseRadius = 150 // Radius of mouse influence

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Reset mouse position when resizing to avoid strange effects
      setMousePosition({ x: canvas.width / 2, y: canvas.height / 2 })
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => {
      setIsMouseInCanvas(true)
    }

    const handleMouseLeave = () => {
      setIsMouseInCanvas(false)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Square Wave Line class
    class SquareWaveLine {
      startX: number
      y: number
      width: number
      height: number
      segments: number
      color: string
      speed: number
      amplitude: number
      frequency: number
      phase: number
      lineWidth: number
      originalY: number
      forceFactor: number

      constructor(y: number, segments: number) {
        this.startX = 0
        this.y = y
        this.originalY = y
        this.width = canvas.width
        this.height = Math.random() * 30 + 10
        this.segments = segments
        this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, ${
          Math.random() * 0.3 + 0.1
        })`
        this.speed = (Math.random() * 0.5 + 0.1) * (Math.random() > 0.5 ? 1 : -1)
        this.amplitude = Math.random() * 20 + 5
        this.frequency = Math.random() * 0.02 + 0.01
        this.phase = Math.random() * Math.PI * 2
        this.lineWidth = Math.random() * 2 + 1
        this.forceFactor = Math.random() * 0.3 + 0.1
      }

      update(mouseX: number, mouseY: number, isMouseActive: boolean) {
        // Move the phase for animation
        this.phase += this.speed * 0.01

        // React to mouse if it's in the canvas
        if (isMouseActive) {
          const dy = mouseY - this.y
          const distance = Math.abs(dy)

          if (distance < mouseRadius) {
            // Strength of repulsion is stronger when closer to mouse
            const force = (1 - distance / mouseRadius) * this.forceFactor * 15

            // Apply repulsion force (push down if mouse is above, push up if mouse is below)
            this.y += dy > 0 ? -force : force
          } else {
            // Gradually return to original position when not influenced
            this.y += (this.originalY - this.y) * 0.05
          }
        } else {
          // Return to original position when mouse is not in canvas
          this.y += (this.originalY - this.y) * 0.05
        }
      }

      draw(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number, isMouseActive: boolean) {
        const segmentWidth = this.width / this.segments

        ctx.beginPath()
        ctx.lineWidth = this.lineWidth

        // Start at the left edge
        ctx.moveTo(0, this.y)

        // Draw square wave pattern
        for (let i = 0; i <= this.segments; i++) {
          const x = i * segmentWidth
          const waveHeight = Math.sin(i * this.frequency + this.phase) * this.amplitude

          // For square waves, we need to draw vertical and horizontal lines
          if (i > 0) {
            // Draw horizontal line
            ctx.lineTo(x, this.y + waveHeight)

            // If not the last segment, draw vertical line to next level
            if (i < this.segments) {
              const nextWaveHeight = Math.sin((i + 1) * this.frequency + this.phase) * this.amplitude
              ctx.lineTo(x, this.y + nextWaveHeight)
            }
          } else {
            // First point
            ctx.lineTo(x, this.y + waveHeight)
          }
        }

        // Determine if line is close to mouse for glow effect
        if (isMouseActive) {
          const dy = mouseY - this.y
          const distance = Math.abs(dy)

          if (distance < mouseRadius) {
            // Increase brightness/glow when near mouse
            const intensity = 1 - distance / mouseRadius
            const glowColor = `rgba(0, ${Math.min(255, 100 + intensity * 100)}, ${Math.min(255, 200 + intensity * 55)}, ${
              0.1 + intensity * 0.4
            })`
            ctx.strokeStyle = glowColor
            ctx.shadowBlur = 15 * intensity
            ctx.shadowColor = glowColor
          } else {
            ctx.strokeStyle = this.color
            ctx.shadowBlur = 5
            ctx.shadowColor = this.color.replace(/[\d.]+\)$/g, "0.5)")
          }
        } else {
          ctx.strokeStyle = this.color
          ctx.shadowBlur = 5
          ctx.shadowColor = this.color.replace(/[\d.]+\)$/g, "0.5)")
        }

        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    // Particle class for floating dots
    class Particle {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      originalX: number
      originalY: number
      forceFactor: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 2 + 0.5
        this.color = `rgba(0, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, ${
          Math.random() * 0.5 + 0.2
        })`
        this.speed = Math.random() * 0.5 + 0.1
        this.angle = Math.random() * Math.PI * 2
        this.forceFactor = Math.random() * 0.4 + 0.2
      }

      update(mouseX: number, mouseY: number, isMouseActive: boolean) {
        // Normal movement
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Change direction occasionally
        if (Math.random() < 0.01) {
          this.angle += ((Math.random() - 0.5) * Math.PI) / 4
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Update original position to current position
        this.originalX = this.x
        this.originalY = this.y

        // React to mouse if it's in the canvas
        if (isMouseActive) {
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius * 1.5) {
            // Particles are more strongly affected than lines
            const force = (1 - distance / (mouseRadius * 1.5)) * this.forceFactor * 5
            const angle = Math.atan2(dy, dx)

            // Move away from mouse
            this.x -= Math.cos(angle) * force
            this.y -= Math.sin(angle) * force
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number, isMouseActive: boolean) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

        // If close to mouse, make it glow
        if (isMouseActive) {
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius * 1.5) {
            const intensity = 1 - distance / (mouseRadius * 1.5)
            const glowColor = `rgba(0, ${Math.min(255, 100 + intensity * 150)}, ${Math.min(255, 200 + intensity * 55)}, ${Math.min(
              1,
              0.2 + intensity * 0.6,
            )})`
            ctx.fillStyle = glowColor
            ctx.shadowBlur = 10 * intensity
            ctx.shadowColor = glowColor
          } else {
            ctx.fillStyle = this.color
            ctx.shadowBlur = 0
          }
        } else {
          ctx.fillStyle = this.color
          ctx.shadowBlur = 0
        }

        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Create square wave lines
    const lines: SquareWaveLine[] = []
    const lineCount = 15
    const spacing = canvas.height / (lineCount + 1)

    for (let i = 0; i < lineCount; i++) {
      const y = spacing * (i + 1)
      const segments = Math.floor(Math.random() * 10) + 5
      lines.push(new SquareWaveLine(y, segments))
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 80
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0a1f")
      gradient.addColorStop(1, "#0f0f2a")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mousePosition.x, mousePosition.y, isMouseInCanvas)
        particle.draw(ctx, mousePosition.x, mousePosition.y, isMouseInCanvas)
      })

      // Update and draw square wave lines
      lines.forEach((line) => {
        line.update(mousePosition.x, mousePosition.y, isMouseInCanvas)
        line.draw(ctx, mousePosition.x, mousePosition.y, isMouseInCanvas)
      })

      // Draw mouse influence area when mouse is in canvas
      if (isMouseInCanvas) {
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, mouseRadius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          mouseRadius,
        )
        gradient.addColorStop(0, "rgba(0, 150, 255, 0.1)")
        gradient.addColorStop(0.5, "rgba(0, 150, 255, 0.05)")
        gradient.addColorStop(1, "rgba(0, 150, 255, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
