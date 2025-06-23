"use client"

import { useEffect, useRef } from "react"

export default function CyberBackground() {
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

    // Line class
    class Line {
      x1: number
      y1: number
      x2: number
      y2: number
      color: string
      speed: number
      life: number
      maxLife: number
      width: number
      direction: number

      constructor() {
        this.x1 = Math.random() * canvas.width
        this.y1 = Math.random() * canvas.height
        this.x2 = this.x1 + (Math.random() * 100 - 50)
        this.y2 = this.y1 + (Math.random() * 100 - 50)
        this.color = `rgba(255, ${Math.floor(Math.random() * 30)}, ${Math.floor(Math.random() * 30)}, ${
          Math.random() * 0.5 + 0.1
        })`
        this.speed = Math.random() * 0.5 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
        this.width = Math.random() * 1.5 + 0.5
        this.direction = Math.random() > 0.5 ? 1 : -1
      }

      update() {
        this.life++

        // Move the line
        this.x1 += Math.sin(this.life / 20) * this.speed * this.direction
        this.y1 += Math.cos(this.life / 20) * this.speed * this.direction
        this.x2 += Math.sin(this.life / 20) * this.speed * this.direction
        this.y2 += Math.cos(this.life / 20) * this.speed * this.direction

        // Fade out as it reaches end of life
        const alpha = Math.max(0, (this.maxLife - this.life) / this.maxLife)
        this.color = this.color.replace(/[\d.]+\)$/g, `${alpha})`)
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.width
        ctx.stroke()
      }

      isDead() {
        return this.life >= this.maxLife
      }
    }

    // Create lines
    const lines: Line[] = []
    const maxLines = 100

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0a0f")
      gradient.addColorStop(1, "#0f0f1a")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add new lines if needed
      if (lines.length < maxLines && Math.random() > 0.95) {
        lines.push(new Line())
      }

      // Update and draw lines
      for (let i = 0; i < lines.length; i++) {
        lines[i].update()
        lines[i].draw()

        // Remove dead lines
        if (lines[i].isDead()) {
          lines.splice(i, 1)
          i--
        }
      }

      // Draw connection points
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(Date.now() / 2000 + i) * canvas.width * 0.4 + canvas.width * 0.5
        const y = Math.cos(Date.now() / 2000 + i * 2) * canvas.height * 0.4 + canvas.height * 0.5
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
