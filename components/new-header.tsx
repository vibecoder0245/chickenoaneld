"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  Menu,
  X,
  Users,
  Activity,
  LogOut,
  LayoutDashboard,
  Loader2,
  ShieldCheck,
  LogIn,
  Package,
  ShoppingCart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { AuthButtons } from "@/components/auth/auth-buttons"
import CartDrawer from "@/components/cart-drawer"
import { useCart } from "@/lib/cart"

const navigationItems: MenuItem[] = [
  { icon: <Home className="h-4 w-4" />, label: "Home", href: "/" },
  { icon: <Package className="h-4 w-4" />, label: "Products", href: "/catalog/all" },
  { icon: <Users className="h-4 w-4" />, label: "Discord", href: "https://discord.gg/cdnontop" },
  { icon: <Activity className="h-4 w-4" />, label: "Status", href: "/status" },
]

interface MenuItem {
  icon: React.ReactNode
  label: string
  href?: string
  isDropdown?: boolean
  subItems?: SubMenuItem[]
}

interface SubMenuItem {
  label: string
  href: string
  icon?: React.ReactNode
}

const itemVariants = {
  initial: { y: 0, opacity: 1 },
  hover: { y: -2, transition: { duration: 0.2 } },
}

const logoVariants = {
  initial: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, opacity: 1, transition: { duration: 0.2 } },
}

export default function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  const totalItems = useCart((state) => state.totalItems)
  const setIsCartOpen = useCart((state) => state.setIsCartOpen)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith("/#")) {
      const targetId = href.substring(2)
      if (pathname === "/") {
        e.preventDefault()
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10",
    isScrolled || isMobileMenuOpen ? "bg-background/80 backdrop-blur-lg shadow-md py-3" : "bg-background py-5",
  )
  const navLinkBaseClasses = "px-3 py-2 text-sm font-medium rounded-md flex items-center hover:bg-foreground/5"

  const renderAuthSectionDesktop = () => {
    if (isLoading) return <Loader2 className="h-6 w-6 animate-spin text-brand" />
    if (isAuthenticated && user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 group">
              <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-brand transition-colors">
                <AvatarImage
                  src={user.avatarUrl || "/placeholder.svg?width=36&height=36&query=user+avatar"}
                  alt={user.username}
                />
                <AvatarFallback className="bg-brand text-brand-foreground">
                  {user.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-card/90 backdrop-blur-md border-border/50 shadow-xl mr-4"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1 p-1">
                <p className="text-sm font-medium leading-none">{user.username}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/10">
              <Link href="/dashboard" className="flex items-center w-full">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-destructive hover:!bg-destructive/10 hover:!text-destructive focus:!bg-destructive/10 focus:!text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return <AuthButtons />
  }

  const renderAuthSectionMobile = () => {
    if (isLoading)
      return (
        <div className="flex justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-brand" />
        </div>
      )
    if (isAuthenticated && user) {
      return (
        <>
          <Link
            href="/dashboard"
            className="flex items-center p-3 rounded-lg hover:bg-foreground/5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-brand" /> Dashboard
          </Link>
          <button
            onClick={() => {
              logout()
              setIsMobileMenuOpen(false)
            }}
            className="flex items-center w-full p-3 rounded-lg text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </button>
        </>
      )
    }
    return (
      <>
        <Link
          href="/login"
          className="flex items-center p-3 rounded-lg text-brand border border-brand hover:bg-brand/10"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <LogIn className="mr-3 h-5 w-5" /> Login
        </Link>
        <Link
          href="/signup"
          className="flex items-center p-3 rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <ShieldCheck className="mr-3 h-5 w-5" /> Sign Up
        </Link>
      </>
    )
  }

  return (
    <motion.header className={headerClasses} initial="initial" animate="initial">
      <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            initial="initial"
            animate="initial"
            className="flex items-center"
          >
            <Image
              src="/images/logo/cdn-logo-new-blue.png"
              alt="CDN Cheats Logo"
              width={150}
              height={40}
              priority
              className="h-auto"
            />
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) =>
            item.href!.startsWith("http") ? (
              <motion.a
                key={item.label}
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(navLinkBaseClasses, "text-foreground/80 hover:text-brand")}
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
                animate="initial"
              >
                {item.icon} <span className="ml-2">{item.label}</span>
              </motion.a>
            ) : (
              <Link href={item.href!} passHref legacyBehavior key={item.label}>
                <motion.a
                  onClick={(e) => handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, item.href!)}
                  className={cn(
                    navLinkBaseClasses,
                    pathname === item.href ? "text-brand" : "text-foreground/80 hover:text-brand",
                  )}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="initial"
                  animate="initial"
                >
                  {item.icon} <span className="ml-2">{item.label}</span>
                </motion.a>
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {renderAuthSectionDesktop()}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground/80 hover:text-brand"
            onClick={() => setIsCartOpen((v) => !v)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-md">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          {isAuthenticated && !isLoading && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 group mr-1">
                  <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-brand transition-colors">
                    <AvatarImage
                      src={user?.avatarUrl || "/placeholder.svg?width=36&height=36&query=user+avatar"}
                      alt={user?.username}
                    />
                    <AvatarFallback className="bg-brand text-brand-foreground">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-card/90 backdrop-blur-md border-border/50 shadow-xl"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 p-1">
                    <p className="text-sm font-medium leading-none">{user?.username}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/10">
                  <Link
                    href="/dashboard"
                    className="flex items-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="cursor-pointer text-destructive hover:!bg-destructive/10 hover:!text-destructive focus:!bg-destructive/10 focus:!text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground/80 hover:text-brand ml-1"
            onClick={() => setIsCartOpen((v) => !v)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-md">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-1", "text-foreground/80 hover:text-brand")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/30">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) =>
              item.href!.startsWith("http") ? (
                <a
                  key={item.label}
                  href={item.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center p-3 rounded-lg hover:bg-foreground/5",
                    "text-foreground hover:text-brand",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon} <span className="ml-3">{item.label}</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    "flex items-center p-3 rounded-lg hover:bg-foreground/5",
                    pathname === item.href ? "text-brand" : "text-foreground hover:text-brand",
                  )}
                  onClick={(e) => handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, item.href!)}
                >
                  {item.icon} <span className="ml-3">{item.label}</span>
                </Link>
              ),
            )}
            <DropdownMenuSeparator className="bg-border/30 my-3" />
            <div className="pt-2 flex flex-col space-y-3">{renderAuthSectionMobile()}</div>
          </div>
        </div>
      )}
      <CartDrawer />
    </motion.header>
  )
}
