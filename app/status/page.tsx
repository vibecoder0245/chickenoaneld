"use client"

import type React from "react"

import Link from "next/link"
import {
  ArrowLeft,
  RefreshCw,
  CircleCheckBig,
  Clock,
  TriangleAlert,
  ShieldCheck,
  Wrench,
  ServerCrash,
  Info,
  AlertTriangle,
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type StatusCategory = "Online" | "Updating" | "Maintenance" | "Offline" | "Monitoring" | "Risk"

interface ProductStatus {
  id: string
  name: string
  status: StatusCategory
  lastUpdated: string // ISO string or formatted date
  slug: string
  description?: string
}

interface Incident {
  id: string
  title: string
  timestamp: string // ISO string or formatted date
  description: string
  type: "resolved" | "investigating" | "monitoring" | "new_feature" | "update"
  updates?: { timestamp: string; message: string }[]
}

// Sample Data - Replace with actual data fetching in a real application
const initialProductStatuses: ProductStatus[] = [
  {
    id: "fn-private",
    name: "Fortnite Private",
    status: "Risk",
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    slug: "/products/fortnite-private",
    description: "Use at own risk. Potential detection issues reported.",
  },
  {
    id: "fn-supreme",
    name: "Fortnite Supreme",
    status: "Online",
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    slug: "/products/fortnite-supreme",
    description: "Fully undetected and operational.",
  },
  {
    id: "spoofer-temp-pro",
    name: "Temp Pro Spoofer",
    status: "Updating",
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    slug: "/products/spoofer-temp-pro",
    description: "Scheduled update in progress. Expected completion soon.",
  },
  {
    id: "spoofer-temp-v2",
    name: "Temp V2 Spoofer",
    status: "Online",
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    slug: "/products/spoofer-temp-v2",
    description: "Fully undetected and operational.",
  },
  {
    id: "rust-supreme",
    name: "Rust Supreme",
    status: "Online",
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago
    slug: "/products/rust-supreme",
    description: "Fully undetected and operational.",
  },
  {
    id: "rust-ultimate",
    name: "Rust Ultimate",
    status: "Online",
    lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    slug: "/products/rust-ultimate",
    description: "Fully undetected and operational.",
  },
  {
    id: "r6-ultimate",
    name: "Rainbow Six Siege Ultimate",
    status: "Online",
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    slug: "/products/r6-ultimate",
    description: "Fully undetected and operational.",
  },
  {
    id: "cod-bo6-blaze",
    name: "COD BO6 Blaze",
    status: "Online",
    lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    slug: "/products/cod-bo6-blaze",
    description: "Fully undetected and operational.",
  },
]

const initialRecentIncidents: Incident[] = [
  {
    id: "inc-new-1",
    title: "Minor Update for Temp V2 Spoofer",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    description:
      "A patch has been released to improve authentication and overall stability. The update will be applied automatically on the next launch.",
    type: "update",
  },
  {
    id: "inc-new-2",
    title: "Fortnite Ultimate - Stability & Compatibility Update",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    description:
      "A new version has been deployed for Fortnite Ultimate. This update resolves a memory-related crash, adds full compatibility for Windows 11 24H2, and includes significant security enhancements.",
    type: "update",
  },
  {
    id: "inc-1",
    title: "Temp Pro Spoofer Update Started",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    description: "Scheduled update for Temp Pro Spoofer has commenced. Minor disruptions may occur.",
    type: "update",
    updates: [
      {
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
        message:
          "The update is still in progress. Our team is working to deploy the final changes. Thank you for your patience.",
      },
    ],
  },
  {
    id: "inc-2",
    title: "Fortnite Private Detection Risk",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    description:
      "We are investigating reports of potential detection issues with Fortnite Private. Use at your own risk until resolved.",
    type: "investigating",
    updates: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        message: "Investigation ongoing. Limited number of accounts affected.",
      },
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        message: "Working on a fix. In the meantime, we recommend using Fortnite Supreme for maximum safety.",
      },
    ],
  },
  {
    id: "inc-3",
    title: "Rust Supreme Update Completed",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description:
      "A compatibility patch for Rust Supreme has been successfully deployed following the latest game update.",
    type: "resolved",
  },
  {
    id: "inc-4",
    title: "New ESP Features for R6 Ultimate",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    description:
      "Exciting new ESP customization options have been added to Rainbow Six Siege Ultimate. All features fully undetected.",
    type: "new_feature",
  },
]

const statusConfig: Record<
  StatusCategory,
  {
    icon: React.ElementType
    colorClasses: string // For text, icon, and light border
    bgColorClasses: string // For background
    name: string
  }
> = {
  Online: {
    icon: CircleCheckBig,
    colorClasses: "text-green-400 border-green-500/30",
    bgColorClasses: "bg-green-500/10",
    name: "Undetected",
  },
  Updating: {
    icon: Clock,
    colorClasses: "text-sky-400 border-sky-500/30", // Using sky for updating
    bgColorClasses: "bg-sky-500/10",
    name: "Updating",
  },
  Maintenance: {
    icon: Wrench,
    colorClasses: "text-yellow-400 border-yellow-500/30",
    bgColorClasses: "bg-yellow-500/10",
    name: "Maintenance",
  },
  Offline: {
    icon: ServerCrash,
    colorClasses: "text-red-400 border-red-500/30",
    bgColorClasses: "bg-red-500/10",
    name: "Offline",
  },
  Monitoring: {
    icon: Info, // Using Info for monitoring
    colorClasses: "text-purple-400 border-purple-500/30",
    bgColorClasses: "bg-purple-500/10",
    name: "Monitoring",
  },
  Risk: {
    icon: AlertTriangle,
    colorClasses: "text-orange-400 border-orange-500/30",
    bgColorClasses: "bg-orange-500/10",
    name: "Use At Own Risk",
  },
}

