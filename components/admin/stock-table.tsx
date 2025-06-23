"use client"

import useSWR from "swr"
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StockItem {
  name: string
  count: number
  crit: number
  warn: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function StockTable() {
  const {
    data: stockItems,
    error,
    isLoading,
    isValidating,
  } = useSWR<StockItem[]>("/admin/api/stock", fetcher, {
    refreshInterval: 30000, // 30 seconds
  })

  const getRowClass = (item: StockItem) => {
    if (item.count <= item.crit) {
      return "bg-red-950/60 text-red-300 hover:bg-red-950/80"
    }
    if (item.count <= item.warn) {
      return "bg-amber-900/40 text-amber-300 hover:bg-amber-900/60"
    }
    return "bg-green-900/30 text-green-300 hover:bg-green-900/50"
  }

  const getStatusIcon = (item: StockItem) => {
    if (item.count <= item.crit) {
      return <AlertTriangle className="h-4 w-4 text-red-400" />
    }
    if (item.count <= item.warn) {
      return <AlertTriangle className="h-4 w-4 text-amber-400" />
    }
    return <CheckCircle className="h-4 w-4 text-green-400" />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Live Stock Levels</CardTitle>
        {isValidating && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-muted-foreground">Loading stock data...</p>}
        {error && <p className="text-sm text-red-500">Failed to load stock data.</p>}
        {stockItems && stockItems.length === 0 && (
          <p className="text-sm text-muted-foreground">No stock items found.</p>
        )}
        {stockItems && stockItems.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px] p-2"></TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems.map((item) => (
                <TableRow key={item.name} className={cn(getRowClass(item), "transition-colors")}>
                  <TableCell className="p-2">{getStatusIcon(item)}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
