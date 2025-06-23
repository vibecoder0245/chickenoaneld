import type React from "react"
import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  icon?: React.ReactNode
}

const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, children, variant = "primary", size = "default", icon, ...props }, ref) => {
    return (
      <button
        className={cn(
          "duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          {
            "bg-blue-600 text-white hover:bg-blue-700 shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-blue-500/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700":
              variant === "primary",
            "border border-blue-600/50 bg-transparent text-blue-500 hover:bg-blue-900/20 shadow-lg":
              variant === "outline",
            "border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 shadow-lg": variant === "secondary",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3": size === "sm",
            "h-14 px-8 py-2 text-lg": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    )
  },
)

CyberButton.displayName = "CyberButton"

export { CyberButton }
