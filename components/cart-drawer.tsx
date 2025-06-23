"use client"

import * as React from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Trash2, Loader2, CreditCard, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart"
import { ScrollArea } from "./ui/scroll-area"
import { useToast } from "./ui/use-toast"

import { AmexIcon } from "./icons/payment/amex-icon"
import { DiscoverIcon } from "./icons/payment/discover-icon"
import { MaestroIcon } from "./icons/payment/maestro-icon"
import { MastercardIcon } from "./icons/payment/mastercard-icon"
import { VisaIcon } from "./icons/payment/visa-icon"
import { ApplePayIcon } from "./icons/payment/apple-pay-icon"
import { GooglePayIcon } from "./icons/payment/google-pay-icon"
import { PaypalIcon } from "./icons/payment/paypal-icon"
import { CashappIcon } from "./icons/payment/cashapp-icon"
import { CryptoIcon } from "./icons/payment/crypto-icon"
import { BitcoinIcon } from "./icons/payment/bitcoin-icon"
import { LitecoinIcon } from "./icons/payment/litecoin-icon"

export default function CartDrawer() {
  const { toast } = useToast()

  const lines = useCart((s) => s.lines)
  const totalItems = useCart((s) => s.totalItems)
  const cartTotalPrice = useCart((s) => s.totalPrice) // This is already formatted string from store
  const inc = useCart((s) => s.inc)
  const dec = useCart((s) => s.dec)
  const remove = useCart((s) => s.remove)
  const createShopifyCart = useCart((s) => s.createShopifyCart)
  const createSellAuthCheckout = useCart((s) => s.createSellAuthCheckout)
  const open = useCart((s) => s.isCartOpen)
  const setOpen = useCart((s) => s.setIsCartOpen)

  const [email, setEmail] = React.useState("")
  const [isProcessingPayment, setIsProcessingPayment] = React.useState<boolean>(false)
  const [activeButtonLabel, setActiveButtonLabel] = React.useState<string | null>(null) // Stores 'name' of method
  const [showCryptoPicker, setShowCryptoPicker] = React.useState(false)

  // cartTotalPrice from store is already formatted
  // const formattedTotalPrice = React.useMemo(() => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   }).format(cartTotalPrice)
  // }, [cartTotalPrice])

  async function handleShopifyCheckout() {
    if (!email || lines.length === 0) {
      toast({ title: "Email is required.", description: "Please enter your email to proceed.", variant: "destructive" })
      return
    }
    setIsProcessingPayment(true)
    setActiveButtonLabel("Card") // Generic label for card payment
    try {
      const url = await createShopifyCart(lines, email)
      window.location.href = url
    } catch (e: any) {
      toast({ title: "Checkout Error", description: e.message, variant: "destructive" })
    } finally {
      // Redirect happens, so this might not run if successful
      setIsProcessingPayment(false)
      setActiveButtonLabel(null)
    }
  }

  async function payWithSellAuthInCart(params: {
    name: string // For UI feedback
    gateway: "PAYPALFF" | "CASHAPP" | "BTC" | "LTC"
  }) {
    const { name, gateway } = params
    if (!email || lines.length === 0) {
      toast({ title: "Email is required.", description: "Please enter your email to proceed.", variant: "destructive" })
      return
    }
    setIsProcessingPayment(true)
    setActiveButtonLabel(name)
    try {
      await createSellAuthCheckout(lines, email, gateway)
      // Redirect is handled by createSellAuthCheckout
    } catch (e: any) {
      toast({ title: "Checkout Error", description: e.message, variant: "destructive" })
    } finally {
      // Redirect happens, so this might not run if successful
      setIsProcessingPayment(false)
      setActiveButtonLabel(null)
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

  const commonButtonDisabled = isProcessingPayment || !email || lines.length === 0

  React.useEffect(() => {
    if (!open) {
      setShowCryptoPicker(false)
      setActiveButtonLabel(null)
      setIsProcessingPayment(false)
    }
  }, [open])

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          setShowCryptoPicker(false)
          setActiveButtonLabel(null)
          setIsProcessingPayment(false)
        }
      }}
    >
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col bg-[#0f192f] border-slate-700 text-slate-100 p-0">
        <SheetHeader className="px-6 py-4 border-b border-slate-700">
          <SheetTitle className="flex items-center justify-between text-slate-100">
            Shopping Cart
            {totalItems > 0 && (
              <span className="ml-2 rounded-md bg-brand/20 text-brand px-2 py-0.5 text-xs font-medium">
                {totalItems} Item{totalItems === 1 ? "" : "s"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {lines.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center pt-16">
                <ShoppingCart className="h-16 w-16 text-slate-600 mb-4" />
                <p className="text-slate-400 text-center">Your cart is empty.</p>
                <Button
                  variant="outline"
                  className="mt-6 border-slate-600 hover:border-brand hover:text-brand"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            )}

            {lines.map((l) => (
              <div
                key={l.id}
                className="flex items-start gap-4 border-b border-slate-800 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="relative h-20 w-20 rounded-md overflow-hidden border border-slate-700 bg-slate-800">
                  <Image
                    src={l.image || "/placeholder.svg?width=80&height=80&query=product"}
                    alt={l.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-100 text-sm leading-tight">{l.name}</h3>
                  <p className="text-sm font-semibold text-brand">{l.displayPrice}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center border border-slate-700 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-brand"
                      onClick={() => dec(l.id)}
                      disabled={isProcessingPayment}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-7 text-center text-sm font-medium text-slate-200">{l.qty}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-brand"
                      onClick={() => inc(l.id)}
                      disabled={isProcessingPayment}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-slate-500 hover:text-red-500 h-auto p-1"
                    onClick={() => remove(l.id)}
                    disabled={isProcessingPayment}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {lines.length > 0 && (
          <div className="p-6 border-t border-slate-700 space-y-4 bg-[#0f192f]">
            <div className="space-y-1">
              <Label htmlFor="email-cart" className="text-sm font-medium text-slate-300">
                Email&nbsp;<span className="text-xs text-slate-500">(required for updates & receipt)</span>
              </Label>
              <Input
                id="email-cart"
                type="email"
                value={email}
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 bg-slate-800 border-slate-700 placeholder:text-slate-500 focus:ring-brand focus:border-brand"
                disabled={isProcessingPayment}
              />
            </div>
            <Button
              onClick={handleShopifyCheckout}
              disabled={commonButtonDisabled}
              className="w-full h-10 bg-brand hover:bg-brand/90 text-white font-semibold flex items-center justify-center"
            >
              {isProcessingPayment && activeButtonLabel === "Card" ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay&nbsp;{cartTotalPrice}
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
                  disabled={
                    commonButtonDisabled || (isProcessingPayment && activeButtonLabel === name && name !== "Crypto")
                  }
                  onClick={() => {
                    if (name === "Crypto") {
                      setShowCryptoPicker((v) => !v)
                      if (showCryptoPicker && cryptoGateways.some((cg) => cg.name === activeButtonLabel)) {
                        setActiveButtonLabel(null)
                      }
                    } else {
                      payWithSellAuthInCart({ name, gateway })
                    }
                  }}
                  className="h-10 border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-brand flex items-center justify-center gap-2 focus:ring-brand focus:border-brand"
                >
                  {isProcessingPayment && activeButtonLabel === name && name !== "Crypto" ? (
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
                    disabled={commonButtonDisabled || (isProcessingPayment && activeButtonLabel === name)}
                    onClick={() => payWithSellAuthInCart({ name, gateway })}
                    className="col-span-3 h-10 bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200 hover:text-brand flex items-center justify-center gap-2 focus:ring-brand focus:border-brand"
                  >
                    {isProcessingPayment && activeButtonLabel === name ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        <Icon className="h-5 w-5" />
                        <span>{name}</span>
                      </>
                    )}
                  </Button>
                ))}
            </div>
            <p className="text-xs text-muted-foreground text-center text-slate-400">
              All payments redirect to a secure checkout page.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
