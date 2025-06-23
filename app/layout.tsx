import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script" // Added
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import NewHeader from "@/components/new-header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster" // Ensure this import exists
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Astral Realm Enhancements - Premium Game Enhancements",
  description:
    "Elevate your gameplay with premium, undetected cheats and HWID spoofers by Astral Realm Enhancements LLC.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SellAuth embed script - Placed in head as per common practice for external scripts */}
        <Script
          src="https://sellauth.com/assets/js/sellauth-embed-2.js"
          strategy="afterInteractive" // Loads after the page becomes interactive
        />
      </head>
      <body className={cn(inter.className, "antialiased bg-background text-foreground flex flex-col min-h-screen")}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <ScrollToTop />
            <NewHeader />
            <main className="flex-grow w-full pt-[var(--header-height)]">{children}</main>
            <Footer />
            <Toaster /> {/* Ensure this component is here */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
