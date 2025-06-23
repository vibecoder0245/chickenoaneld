"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Cpu, ChevronRight, Info, CheckCircle, Clock, AlertTriangle, XCircle, MinusCircle, ShieldCheck, VideoIcon, Monitor, Gamepad2, Layers, Settings, ListIcon, Fingerprint, ChevronUp } from 'lucide-react'
import { motion } from "framer-motion" // Import motion
import { Button } from "@/components/ui/button"
import NewHeader from "@/components/new-header"
import BeamsBackground from "@/components/beams-background"
import {
  getProductBySlug,
  categoryMap,
  type Product,
  type PurchaseOption,
  type ProductStatus,
  type RequirementItem,
} from "@/lib/products"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { PaymentModal } from "@/components/payment-modal"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { NewProductPurchaseOptions } from "@/components/new-product-purchase-options"

const ProductStatusIndicator: React.FC<{ status: ProductStatus }> = ({ status }) => {
  let IconComponent
  let text
  let colorClasses

  switch (status) {
    case "online":
      IconComponent = CheckCircle
      text = "Online"
      colorClasses = "bg-green-500/20 text-green-300 border-green-500/30"
      break
    case "updating":
      IconComponent = Clock
      text = "Updating"
      colorClasses = "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      break
    case "maintenance":
      IconComponent = AlertTriangle
      text = "Maintenance"
      colorClasses = "bg-orange-500/20 text-orange-300 border-orange-500/30"
      break
    case "offline":
      IconComponent = XCircle
      text = "Offline"
      colorClasses = "bg-red-500/20 text-red-300 border-red-500/30"
      break
    case "degraded":
      IconComponent = MinusCircle
      text = "Degraded"
      colorClasses = "bg-purple-500/20 text-purple-300 border-purple-500/30"
      break
    default:
      IconComponent = Info
      text = "Unknown"
      colorClasses = "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }
  return (
    <Badge variant="outline" className={cn("text-xs px-2 py-0.5 font-medium flex items-center gap-1", colorClasses)}>
      <IconComponent className="h-3 w-3" />
      {text}
    </Badge>
  )
}

const getDefaultRequirementIcon = (label?: string): React.ComponentType<{ className?: string }> => {
  if (typeof label === "string") {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes("os") || lowerLabel.includes("windows")) return Monitor
    if (lowerLabel.includes("cpu") || lowerLabel.includes("processor")) return Cpu
    if (lowerLabel.includes("anti-cheat") || lowerLabel.includes("ac")) return ShieldCheck
    if (lowerLabel.includes("game mode") || lowerLabel.includes("platform")) return Gamepad2
    if (lowerLabel.includes("controller")) return Gamepad2
    if (lowerLabel.includes("launcher") || lowerLabel.includes("server")) return Layers
    if (lowerLabel.includes("spoofer")) return Fingerprint
    if (lowerLabel.includes("stream-proof") || lowerLabel.includes("stream")) return VideoIcon
  }
  return Settings
}

const sectionAnimationProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, ease: "easeInOut" },
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState<PurchaseOption | null>(null)
  const [quantityForModal, setQuantityForModal] = useState(1)
  const [isVideosModalOpen, setIsVideosModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false)
  const [currentDisplayImage, setCurrentDisplayImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchedProduct = getProductBySlug(params.slug)
    if (fetchedProduct) {
      setProduct(fetchedProduct)
      setCurrentDisplayImage(fetchedProduct.image)
      const initialOption =
        fetchedProduct.purchaseOptions.find((opt) => opt.isPopular) || fetchedProduct.purchaseOptions[0]
      if (initialOption) {
        setSelectedPurchaseOption(initialOption)
      }
    } else {
      notFound()
    }
  }, [params.slug])

  const imageThumbnails = useMemo(() => {
    if (!product) return []
    const allImages = [product.image, ...(product.galleryImages || [])]
    return [...new Set(allImages.filter((img) => img))] as string[]
  }, [product])

  const handleInitiateCheckout = (option: PurchaseOption, quantity: number) => {
    if (!product) return

    if (!option.shopifyVariantId && (!option.saInfo?.productId || !option.saInfo?.variantId)) {
      alert("This product option is not currently available for purchase. Please contact support.")
      return
    }

    setSelectedPurchaseOption(option)
    setQuantityForModal(quantity)
    setIsPaymentModalOpen(true)
  }

  const handleOptionSelectionForPage = (option: PurchaseOption | null) => {
    setSelectedPurchaseOption(option)
  }

  if (!product) {
    return (
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <BeamsBackground intensity="low" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <NewHeader />
          <main className="flex-grow pt-20 md:pt-24 pb-16 flex items-center justify-center">
            <p>Loading product...</p>
          </main>
        </div>
      </div>
    )
  }

  const hasVideos = product.videos && product.videos.length > 0
  const hasDetailedFeatures = product.detailedFeatureList && product.detailedFeatureList.length > 0

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BeamsBackground intensity="low" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <NewHeader />
        {/* The main animate-in is for initial page load, framer-motion for scroll */}
        <main className="flex-grow pt-12 md:pt-16 pb-16 animate-in fade-in-0 duration-500">
          <div className="container mx-auto px-4">
            <nav className="flex items-center text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 mx-1" />
              <Link href={`/catalog/${product.category}`} className="hover:text-brand capitalize">
                {categoryMap[product.category]}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 mx-1" />
              <span className="text-slate-300 font-medium">{product.displayName}</span>
            </nav>

            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">{product.name}</h1>
              <ProductStatusIndicator status={product.stockStatus} />
            </div>

            <motion.div
              {...sectionAnimationProps}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-start"
            >
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="w-full max-w-lg aspect-[4/3] rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden bg-slate-800/40 backdrop-blur-md mb-3">
                  {currentDisplayImage && (
                    <Image
                      src={currentDisplayImage || "/placeholder.svg?height=768&width=1024"}
                      alt={product.name + " display image"}
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover"
                      priority
                    />
                  )}
                </div>
                {imageThumbnails.length > 1 && (
                  <div className="w-full max-w-lg overflow-x-auto flex space-x-2 p-1 mb-3">
                    {imageThumbnails.map((thumbSrc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentDisplayImage(thumbSrc)}
                        className={cn(
                          "flex-shrink-0 w-[72px] h-[54px] rounded-md overflow-hidden border-2 transition-all duration-200 hover:opacity-90",
                          currentDisplayImage === thumbSrc
                            ? "border-brand shadow-md"
                            : "border-slate-600 hover:border-slate-400",
                        )}
                      >
                        <Image
                          src={thumbSrc || "/placeholder.svg?height=54&width=72"}
                          alt={`Thumbnail ${idx + 1}`}
                          width={72}
                          height={54}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                {hasVideos && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full max-w-lg h-9 text-sm"
                    onClick={() => setIsVideosModalOpen(true)}
                  >
                    <VideoIcon className="mr-2" /> View Showcase
                  </Button>
                )}
              </div>

              <div className="lg:col-span-1 flex flex-col gap-4">
                <NewProductPurchaseOptions
                  product={{
                    id: product.id,
                    name: product.name,
                    displayName: product.displayName,
                    image: product.image,
                    stockStatus: product.stockStatus,
                  }}
                  options={product.purchaseOptions}
                  defaultSelectedId={selectedPurchaseOption?.id}
                  onOptionSelect={handleOptionSelectionForPage}
                  onBuyNow={handleInitiateCheckout}
                  productStockStatus={product.stockStatus}
                />
                {product.stockStatus !== "online" && (
                  <Button size="lg" className="w-full h-12" disabled>
                    Currently {product.stockStatus}
                  </Button>
                )}
              </div>
            </motion.div>

            <Dialog open={isVideosModalOpen} onOpenChange={setIsVideosModalOpen}>
              <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-slate-100">Product Showcase</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto p-6">
                  {hasVideos && (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {product.videos!.map((videoUrl, idx) => (
                          <CarouselItem key={idx} className="p-1">
                            <div className="aspect-video rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                              <iframe
                                src={videoUrl}
                                title={`${product.name} showcase video ${idx + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              ></iframe>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {product.videos!.length > 1 && (
                        <>
                          <CarouselPrevious className="ml-12 bg-slate-700/50 border-slate-600 hover:bg-slate-600/70 hover:border-brand text-slate-300 hover:text-brand" />
                          <CarouselNext className="mr-12 bg-slate-700/50 border-slate-600 hover:bg-slate-600/70 hover:border-brand text-slate-300 hover:text-brand" />
                        </>
                      )}
                    </Carousel>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {product && selectedPurchaseOption && (
              <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                productName={product.displayName}
                selectedOptionName={selectedPurchaseOption.name}
                selectedOptionPrice={selectedPurchaseOption.displayPrice}
                initialQuantity={quantityForModal}
                shopifyVariantId={selectedPurchaseOption.shopifyVariantId}
                saInfo={selectedPurchaseOption.saInfo}
              />
            )}

            <motion.section
              {...sectionAnimationProps}
              className="mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">Features</h2>
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-brand mb-4">Key Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      {feature.icon ? (
                        <feature.icon className="h-5 w-5 text-brand mt-1 shrink-0" />
                      ) : (
                        <ShieldCheck className="h-5 w-5 text-brand mt-1 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-medium text-slate-200 text-base">{feature.name}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {product.features.length === 0 && <p className="text-slate-400">Detailed features coming soon.</p>}

                {hasDetailedFeatures && (
                  <div className="border-t border-slate-700/60 mt-6 pt-6">
                    <Collapsible open={isFeaturesExpanded} onOpenChange={setIsFeaturesExpanded}>
                      <div className="text-center">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-brand text-brand hover:bg-brand/10 hover:text-brand-light"
                          >
                            {isFeaturesExpanded ? (
                              <>
                                <ChevronUp className="mr-2 h-4 w-4" /> Hide All Features
                              </>
                            ) : (
                              <>
                                <ListIcon className="mr-2 h-4 w-4" /> View All Features
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>

                      <CollapsibleContent className="space-y-8 mt-6 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                        {product.detailedFeatureList?.map((category, catIdx) => (
                          <div key={catIdx}>
                            <h4 className="text-lg font-semibold text-brand mb-3">{category.categoryName}</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                              {category.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="text-slate-300 text-sm flex items-start">
                                  <CheckCircle className="h-4 w-4 text-brand/80 mr-2.5 mt-0.5 shrink-0" />
                                  <span>{item.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}
              </div>
            </motion.section>

            <motion.section
              {...sectionAnimationProps}
              className="mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {(product.requirements as Array<RequirementItem | string>).map((req, index) => {
                  let reqLabel: string | undefined
                  let reqValue: string | undefined
                  let ReqIconComponent: React.ComponentType<{ className?: string }> = Settings
                  let reqId = `req-${index}`

                  if (typeof req === "string") {
                    reqLabel = "Detail"
                    reqValue = req
                    ReqIconComponent = getDefaultRequirementIcon(reqLabel)
                  } else if (typeof req === "object" && req !== null && "value" in req) {
                    const item = req as RequirementItem
                    reqLabel = item.label
                    reqValue = item.value
                    ReqIconComponent = item.icon || getDefaultRequirementIcon(item.label)
                    reqId = item.id || `req-${index}`
                  } else {
                    return null
                  }

                  return (
                    <div
                      key={reqId}
                      className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-start text-left"
                    >
                      <div className="flex items-center text-brand mb-2">
                        <ReqIconComponent className="h-6 w-6 mr-3 shrink-0" />
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                          {reqLabel || "Requirement"}
                        </h4>
                      </div>
                      <p className="text-base font-medium text-slate-100">{reqValue || "Not specified"}</p>
                    </div>
                  )
                })}
                {(product.requirements as Array<RequirementItem | string>).length === 0 && (
                  <p className="text-slate-400 sm:col-span-2 lg:col-span-3">System requirements coming soon.</p>
                )}
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  )
}
