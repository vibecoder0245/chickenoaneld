import Link from "next/link"
import { LogIn, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

export function AuthButtons() {
  const commonLinkStyles =
    "relative group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold text-white shadow-md transition-all duration-300 ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"

  const commonGradientSpanStyles =
    "absolute inset-0 -z-10 rounded-md bg-gradient-to-br from-brand-light via-brand to-brand-light group-hover:from-brand group-hover:via-brand-dark group-hover:to-brand transition-colors duration-300 ease-out-quart"

  // Adjusted padding for header buttons
  const paddingStyles = "px-4 py-2" // You can adjust this if needed, e.g., "px-3 py-1.5" for smaller buttons

  return (
    <div className="flex gap-3">
      <Link href="/login" className={cn(commonLinkStyles, paddingStyles)}>
        <span aria-hidden="true" className={commonGradientSpanStyles}></span>
        <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
        <span>Login</span>
      </Link>

      <Link href="/signup" className={cn(commonLinkStyles, paddingStyles)}>
        <span aria-hidden="true" className={commonGradientSpanStyles}></span>
        <UserPlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
        <span>Sign Up</span>
      </Link>
    </div>
  )
}
