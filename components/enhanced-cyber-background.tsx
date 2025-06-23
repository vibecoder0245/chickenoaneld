"use client"

import { useEffect, useRef, useState } from "react"

export default function EnhancedCyberBackground() {
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

    // 3D Line class
    class Line3D {
      x: number
      y: number
      z: number
      length: number
      angle: number
      speed: number
      width: number
      color: string
      opacity: number
      depth: number
      originalX: number
      originalY: number
      forceFactor: number

      constructor() {
        this.z = Math.random() * 1000 + 500 // Z position (depth)
        this.x = (Math.random() - 0.5) * canvas.width * 3
        this.y = (Math.random() - 0.5) * canvas.height * 3
        this.originalX = this.x // Store original position for returning after mouse influence
        this.originalY = this.y
        this.length = Math.random() * 100 + 50
        this.angle = Math.random() * Math.PI * 2
        this.speed = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1)
        this.width = Math.random() * 2 + 0.5
        this.color = `rgba(255, ${Math.floor(Math.random() * 30)}, ${Math.floor(Math.random() * 30)}, 0.8)`
        this.opacity = Math.random() * 0.5 + 0.3
        this.depth = Math.random() * 0.5 + 0.5
        this.forceFactor = Math.random() * 0.3 + 0.1 // How much this line is affected by mouse
      }

      update(mouseX: number, mouseY: number, isMouseActive: boolean) {
        // Rotate the line
        this.angle += this.speed * 0.01

        // Move the line in Z space (coming toward or away from viewer)
        this.z -= 2

        // Reset if too close or too far
        if (this.z < 0) {
          this.z = 1000
          this.x = (Math.random() - 0.5) * canvas.width * 3
          this.y = (Math.random() - 0.5) * canvas.height * 3
          this.originalX = this.x
          this.originalY = this.y
        }

        // Calculate perspective for mouse interaction
        const scale = 1000 / (1000 + this.z)
        const screenX = canvas.width / 2 + this.x * scale
        const screenY = canvas.height / 2 + this.y * scale

        // React to mouse if it's in the canvas
        if (isMouseActive) {
          // Calculate distance from mouse to this line's projected position
          const dx = mouseX - screenX
          const dy = mouseY - screenY
          const distance = Math.sqrt(dx * dx + dy * dy)

          // If within influence radius, move away from mouse
          if (distance < mouseRadius) {
            // Strength of repulsion is stronger when closer to mouse
            const force = (1 - distance / mouseRadius) * this.forceFactor * 10

            // Calculate repulsion vector
            const angle = Math.atan2(dy, dx)

            // Apply repulsion force (stronger for closer lines)
            this.x -= (Math.cos(angle) * force) / scale
            this.y -= (Math.sin(angle) * force) / scale
          } else {
            // Gradually return to original position when not influenced
            this.x += (this.originalX - this.x) * 0.02
            this.y += (this.originalY - this.y) * 0.02
          }
        } else {
          // Return to original position when mouse is not in canvas
          this.x += (this.originalX - this.x) * 0.02
          this.y += (this.originalY - this.y) * 0.02
        }
      }

      draw(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number, isMouseActive: boolean) {
        // Calculate perspective
        const scale = 1000 / (1000 + this.z)
        const x = canvas.width / 2 + this.x * scale
        const y = canvas.height / 2 + this.y * scale

        // Calculate end points based on angle and length
        const length = this.length * scale
        const endX = x + Math.cos(this.angle) * length
        const endY = y + Math.sin(this.angle) * length

        // Draw the line with perspective-adjusted width and opacity
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = this.width * scale

        // Adjust opacity based on depth
        const depthOpacity = Math.max(0.1, Math.min(1, scale * 2)) * this.opacity

        // If close to mouse, make it glow more intensely
        if (isMouseActive) {
          const dx = mouseX - x
          const dy = mouseY - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius) {
            // Increase brightness/glow when near mouse
            const intensity = 1 - distance / mouseRadius
            const glowColor = `rgba(255, ${Math.min(255, 30 + intensity * 100)}, ${Math.min(255, 30 + intensity * 50)}, ${depthOpacity + intensity * 0.3})`
            ctx.strokeStyle = glowColor
            ctx.shadowBlur = 15 * scale * (1 + intensity)
            ctx.shadowColor = glowColor
          } else {
            ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${depthOpacity})`)
            ctx.shadowBlur = 10 * scale
            ctx.shadowColor = this.color.replace(/[\d.]+\)$/g, "0.5)")
          }
        } else {
          ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${depthOpacity})`)
          ctx.shadowBlur = 10 * scale
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
        this.color = `rgba(255, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 30)}, ${Math.random() * 0.5 + 0.2})`
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
            const glowColor = `rgba(255, ${Math.min(255, 50 + intensity * 150)}, ${Math.min(255, 30 + intensity * 100)}, ${Math.min(1, 0.2 + intensity * 0.6)})`
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

    // Mouse trail effect
    class MouseTrail {
      points: { x: number; y: number; age: number; size: number }[]
      maxAge: number

      constructor() {
        this.points = []
        this.maxAge = 20 // How long trail points last
      }

      addPoint(x: number, y: number) {
        this.points.push({
          x,
          y,
          age: 0,
          size: Math.random() * 2 + 1,
        })
      }

      update() {
        // Age all points
        for (let i = this.points.length - 1; i >= 0; i--) {
          this.points[i].age++

          // Remove old points
          if (this.points[i].age > this.maxAge) {
            this.points.splice(i, 1)
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        for (const point of this.points) {
          const opacity = 1 - point.age / this.maxAge
          const size = point.size * (1 - point.age / this.maxAge)

          ctx.beginPath()
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 50, 30, ${opacity * 0.7})`
          ctx.shadowBlur = 10 * opacity
          ctx.shadowColor = `rgba(255, 50, 30, ${opacity})`
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Create lines
    const lines: Line3D[] = []
    const lineCount = 100
    for (let i = 0; i < lineCount; i++) {
      lines.push(new Line3D())
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 80
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create mouse trail
    const mouseTrail = new MouseTrail()

    // Track previous mouse position for trail
    let prevMouseX = 0
    let prevMouseY = 0

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0a0f")
      gradient.addColorStop(1, "#0f0f1a")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add mouse trail point if mouse has moved
      if (
        isMouseInCanvas &&
        (Math.abs(mousePosition.x - prevMouseX) > 3 || Math.abs(mousePosition.y - prevMouseY) > 3)
      ) {
        mouseTrail.addPoint(mousePosition.x, mousePosition.y)
        prevMouseX = mousePosition.x
        prevMouseY = mousePosition.y
      }

      // Update and draw mouse trail
      mouseTrail.update()
      mouseTrail.draw(ctx)

      // Sort lines by z-depth for proper rendering
      lines.sort((a, b) => b.z - a.z)

      // Update and draw lines
      lines.forEach((line) => {
        line.update(mousePosition.x, mousePosition.y, isMouseInCanvas)
        line.draw(ctx, mousePosition.x, mousePosition.y, isMouseInCanvas)
      })

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mousePosition.x, mousePosition.y, isMouseInCanvas)
        particle.draw(ctx, mousePosition.x, mousePosition.y, isMouseInCanvas)
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
        gradient.addColorStop(0, "rgba(255, 30, 30, 0.1)")
        gradient.addColorStop(0.5, "rgba(255, 30, 30, 0.05)")
        gradient.addColorStop(1, "rgba(255, 30, 30, 0)")
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
