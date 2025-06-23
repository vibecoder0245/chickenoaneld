"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Construction, Loader2, ShieldAlert, LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const { isAuthenticated, user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/dashboard")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <Loader2 className="h-16 w-16 animate-spin text-brand" />
        <p className="mt-4 text-lg">Loading Dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <ShieldAlert className="h-20 w-20 text-destructive mb-6" />
        <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">You need to be logged in to view this page.</p>
        <Button asChild className="bg-brand hover:bg-brand/90 text-brand-foreground">
          <Link href="/login?redirect=/dashboard">Go to Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-neutral-900 to-background text-foreground py-8 px-4">
      <main className="container mx-auto max-w-4xl">
        <Card className="bg-card/70 backdrop-blur-lg border-border/30 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-brand/20 via-transparent to-transparent p-6 border-b border-border/30">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4 border-brand/50">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="text-3xl bg-brand text-brand-foreground">
                  {user.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold">Welcome, {user.username}!</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  This is your personal dashboard.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="text-center py-12">
              <Construction className="h-24 w-24 text-brand mx-auto mb-6 animate-bounce" />
              <h2 className="text-2xl font-semibold mb-3">Dashboard Under Construction</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;re working hard to bring you an amazing experience. Stay tuned for updates on your products,
                licenses, and more!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <InfoBox title="Your Email" value={user.email} />
              <InfoBox title="Account ID" value={user.id} />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-brand text-brand hover:bg-brand/10 hover:text-brand"
              >
                <Link href="/catalog/all">Explore Products</Link>
              </Button>
              <Button
                onClick={logout}
                variant="destructive"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOutIcon className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

const InfoBox: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
    <p className="text-base text-foreground truncate">{value}</p>
  </div>
)
