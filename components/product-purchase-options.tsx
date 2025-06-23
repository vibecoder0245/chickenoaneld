"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { PurchaseOption } from "@/lib/products" // Ensure this path is correct

interface ProductPurchaseOptionsProps {
  options: PurchaseOption[]
  defaultSelectedId?: string
  onOptionSelect: (option: PurchaseOption) => void
  className?: string
}

export const ProductPurchaseOptions: React.FC<ProductPurchaseOptionsProps> = ({
  options,
  defaultSelectedId,
  onOptionSelect,
  className,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    defaultSelectedId || (options.length > 0 ? options.find((o) => o.isPopular)?.id || options[0].id : undefined),
  )

  React.useEffect(() => {
    const selectedOpt = options.find((opt) => opt.id === selectedOptionId)
    if (selectedOpt) {
      onOptionSelect(selectedOpt)
    }
  }, [selectedOptionId, options, onOptionSelect])

  const handleSelect = (option: PurchaseOption) => {
    setSelectedOptionId(option.id)
    // onOptionSelect(option) // Already handled by useEffect
  }

  if (!options || options.length === 0) {
    return <p className="text-slate-400">No purchase options available.</p>
  }

  return (
    <div className={cn("space-y-2.5", className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelect(option)}
          className={cn(
            "w-full flex items-center justify-between p-3.5 rounded-lg border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
            "bg-slate-800/70 backdrop-blur-sm", // Dark background for options
            selectedOptionId === option.id
              ? "border-blue-500 shadow-lg shadow-blue-500/30" // Blue border for selected
              : "border-slate-700 hover:border-slate-600",
          )}
        >
          <span className="font-medium text-slate-100 text-sm">{option.name}</span>
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-md",
              selectedOptionId === option.id ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300",
            )}
          >
            {option.displayPrice}
          </span>
        </button>
      ))}
    </div>
  )
}
