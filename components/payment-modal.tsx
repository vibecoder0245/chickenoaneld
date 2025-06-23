"use client"

import type * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { LucideCreditCard, Store, Loader2 } from "lucide-react"

import { AmexIcon } from "./icons/payment/amex-icon"
import { DiscoverIcon } from "./icons/payment/discover-icon"
import { MaestroIcon } from "./icons/payment/maestro-icon"
import { MastercardIcon } from "./icons/payment/mastercard-icon"
import { VisaIcon } from "./icons/payment/visa-icon"
import { ApplePayIcon } from "./icons/payment/apple-pay-icon"
import { GooglePayIcon } from "./icons/payment/google-pay-icon"
import { PaypalIcon } from "./icons/payment/paypal-icon"
import { CashappIcon } from "./icons/payment/cashapp-icon"
import { CryptoIcon } from "./icons/payment/crypto-icon" // Generic crypto icon
import { BitcoinIcon } from "./icons/payment/bitcoin-icon"
import { LitecoinIcon } from "./icons/payment/litecoin-icon"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  selectedOptionName: string
  selectedOptionPrice: string
  initialQuantity: number
  shopifyVariantId?: string
  saInfo?: { shopId: number; productId: number; variantId: number }
}

const isShopifyPlaceholder = (id?: string) => !id || id.startsWith("placeholder-") || !/^\d+$/.test(id)

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  productName,
  selectedOptionName,
  selectedOptionPrice,
  initialQuantity,
  shopifyVariantId,
  saInfo,
}) => {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [qty, setQty] = useState(initialQuantity)
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<string | null>(null) // Stores the 'name' of the method
  const [showCryptoPicker, setShowCryptoPicker] = useState(false)

  const unitPrice = useMemo(() => {
    const priceString = selectedOptionPrice.replace(/[^0-9.]/g, "")
    return Number.parseFloat(priceString) || 0
  }, [selectedOptionPrice])

  const totalPrice = useMemo(() => {
    return unitPrice * qty
  }, [unitPrice, qty])

  const formattedTotalPrice = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalPrice)
  }, [totalPrice])

  const disabledCard = isShopifyPlaceholder(shopifyVariantId) || loading || !email
  const disabledAlt = !saInfo || loading || !email

  useEffect(() => {
    if (isOpen) {
      setQty(Math.max(1, initialQuantity ?? 1))
      setShowCryptoPicker(false)
      setCurrentPaymentMethod(null)
    }
  }, [isOpen, initialQuantity])

  async function payWithCard() {
    setCurrentPaymentMethod("Card") // Generic label for card payment
    if (!email) {
      toast({ title: "Email required", description: "Please enter your e-mail address to proceed." })
      setCurrentPaymentMethod(null)
      return
    }
    if (isShopifyPlaceholder(shopifyVariantId)) {
      toast({ title: "Coming soon", description: "Card payment for this plan isn’t available yet." })
      setCurrentPaymentMethod(null)
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          lines: [{ variantId: shopifyVariantId!, quantity: qty }],
        }),
      })
      const json = await res.json()
      if (res.ok && json.url) {
        window.location.href = json.url
      } else {
        throw new Error(json.message || "Failed to create Shopify checkout session.")
      }
    } catch (e: any) {
      toast({ title: "Payment error", description: e.message || "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
      setCurrentPaymentMethod(null)
    }
  }

  async function payWithSellAuth(params: {
    name: string // For UI feedback (e.g., "PayPal", "Bitcoin")
    gateway: "PAYPALFF" | "CASHAPP" | "BTC" | "LTC"
  }) {
    const { name, gateway } = params
    setCurrentPaymentMethod(name)
    if (!email) {
      toast({ title: "Email required", description: "Enter your e-mail first." })
      setCurrentPaymentMethod(null)
      return
    }
    if (!saInfo) {
      toast({ title: "Not available", description: "Alternative payment not configured for this item." })
      setCurrentPaymentMethod(null)
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/sa-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{ productId: saInfo.productId, variantId: saInfo.variantId, quantity: qty }],
          email,
          gateway,
        }),
      })
      const json = await res.json()
      if (!json.success || !json.url) {
        throw new Error(json.message || "SellAuth API request failed or URL missing.")
      }
      window.location.href = json.url
    } catch (e: any) {
      toast({ title: "SellAuth error", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
      setCurrentPaymentMethod(null)
    }
  }

  const cardIconsList = [
    { IconComponent: VisaIcon, name: "Visa" },
    { IconComponent: MastercardIcon, name: "Mastercard" },
    { IconComponent: AmexIcon, name: "Amex" },
    { IconComponent: DiscoverIcon, name: "Discover" },
    { IconComponent: ApplePayIcon, name: "Apple Pay" },
    { IconComponent: GooglePayIcon, name: "Google Pay" },
    { IconComponent: MaestroIcon, name: "Maestro" },
  ]

  const altMethods = [
    { name: "PayPal", Icon: PaypalIcon, gateway: "PAYPALFF" as const },
    { name: "Cash App", Icon: CashappIcon, gateway: "CASHAPP" as const },
    { name: "Crypto", Icon: CryptoIcon, gateway: "BTC" as const }, // Main "Crypto" button defaults to BTC
  ]

  const cryptoGateways = [
    { name: "Bitcoin", Icon: BitcoinIcon, gateway: "BTC" as const },
    { name: "Litecoin", Icon: LitecoinIcon, gateway: "LTC" as const },
  ]

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openStatus) => {
        if (!openStatus) {
          setLoading(false)
          setCurrentPaymentMethod(null)
          setShowCryptoPicker(false)
        }
        onClose()
      }}
    >
      <DialogContent className="sm:max-w-lg bg-slate-900/90 backdrop-blur-md border-slate-700 text-slate-100 p-0">
        <div className="p-6">
          <div className="mb-4 space-y-3">
            <div className="flex size-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
              <Store className="h-5 w-5 text-brand" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold">Confirm and Pay</DialogTitle>
              <DialogDescription className="text-sm text-slate-400">
                You’re buying&nbsp;
                <span className="font-semibold text-slate-200">
                  {productName} – {selectedOptionName}
                </span>
                .
              </DialogDescription>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Label htmlFor="quantity-modal" className="text-sm font-medium text-slate-300">
                Qty
              </Label>
              <Input
                id="quantity-modal"
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-20 h-9 bg-slate-800 border-slate-700 text-center placeholder:text-slate-500 focus:ring-brand focus:border-brand"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email&nbsp;<span className="text-xs text-slate-500">(required)</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 bg-slate-800 border-slate-700 placeholder:text-slate-500 focus:ring-brand focus:border-brand"
              />
            </div>

            <Button
              onClick={payWithCard}
              disabled={disabledCard}
              className="w-full h-10 bg-brand hover:bg-brand/90 text-white font-semibold flex items-center justify-center"
            >
              {loading && currentPaymentMethod === "Card" ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <LucideCreditCard className="mr-2 h-4 w-4" />
                  Pay&nbsp;{formattedTotalPrice}
                </>
              )}
            </Button>

            <div className="flex justify-center space-x-2">
              {cardIconsList.map(({ IconComponent, name }) => (
                <IconComponent key={name} className="h-6 text-slate-400" title={name} />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-700" />
              <span className="text-xs text-slate-500 whitespace-nowrap">Or pay with</span>
              <div className="h-px flex-1 bg-slate-700" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {altMethods.map(({ name, Icon, gateway }) => (
                <Button
                  key={name}
                  variant="outline"
                  disabled={disabledAlt || (loading && currentPaymentMethod === name && name !== "Crypto")}
                  onClick={() => {
                    if (name === "Crypto") {
                      // Special handling for the generic "Crypto" button
                      setShowCryptoPicker((v) => !v)
                      // If closing picker and a crypto method was active, clear it
                      if (showCryptoPicker && cryptoGateways.some((cg) => cg.name === currentPaymentMethod)) {
                        setCurrentPaymentMethod(null)
                      }
                      // Note: The generic "Crypto" button itself doesn't initiate payment here.
                      // It just toggles the picker. If you want it to default to BTC,
                      // then add: else if (name === "Crypto") payWithSellAuth({ name, gateway: "BTC" })
                      // However, the current setup implies "Crypto" is just a toggle.
                    } else {
                      payWithSellAuth({ name, gateway })
                    }
                  }}
                  className="h-10 border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-brand flex items-center justify-center gap-2 focus:ring-brand focus:border-brand"
                >
                  {loading && currentPaymentMethod === name && name !== "Crypto" ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      <Icon className="h-5 w-5" />
                      <span>{name}</span>
                    </>
                  )}
                </Button>
              ))}

              {showCryptoPicker &&
                cryptoGateways.map(({ name, Icon, gateway }) => (
                  <Button
                    key={name}
                    variant="secondary"
                    disabled={disabledAlt || (loading && currentPaymentMethod === name)}
                    onClick={() => payWithSellAuth({ name, gateway })}
                    className="col-span-3 h-10 bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200 hover:text-brand flex items-center justify-center gap-2 focus:ring-brand focus:border-brand"
                  >
                    {loading && currentPaymentMethod === name ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Icon className="h-5 w-5" />
                        <span>{name}</span>
                      </>
                    )}
                  </Button>
                ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              All payments redirect to a secure checkout page.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
