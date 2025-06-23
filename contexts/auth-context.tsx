"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@/types/user"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (userData: User) => void
  signup: (userData: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error)
      localStorage.removeItem("currentUser")
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(
    (userData: User) => {
      localStorage.setItem("currentUser", JSON.stringify(userData))
      setUser(userData)
      // Check for redirect query param or default to dashboard
      const params = new URLSearchParams(window.location.search)
      const redirectPath = params.get("redirect") || "/dashboard"
      router.push(redirectPath)
    },
    [router],
  )

  const signup = useCallback(
    (userData: User) => {
      localStorage.setItem("currentUser", JSON.stringify(userData))
      setUser(userData)
      router.push("/dashboard") // Or /login if you want them to log in after signup
    },
    [router],
  )

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser")
    setUser(null)
    if (pathname.startsWith("/dashboard")) {
      router.push("/") // If on dashboard, redirect to home
    } else {
      router.push(pathname) // Otherwise, refresh current page or stay (might need specific logic)
    }
  }, [router, pathname])

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
