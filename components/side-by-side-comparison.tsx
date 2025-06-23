import Link from "next/link"
import { Zap, Star } from "lucide-react"
import type { ComparisonDetail, ProductStatus } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SideBySideComparisonProps {
  productName: string
  comparisonPair?: [ComparisonDetail, ComparisonDetail]
}

const getStockBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case "online":
      return "default" // Greenish or primary
    case "degraded":
      return "secondary" // Yellowish
    case "maintenance":
      return "outline" // Bluish
    case "updating":
      return "secondary"
    case "offline":
      return "destructive" // Reddish
    default:
      return "outline"
  }
}

export function SideBySideComparison({ productName, comparisonPair }: SideBySideComparisonProps) {
  if (!comparisonPair || comparisonPair.length !== 2) {
    return (
      <div className="my-12 text-center text-slate-400">Comparison details are not available for this product.</div>
    )
  }

  // Determine which detail is for the current product page vs the other
  const currentProductDetail = comparisonPair.find((detail) => detail.isCurrent) || comparisonPair[0]
  const otherProductDetail =
    comparisonPair.find((detail) => detail.productId !== currentProductDetail.productId) || comparisonPair[1]

  const detailsToDisplay = [currentProductDetail, otherProductDetail]

  return (
    <section className="my-12 md:my-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
        {productName.includes(currentProductDetail.editionName.split(" ")[0])
          ? `${currentProductDetail.editionName.split(" ")[0]} Editions: What's the Difference?`
          : `Compare Editions`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {detailsToDisplay.map((detail, index) => (
          <div
            key={detail.productId}
            className={`bg-slate-800/60 border rounded-xl p-6 md:p-8 flex flex-col shadow-xl transition-all duration-300
                        ${detail.isCurrent ? "border-blue-500 shadow-blue-500/30" : "border-slate-700 hover:border-slate-500"}`}
          >
            <h3 className="text-2xl font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">
              {detail.editionName}
            </h3>
            <p className="text-3xl font-bold text-slate-50 mb-4">{detail.price}</p>

            <div className="mb-5">
              <p className="text-sm font-medium text-slate-400 mb-1.5">Key Features:</p>
              <ul className="space-y-1.5">
                {detail.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-slate-300">
                    <Zap className="h-4 w-4 mr-2.5 mt-1 shrink-0 text-cyan-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <p className="text-sm font-medium text-slate-400 mb-1.5">Best For:</p>
              <p className="text-slate-300 flex items-start">
                <Star className="h-4 w-4 mr-2.5 mt-1 shrink-0 text-yellow-400" />
                <span>{detail.bestFor}</span>
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-400">Availability:</span>
                <Badge variant={getStockBadgeVariant(detail.stockStatus)} className="capitalize">
                  {detail.stockStatus}
                </Badge>
              </div>
              {!detail.isCurrent && (
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  disabled={detail.stockStatus === "offline"}
                >
                  <Link href={`/products/${detail.productId}`}>
                    View {detail.editionName.replace(/\[.*?\]\s*/, "")}
                  </Link>
                </Button>
              )}
              {detail.isCurrent && (
                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                  disabled
                >
                  Currently Viewing
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
