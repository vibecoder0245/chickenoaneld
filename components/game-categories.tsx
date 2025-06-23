"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CyberButton } from "@/components/ui/cyber-button"

const games = [
  {
    id: 1,
    name: "Rainbow Six Siege",
    image: "/placeholder.svg?height=400&width=400",
    slug: "rainbow-six",
  },
  {
    id: 2,
    name: "Rust",
    image: "/placeholder.svg?height=400&width=400",
    slug: "rust",
  },
  {
    id: 3,
    name: "Counter Strike",
    image: "/placeholder.svg?height=400&width=400",
    slug: "counter-strike",
  },
  {
    id: 4,
    name: "Grand Theft Auto",
    image: "/placeholder.svg?height=400&width=400",
    slug: "gta",
  },
  {
    id: 5,
    name: "FiveM",
    image: "/placeholder.svg?height=400&width=400",
    slug: "fivem",
  },
  {
    id: 6,
    name: "Apex Legends",
    image: "/placeholder.svg?height=400&width=400",
    slug: "apex-legends",
  },
  {
    id: 7,
    name: "Fortnite",
    image: "/placeholder.svg?height=400&width=400",
    slug: "fortnite",
  },
  {
    id: 8,
    name: "HWID Spoofers",
    image: "/placeholder.svg?height=400&width=400",
    slug: "spoofers",
  },
]

export default function GameCategories() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link key={game.id} href={`/catalog/${game.slug}`}>
            <div className="group product-card-wrapper block animate-fadeInUp rounded-xl overflow-hidden will-change-transform">
              <div className="product-card-3d relative flex h-full transform-gpu flex-col bg-cyber-surface/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-out-quart product-card-upgraded will-change-transform backface-hidden motion-safe:group-hover:shadow-[0_0_45px_5px_hsla(var(--primary),0.6)] motion-safe:group-hover:border-red-500/70 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]">
                <div className="card-shine-overlay pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 z-[1]"
                    style={{
                      background:
                        "linear-gradient(to bottom, hsla(var(--cyber-bg), 0.2) 0%, transparent 40%, hsla(var(--cyber-bg), 0.3) 80%, hsla(var(--cyber-bg), 0.7) 100%)",
                    }}
                  ></div>
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    width={400}
                    height={400}
                    className="object-cover transition-transform duration-500 ease-out-quart motion-safe:group-hover:scale-110"
                    style={{ position: "absolute", height: "100%", width: "100%", inset: 0 }}
                  />
                </div>
                <div className="card-content-depth flex flex-1 flex-col p-4 md:p-5 relative z-[1]">
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-cyber-text-primary text-glow-white transition-all duration-300 group-hover:text-red-400 min-h-[2.5rem] md:min-h-[2.5rem] lg:min-h-[3rem]">
                    {game.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-sm font-medium text-green-400 text-glow-green">In stock</span>
                  </div>
                  <div className="mt-auto">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 w-full transform-gpu text-sm font-semibold transition-all duration-300 ease-out-quart motion-safe:group-hover:scale-105 motion-safe:group-hover:bg-red-600/90 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:border-red-400 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-red-500/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out-quart motion-safe:group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-16 text-center">
        <CyberButton variant="primary" size="lg" className="flex items-center">
          View All Products
        </CyberButton>
      </div>
    </div>
  )
}
