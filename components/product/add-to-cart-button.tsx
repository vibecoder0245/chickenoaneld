"use client"

import type React from "react"
import { ShoppingCart, AlertCircle } from 'lucide-react' // Added AlertCircle for error icon
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import type { Product, PurchaseOption } from "@/lib/products"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast" // Import ToastAction

interface AddToCartButtonProps {
  product: Pick<Product, "id" | "name" | "displayName" | "image" | "stockStatus">
  option: PurchaseOption
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

export function AddToCartButton({
  product,
  option,
  className,
  variant = "default",
  size = "default",
  children,
}: AddToCartButtonProps) {
  const { add, setIsCartOpen } = useCart((s) => ({ add: s.add, setIsCartOpen: s.setIsCartOpen }))
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (product.stockStatus !== "online") {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive-foreground" />
            Item Unavailable
          </div>
        ),
        description: `${product.displayName || product.name} is currently ${product.stockStatus}.`,
        duration: 5000,
      })
      return
    }

    try {
      add({ id: product.id, name: product.displayName || product.name, image: product.image }, option)
      
      // 👇 Add this line for debugging
      console.log("Toast should be appearing now for:", product.displayName);

      toast({
        title: "Added to Cart!",
        description: `${product.displayName || product.name} (${option.name}) has been added.`,
        action: (
          <ToastAction altText="View Cart" onClick={() => setIsCartOpen(true)}>
            View Cart
          </ToastAction>
        ),
        duration: 3000, // Auto-dismiss after 3 seconds
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive-foreground" />
            Error
          </div>
        ),
        description: "Could not add item to cart. Please try again.",
        duration: 5000,
      })
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      className={className}
      variant={variant}
      size={size}
      disabled={product.stockStatus !== "online"}
    >
      {children || (
        <div className="flex items-center">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </div>
      )}
    </Button>
  )
}
