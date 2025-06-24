/* ------------------------------------------------------------------------
   components/admin/stock-table.tsx
   Simple server component that shows live stock for BOTH providers
   --------------------------------------------------------------------- */

import { getUnifiedStock } from "@/lib/stockService"
import { Package, CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type Row = { sku: string; qty: number; source: "EDP" | "SA" }

function formatRows(stock: Record<string, number>): Row[] {
  return Object.entries(stock).map(([sku, qty]) => {
    // sku convention:  "EDP-12345"  or  "SA-98"
    const [src, id] = sku.split("-")
    return { sku: id, qty, source: src as Row["source"] }
  })
}

export default async function StockTable() {
  /* ---------- 1. Get live data (no-store) ---------------------------- */
  const stock = await getUnifiedStock()      // { "EDP-123": 54, "SA-92": 12 }
  const rows  = formatRows(stock)

  /* ---------- 2.  Little helpers for UI ----------------------------- */
  const badge = (qty: number) =>
    qty > 20 ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : qty > 5 ? (
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-destructive" />
    )

  /* ---------- 3.  Render ------------------------------------------- */
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2">
        <Package className="h-5 w-5 opacity-70" />
        <h2 className="text-lg font-semibold">Live Stock</h2>
      </CardHeader>

      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="text-left py-1">SKU</th>
              <th className="text-left py-1">Provider</th>
              <th className="text-right py-1">Qty</th>
              <th className="sr-only">status</th>
            </tr>
          </thead>

          <tbody className="[&>tr:nth-child(odd)]:bg-muted/30">
            {rows.map((row) => (
              <tr key={`${row.source}-${row.sku}`} className="border-b last:border-0">
                <td className="py-1 pr-2 font-mono">{row.sku}</td>
                <td className="py-1 pr-2">{row.source === "EDP" ? "Shopify" : "SellAuth"}</td>
                <td className="py-1 text-right tabular-nums">{row.qty}</td>
                <td className="pl-2">{badge(row.qty)}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={4} className="py-3 text-center text-muted-foreground">
                  No stock data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
