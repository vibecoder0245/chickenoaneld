"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoryMap, type ProductCategory } from "@/lib/products"

interface CategorySwitcherProps {
  currentCategory: ProductCategory
}

export function CategorySwitcher({ currentCategory }: CategorySwitcherProps) {
  const router = useRouter()

  const handleValueChange = (value: string) => {
    router.push(`/catalog/${value}`)
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={currentCategory}>
      <SelectTrigger className="w-full sm:w-[180px] bg-white/5 border-white/10 text-white h-10">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900/80 backdrop-blur-md border-white/20 text-white">
        {Object.entries(categoryMap).map(([key, name]) => (
          <SelectItem key={key} value={key} className="cursor-pointer hover:bg-white/10">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
