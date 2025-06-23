"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import type { PurchaseOption, ProductStatus, Product as ProductType } from "@/lib/products" // Added ProductType
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Wallet, ShoppingCart } from "lucide-react" // Added ShoppingCart
import { useCart } from "@/lib/cart" // Import useCart

// Payment Icons - Assuming these are correctly located as per previous setup
import { AmexIcon } from "./icons/payment/amex-icon"
import { ApplePayIcon } from "./icons/payment/apple-pay-icon"
import { CashappIcon } from "./icons/payment/cashapp-icon"
import { CryptoIcon } from "./icons/payment/crypto-icon"
import { DiscoverIcon } from "./icons/payment/discover-icon"
import { GooglePayIcon } from "./icons/payment/google-pay-icon"
import { MaestroIcon } from "./icons/payment/maestro-icon"
import { MastercardIcon } from "./icons/payment/mastercard-icon"
import { PaypalIcon } from "./icons/payment/paypal-icon"
import { VisaIcon } from "./icons/payment/visa-icon"

interface NewProductPurchaseOptionsProps {
  product: Pick<ProductType, "id" | "name" | "displayName" | "image" | "stockStatus"> // Pass necessary product info
  options: PurchaseOption[]
  defaultSelectedId?: string
  onOptionSelect: (option: PurchaseOption | null) => void
  onBuyNow: (option: PurchaseOption, quantity: number) => void
  productStockStatus: ProductStatus
}

const paymentMethods = [
  { name: "Visa", Icon: VisaIcon },
  { name: "Mastercard", Icon: MastercardIcon },
  { name: "Amex", Icon: AmexIcon },
  { name: "Discover", Icon: DiscoverIcon },
  { name: "Apple Pay", Icon: ApplePayIcon },
  { name: "Google Pay", Icon: GooglePayIcon },
  { name: "Maestro", Icon: MaestroIcon },
  { name: "PayPal", Icon: PaypalIcon },
  { name: "Cash App", Icon: CashappIcon },
  { name: "Crypto", Icon: CryptoIcon },
]

