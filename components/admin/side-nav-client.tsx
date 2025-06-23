"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PackagePlus, Users, ScrollText, type LucideIcon } from "lucide-react"

type UserRole = "STAFF" | "ADMIN" | "SUPER_ADMIN" | "OWNER" // Ensure this matches your actual roles

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  minRole?: UserRole // Role required to see this item
  exactRole?: UserRole // Specific role required
}

interface SideNavClientProps {
  userRole: UserRole
}

const navItems: NavItem[] = [
  { href: "/admin/restock", label: "Restock", icon: PackagePlus },
  { href: "/admin/users", label: "Users", icon: Users, minRole: "SUPER_ADMIN" },
  { href: "/admin/audit", label: "Audit Log", icon: ScrollText, exactRole: "OWNER" },
]

// Helper to check role hierarchy
const hasMinimumRole = (userRole: UserRole, minRole: UserRole): boolean => {
  const rolesHierarchy: UserRole[] = ["STAFF", "ADMIN", "SUPER_ADMIN", "OWNER"]
  return rolesHierarchy.indexOf(userRole) >= rolesHierarchy.indexOf(minRole)
}

export function SideNavClient({ userRole }: SideNavClientProps) {
  const pathname = usePathname()

  const filteredNavItems = navItems.filter((item) => {
    if (item.exactRole) return userRole === item.exactRole
    if (item.minRole) return hasMinimumRole(userRole, item.minRole)
    return true // No role restriction
  })

  return (
    <nav className="flex flex-col gap-2">
      {filteredNavItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
