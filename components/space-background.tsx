"use client"

import { useEffect, useRef } from "react"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star class
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      maxOpacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.5
        this.speed = Math.random() * 0.05 + 0.01
        this.maxOpacity = Math.random() * 0.8 + 0.2
      }

      update() {
        this.opacity += this.speed
        if (this.opacity > this.maxOpacity) {
          this.speed = -this.speed
        } else if (this.opacity < 0.1) {
          this.speed = Math.abs(this.speed)
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create stars
    const starCount = 200
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    // Nebula class for colored clouds
    class Nebula {
      x: number
      y: number
      radius: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 200 + 100
        const colors = ["rgba(59, 130, 246, 0.05)", "rgba(99, 102, 241, 0.05)", "rgba(139, 92, 246, 0.05)"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.1
      }

      draw() {
        if (!ctx) return
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color.replace("0.05", `${this.opacity}`))
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create nebulas
    const nebulaCount = 5
    const nebulas: Nebula[] = []

    for (let i = 0; i < nebulaCount; i++) {
      nebulas.push(new Nebula())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0a0f")
      gradient.addColorStop(1, "#0f0f1a")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulas
      nebulas.forEach((nebula) => {
        nebula.draw()
      })

      // Draw and update stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