const incidentTypeConfig: Record<
  Incident["type"],
  {
    icon?: React.ElementType // Optional icon for incident type
    borderColorClass: string
    dotColorClass: string
  }
> = {
  resolved: { icon: ShieldCheck, borderColorClass: "border-green-500", dotColorClass: "bg-green-500" },
  investigating: { icon: TriangleAlert, borderColorClass: "border-yellow-500", dotColorClass: "bg-yellow-500" },
  monitoring: { icon: Info, borderColorClass: "border-sky-500", dotColorClass: "bg-sky-500" },
  new_feature: { borderColorClass: "border-purple-500", dotColorClass: "bg-purple-500" },
  update: { borderColorClass: "border-blue-500", dotColorClass: "bg-blue-500" },
}

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [products, setProducts] = useState(initialProductStatuses)
  const [incidents, setIncidents] = useState(initialRecentIncidents)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    // In a real app, you'd re-fetch data here
    setCurrentTime(new Date())
    // Example: shuffle products for demo
    // setProducts([...products].sort(() => Math.random() - 0.5));
    // setIncidents([...incidents].sort(() => Math.random() - 0.5));
    console.log("Status refreshed")
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const statusCounts = products.reduce(
    (acc, product) => {
      acc[product.status] = (acc[product.status] || 0) + 1
      return acc
    },
    {} as Record<StatusCategory, number>,
  )

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Left Side Light */}
      <div className="fixed left-0 top-0 bottom-0 w-1/4 md:w-1/5 lg:w-1/6 bg-gradient-to-r from-brand/20 via-brand/5 to-transparent pointer-events-none z-0 opacity-50 md:opacity-75 blur-2xl"></div>
      {/* Right Side Light */}
      <div className="fixed right-0 top-0 bottom-0 w-1/4 md:w-1/5 lg:w-1/6 bg-gradient-to-l from-brand/20 via-brand/5 to-transparent pointer-events-none z-0 opacity-50 md:opacity-75 blur-2xl"></div>
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/30 to-background -z-0"></div>

      <div className="container mx-auto px-4 py-12 md:px-6 relative z-10">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-brand via-purple-500 to-pink-500 bg-clip-text text-transparent">
            System Status
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground text-lg">Current status of all CDN Cheats products and services.</p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-zinc-500">Last updated: {currentTime.toLocaleTimeString()}</p>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
            {(Object.keys(statusConfig) as StatusCategory[]).map((key) => {
              const config = statusConfig[key]
              const Icon = config.icon
              return (
                <div
                  key={key}
                  className={cn(
                    "p-4 rounded-xl border bg-card/50 backdrop-blur-sm shadow-lg",
                    config.colorClasses,
                    config.bgColorClasses,
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <h3 className="font-medium text-foreground/90">{config.name}</h3>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{statusCounts[key] || 0}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Status */}
        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Detailed Product Status</h2>
          <div className="space-y-4">
            {products.map((product) => {
              const config = statusConfig[product.status]
              const Icon = config.icon
              return (
                <div
                  key={product.id}
                  className={cn(
                    "p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
                    config.bgColorClasses,
                    config.colorClasses,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 sm:h-5 sm:w-5 shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground/90">{product.name}</h3>
                      <p className="text-xs opacity-80">Last updated: {formatRelativeTime(product.lastUpdated)}</p>
                      {product.description && <p className="text-xs opacity-70 mt-0.5">{product.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 ml-0 sm:ml-auto">
                    <span
                      className={cn(
                        "text-sm font-medium px-2 py-0.5 rounded-full",
                        config.bgColorClasses,
                        config.colorClasses.split(" ")[0],
                      )}
                    >
                      {config.name}
                    </span>
                    <Link
                      href={product.slug}
                      className="text-xs underline opacity-80 hover:opacity-100 hover:text-brand transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Recent Incidents</h2>
          {incidents.length > 0 ? (
            <div className="space-y-8">
              {incidents.map((incident) => {
                const config = incidentTypeConfig[incident.type]
                const Icon = config.icon
                return (
                  <div
                    key={incident.id}
                    className={cn("pl-6 relative", config.borderColorClass)} // Border on the left
                  >
                    <div
                      className={cn(
                        "absolute w-3.5 h-3.5 rounded-full -left-[7.5px] top-1 border-2 border-background",
                        config.dotColorClass,
                      )}
                    ></div>
                    {Icon && (
                      <Icon
                        className={cn(
                          "absolute h-4 w-4 -left-[8.5px] top-[3px] p-0.5 rounded-full text-background",
                          config.dotColorClass,
                        )}
                      />
                    )}

                    <h3 className="font-semibold text-lg text-foreground/90 mb-1 flex items-center gap-2">
                      {incident.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(incident.timestamp).toLocaleString()} ({formatRelativeTime(incident.timestamp)})
                    </p>
                    <p className="text-sm text-foreground/80 mb-3">{incident.description}</p>
                    {incident.updates && incident.updates.length > 0 && (
                      <div className="ml-4 mt-2 space-y-2 border-l border-dashed border-border/50 pl-4 py-1">
                        {incident.updates.map((update, index) => (
                          <div key={index} className="text-xs">
                            <p className="text-muted-foreground/80 mb-0.5">
                              {new Date(update.timestamp).toLocaleString()} ({formatRelativeTime(update.timestamp)})
                            </p>
                            <p className="text-foreground/70">{update.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent incidents to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}
