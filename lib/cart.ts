import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PurchaseOption } from "@/lib/products"

export interface CartLine {
  id: string
  name: string
  price: number // Should store as number
  displayPrice: string
  qty: number
  image?: string
  shopifyVariantId?: string
  saInfo?: { shopId: number; productId: number; variantId: number }
}

interface CartStore {
  lines: CartLine[]
  totalItems: number
  totalPrice: string // Formatted string e.g. "$10.00"
  isCartOpen: boolean

  add: (product: { id: string; name: string; image?: string }, po: PurchaseOption, qty?: number) => void
  remove: (lineId: string) => void
  inc: (lineId: string) => void
  dec: (lineId: string) => void
  clear: () => void
  setIsCartOpen: (isOpen: boolean | ((v: boolean) => boolean)) => void

  createShopifyCart: (lines: CartLine[], email: string) => Promise<string>
  createSellAuthCheckout: (
    lines: CartLine[],
    email: string,
    gateway: "PAYPALFF" | "CASHAPP" | "BTC" | "LTC", // Specific gateways
  ) => Promise<void>
}

const toNum = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number.parseFloat(String(v).replace(/[^0-9.]/g, "")) // Sanitize before parsing
  return Number.isFinite(n) ? n : 0
}

const recalculateTotals = (lines: CartLine[]) => {
  const totalItems = lines.reduce((s, l) => s + l.qty, 0)
  // Ensure price is treated as a number for calculation
  const numericTotal = lines.reduce((s, l) => s + toNum(l.price) * l.qty, 0)
  const currency = lines[0]?.displayPrice?.match(/^([^\d.,\s]+)/)?.[1] || "$"
  return { totalItems, totalPrice: `${currency}${numericTotal.toFixed(2)}` }
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      lines: [],
      totalItems: 0,
      totalPrice: "$0.00",
      isCartOpen: false,

      setIsCartOpen: (isOpen) => {
        if (typeof isOpen === "function") {
          set((state) => ({ isCartOpen: isOpen(state.isCartOpen) }))
        } else {
          set({ isCartOpen: isOpen })
        }
      },

      add: (product, po, qty = 1) => {
        set((state) => {
          const existingLine = state.lines.find((l) => l.id === po.id)
          let newLines
          if (existingLine) {
            newLines = state.lines.map((l) => (l.id === po.id ? { ...l, qty: l.qty + qty } : l))
          } else {
            const newLine: CartLine = {
              id: po.id,
              name: `${product.name} - ${po.name}`,
              price: toNum(po.price), // Store price as number
              displayPrice: po.displayPrice,
              qty,
              image: product.image,
              shopifyVariantId: po.shopifyVariantId,
              saInfo: po.saInfo,
            }
            newLines = [...state.lines, newLine]
          }
          return { lines: newLines, ...recalculateTotals(newLines) }
        })
      },

      remove: (lineId) => {
        set((state) => {
          const newLines = state.lines.filter((l) => l.id !== lineId)
          return { lines: newLines, ...recalculateTotals(newLines) }
        })
      },

      inc: (lineId) => {
        set((state) => {
          const newLines = state.lines.map((l) => (l.id === lineId ? { ...l, qty: l.qty + 1 } : l))
          return { lines: newLines, ...recalculateTotals(newLines) }
        })
      },

      dec: (lineId) => {
        set((state) => {
          const line = state.lines.find((l) => l.id === lineId)
          let newLines
          if (line && line.qty > 1) {
            newLines = state.lines.map((l) => (l.id === lineId ? { ...l, qty: l.qty - 1 } : l))
          } else {
            newLines = state.lines.filter((l) => l.id !== lineId) // Remove if qty becomes 0 or less
          }
          return { lines: newLines, ...recalculateTotals(newLines) }
        })
      },

      clear: () => {
        set({ lines: [], totalItems: 0, totalPrice: "$0.00" })
      },

      createShopifyCart: async (lines, email) => {
        const shopifyLines = lines
          .filter((l) => !!l.shopifyVariantId && !l.shopifyVariantId.startsWith("placeholder-"))
          .map((l) => ({ variantId: l.shopifyVariantId!, quantity: l.qty }))

        if (shopifyLines.length === 0) throw new Error("No valid Shopify items in cart.")

        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, lines: shopifyLines }),
        })
        const json = await res.json()
        if (!json.success || !json.url) {
          throw new Error(json.message || "Shopify checkout creation failed.")
        }
        return json.url
      },

      /** Creates a SellAuth invoice (PayPal F&F, Cash App, BTC, LTC …) */
      createSellAuthCheckout: async (lines, email: string, gateway: "PAYPALFF" | "CASHAPP" | "BTC" | "LTC") => {
        const cart = lines
          .filter((l) => l.saInfo)
          .map((l) => ({
            productId: l.saInfo!.productId,
            variantId: l.saInfo!.variantId,
            quantity: l.qty,
          }))
        if (cart.length === 0) throw new Error("No SellAuth items in cart.")

        const res = await fetch("/api/sa-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart, email, gateway }),
        })
        const json = await res.json()
        if (!json.success || !json.url) {
          throw new Error(json.message || "SellAuth checkout failed")
        }
        window.location.href = json.url // redirect to invoice
      },
    }),
    {
      name: "cdn-cheats-cart",
      partialize: (state) => ({
        lines: state.lines,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    },
  ),
)