export const NewProductPurchaseOptions: React.FC<NewProductPurchaseOptionsProps> = ({
  product, // Destructure product
  options,
  defaultSelectedId,
  onOptionSelect,
  onBuyNow,
  productStockStatus,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    defaultSelectedId || (options.length > 0 ? options.find((o) => o.isPopular)?.id || options[0].id : undefined),
  )
  const [quantity, setQuantity] = useState(1)
  const { add: addItemToCart } = useCart() // Get add function from useCart

  const selectedOption = useMemo(() => options.find((opt) => opt.id === selectedOptionId), [options, selectedOptionId])

  useEffect(() => {
    if (!selectedOptionId && options.length > 0) {
      const initialOption = options.find((opt) => opt.isPopular) || options[0]
      setSelectedOptionId(initialOption.id)
    }
  }, [options, selectedOptionId])

  useEffect(() => {
    if (selectedOption) {
      onOptionSelect(selectedOption)
    } else {
      onOptionSelect(null)
    }
  }, [selectedOption, onOptionSelect])

  const handleSelect = (option: PurchaseOption) => {
    setSelectedOptionId(option.id)
    setQuantity(1)
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  const handleAddToCart = () => {
    if (selectedOption && product) {
      addItemToCart(
        {
          id: product.id,
          name: product.displayName || product.name,
          image: product.image,
        },
        selectedOption,
        quantity, // Pass the current quantity state
      )
      // toast({ title: "Added to cart!", description: `${product.displayName} - ${selectedOption.name} (x${quantity}) has been added.` });
    }
  }

  const totalPrice = useMemo(() => {
    if (selectedOption && selectedOption.price) {
      return (selectedOption.price * quantity).toFixed(2)
    }
    return "0.00"
  }, [selectedOption, quantity])

  const currencySymbol = useMemo(() => {
    if (selectedOption?.displayPrice) {
      const match = selectedOption.displayPrice.match(/^([^\d.,\s]+)/)
      return match ? match[1] : "€"
    }
    const firstOptionWithPrice = options.find((opt) => opt.displayPrice)
    if (firstOptionWithPrice?.displayPrice) {
      const match = firstOptionWithPrice.displayPrice.match(/^([^\d.,\s]+)/)
      return match ? match[1] : "€"
    }
    return "€"
  }, [selectedOption, options])

  if (!options || options.length === 0) {
    return <p className="text-xs text-slate-400">No purchase options available.</p>
  }

  const isBuyButtonDisabled = !selectedOption || productStockStatus !== "online"
  const isAddToCartDisabled = !selectedOption || productStockStatus !== "online"

  return (
    <div
      className="bg-slate-800/60 border border-slate-700/80 p-4 shadow-xl rounded-lg flex flex-col gap-4"
      style={
        {
          "--colors-brand": "hsl(var(--brand))",
          "--brand-foreground": "hsl(var(--brand-foreground))",
        } as React.CSSProperties
      }
    >
      <div>
        <div className="text-sm font-medium text-slate-300 mb-2">Variants:</div>
        <div className="grid gap-2.5">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-md border-2 p-3 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800",
                selectedOptionId === option.id
                  ? "border-brand bg-brand/10 shadow-md shadow-brand/20"
                  : "border-slate-700 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800/70",
              )}
            >
              <span className="text-base font-medium text-slate-100">{option.name}</span>
              <div
                className={cn(
                  "whitespace-nowrap rounded-md px-2.5 py-1 text-sm font-bold shadow transition-colors duration-150",
                  selectedOptionId === option.id
                    ? "bg-brand text-brand-foreground"
                    : "bg-slate-600 text-slate-200 group-hover:bg-slate-500",
                )}
              >
                {option.displayPrice}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Quantity:</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1 || !selectedOption}
            className="h-8 w-8 border-slate-600 bg-slate-700/60 text-slate-300 hover:bg-slate-600/80 hover:text-slate-100 transition-colors duration-150 rounded-md"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="text-base font-semibold w-7 text-center text-slate-100">
            {selectedOption ? quantity : "-"}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={!selectedOption}
            className="h-8 w-8 border-slate-600 bg-slate-700/60 text-slate-300 hover:bg-slate-600/80 hover:text-slate-100 transition-colors duration-150 rounded-md"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-slate-300">Total:</span>
        <span className="text-2xl font-bold text-brand">
          {selectedOption ? `${currencySymbol}${totalPrice}` : `${currencySymbol}0.00`}
        </span>
      </div>

      {/* Button Container */}
      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={() => selectedOption && onBuyNow(selectedOption, quantity)}
          disabled={isBuyButtonDisabled}
          className="flex-1 h-14 text-lg font-semibold bg-brand text-brand-foreground hover:bg-brand/90 shadow-lg hover:shadow-brand/40 transition-all duration-200 flex items-center justify-center gap-2 rounded-md"
        >
          <Wallet className="h-5 w-5" />
          <span>Buy Now</span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          className="h-14 w-fit text-lg font-medium border-slate-600 bg-slate-700/60 text-slate-200 hover:bg-slate-600/80 hover:text-slate-100 shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 rounded-md px-4 py-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add To Cart</span>
        </Button>
      </div>

      <Separator className="my-1 bg-slate-700/60" />

      <div className="text-center">
        <h4 className="text-xs font-medium text-slate-400 mb-2">Secure Payment Methods</h4>
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1.5">
          {paymentMethods.map(({ name, Icon }) => (
            <div
              key={name}
              title={name}
              className="p-1 bg-slate-700/50 flex items-center space-x-1 hover:bg-slate-600/60 transition-colors duration-150 rounded-sm cursor-default"
            >
              <Icon className="h-4 w-auto text-slate-300" />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 pt-1.5">All transactions are secure and SSL encrypted.</p>
      </div>
    </div>
  )
}
