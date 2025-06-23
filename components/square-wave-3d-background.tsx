"use client"

import { useEffect, useRef } from "react"

export default function SquareWave3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  })
  const isMouseInCanvasRef = useRef(false)
  const mouseInfluenceRadius = 200

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (!isMouseInCanvasRef.current) {
        mousePositionRef.current = { x: canvas.width / 2, y: canvas.height / 2 }
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseEnter = () => {
      isMouseInCanvasRef.current = true
    }
    const handleMouseLeave = () => {
      isMouseInCanvasRef.current = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    class SquareWave {
      yOffset: number
      z: number
      amplitude: number
      frequency: number
      phase: number
      speed: number
      color: string
      lineWidth: number
      numSquares: number
      squareSizeBase: number
      originalYOffset: number

      constructor(z: number) {
        this.z = z
        this.yOffset = Math.random() * canvas.height
        this.originalYOffset = this.yOffset
        this.amplitude = Math.random() * 60 + 30
        this.frequency = Math.random() * 0.025 + 0.005
        this.phase = Math.random() * Math.PI * 2
        this.speed = (Math.random() * 0.35 + 0.15) * (Math.random() > 0.5 ? 1 : -1)
        const blueShade = Math.floor(Math.random() * 100) + 130
        const greenShade = Math.floor(Math.random() * 60) + 70
        // Keeping the boosted opacity from our earlier attempt
        this.color = `rgba(${greenShade}, ${blueShade}, 255, ${Math.max(0.3, 1.1 - z / 1000)})`
        this.lineWidth = Math.max(1, 4 - z / 300)
        this.numSquares = Math.floor(canvas.width / (Math.random() * 35 + 55)) + 5
        this.squareSizeBase = Math.random() * 30 + 20
      }

      update() {
        this.phase += this.speed * 0.02

        if (isMouseInCanvasRef.current) {
          const perspectiveScale = 500 / (500 + this.z)
          const projectedY = this.yOffset * perspectiveScale + (canvas.height - canvas.height * perspectiveScale) / 2
          const dy = mousePositionRef.current.y - projectedY
          const distance = Math.abs(dy)

          if (distance < mouseInfluenceRadius) {
            const force = (1 - distance / mouseInfluenceRadius) * 30 * (1 - this.z / 1000)
            this.yOffset += (dy > 0 ? -force : force) * 0.05
          }
        }
        this.yOffset += (this.originalYOffset - this.yOffset) * 0.02
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.lineWidth
        const baseShadowAlpha = 0.4 * (1 - this.z / 1000)
        ctx.shadowColor = this.color.replace(/[\d.]+\)$/g, `${baseShadowAlpha})`)
        ctx.shadowBlur = 8 * (1 - this.z / 1000)

        const perspectiveScale = 500 / (500 + this.z)
        const squareSize = this.squareSizeBase * perspectiveScale
        const actualY = this.yOffset * perspectiveScale + (canvas.height - canvas.height * perspectiveScale) / 2

        for (let i = 0; i < this.numSquares; i++) {
          const xRatio = i / (this.numSquares - 1)
          const x = (xRatio - 0.5) * canvas.width * (perspectiveScale * 0.6 + 0.4) + canvas.width / 2
          const yWave = Math.sin(i * this.frequency + this.phase) * this.amplitude * perspectiveScale
          const currentX = x - squareSize / 2
          const currentY = actualY + yWave - squareSize / 2

          if (
            currentX + squareSize < 0 ||
            currentX > canvas.width ||
            currentY + squareSize < 0 ||
            currentY > canvas.height
          ) {
            continue
          }
          ctx.strokeRect(currentX, currentY, squareSize, squareSize)
        }
        ctx.shadowBlur = 0
      }
    }

    const waves: SquareWave[] = []
    const numLayers = 12
    for (let i = 0; i < numLayers; i++) {
      waves.push(new SquareWave(i * 70 + Math.random() * 35))
    }

    let animationFrameId: number
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#050810")
      gradient.addColorStop(1, "#0a0f20")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      waves.sort((a, b) => a.z - b.z)
      waves.forEach((wave) => {
        wave.update()
        wave.draw(ctx)
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Reverting to the correct background z-index
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
