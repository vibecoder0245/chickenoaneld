import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import type React from "react"

interface StyledBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  iconClassName?: string
  text: string
  blurColorClass?: string // e.g., "bg-brand-blue", "bg-cyan-500"
}

const StyledBadge: React.FC<StyledBadgeProps> = ({
  icon: Icon,
  iconClassName,
  text,
  blurColorClass = "bg-brand-blue", // Default to brand-blue
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg py-1.5 px-4 text-sm font-medium backdrop-blur-sm overflow-hidden", // overflow-hidden for blur containment
        "border border-white/20 bg-white/10 text-slate-200", // Base style similar to "Games" badge
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 h-full w-full opacity-20 blur-[10px]", // Increased opacity for visibility
          blurColorClass,
        )}
      ></div>
      {Icon && <Icon className={cn("w-4 h-4 relative z-10", iconClassName)} />}
      <span className="relative z-10">{text}</span>
    </div>
  )
}

export default StyledBadge
