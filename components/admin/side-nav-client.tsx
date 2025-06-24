"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  PackagePlus,
  Users,
  ScrollText,
  type LucideIcon,
} from "lucide-react"

/* ----------------------------------------------------------------– */
/*  1.  ROLES & NAV ITEM TYPES                                        */
/* ----------------------------------------------------------------– */

type UserRole = "STAFF" | "ADMIN" | "SUPER_ADMIN" | "OWNER"

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  minRole?: UserRole   // minimum role allowed
  exactRole?: UserRole // show ONLY for this exact role
}

interface SideNavClientProps {
  userRole: UserRole
}

/* ----------------------------------------------------------------– */
/*  2.  NAVIGATION CONFIG                                             */
/* ----------------------------------------------------------------– */

const navItems: NavItem[] = [
  { href: "/admin/restock", label: "Restock",   icon: PackagePlus },
  { href: "/admin/users",   label: "Users",     icon: Users,      minRole: "SUPER_ADMIN" },
  { href: "/admin/audit-log", label: "Audit Log", icon: ScrollText, exactRole: "OWNER" },
]

const rolesHierarchy: UserRole[] = ["STAFF", "ADMIN", "SUPER_ADMIN", "OWNER"]
const hasMinimumRole = (user: UserRole, min: UserRole) =>
  rolesHierarchy.indexOf(user) >= rolesHierarchy.indexOf(min)

/* ----------------------------------------------------------------– */
/*  3.  COMPONENT                                                     */
/* ----------------------------------------------------------------– */

export function SideNavClient({ userRole }: SideNavClientProps) {
  const pathname = usePathname()

  const visibleItems = navItems.filter((item) => {
    if (item.exactRole)   return userRole === item.exactRole
    if (item.minRole)     return hasMinimumRole(userRole, item.minRole)
    return true
  })

  return (
    <nav className="flex flex-col gap-2">
      {visibleItems.map(({ href, label, icon: Icon }) => (
        <Button
          key={href}
          variant={pathname === href ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
        >
          <Link href={href}>
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
