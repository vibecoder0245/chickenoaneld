"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { PlusCircle, RefreshCcw } from "lucide-react"
import { useState } from "react"

interface QuickActionsClientProps {
  onOpenRestockDrawer: () => void // Callback to open the existing drawer
}

export function QuickActionsClient({ onOpenRestockDrawer }: QuickActionsClientProps) {
  const [isResyncing, setIsResyncing] = useState(false)

  const handleResyncInventory = async () => {
    setIsResyncing(true)
    toast.info("Attempting to re-sync inventory...")
    try {
      const response = await fetch("/admin/api/resync", { method: "POST" })
      const result = await response.json()
      if (response.ok && result.ok) {
        toast.success(result.message || "Inventory re-sync initiated successfully!")
      } else {
        toast.error(result.error || "Failed to re-sync inventory.")
      }
    } catch (error) {
      console.error("Resync error:", error)
      toast.error("An error occurred while re-syncing inventory.")
    } finally {
      setIsResyncing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={onOpenRestockDrawer} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />+ Add Keys
        </Button>
        <Button onClick={handleResyncInventory} disabled={isResyncing}>
          {isResyncing ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
          Re-sync Inventory
        </Button>
      </CardContent>
    </Card>
  )
}
