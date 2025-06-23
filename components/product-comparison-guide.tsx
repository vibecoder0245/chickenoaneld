import Link from "next/link"
import { CheckCircle, XCircle, HelpCircle, Package, Zap, TrendingUp } from "lucide-react"
import type { ComparisonDetail } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductComparisonGuideProps {
  title: string
  details: ComparisonDetail[]
  categoryName: string
}

const getStockIcon = (status: ComparisonDetail["stockStatus"]) => {
  switch (status) {
    case "in-stock":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "low-stock":
      return <TrendingUp className="h-5 w-5 text-yellow-500" />
    case "out-of-stock":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <HelpCircle className="h-5 w-5 text-gray-500" />
  }
}

const getStockText = (status: ComparisonDetail["stockStatus"]) => {
  switch (status) {
    case "in-stock":
      return "In Stock"
    case "low-stock":
      return "Low Stock"
    case "out-of-stock":
      return "Out of Stock"
    default:
      return "Unknown"
  }
}

export function ProductComparisonGuide({ title, details, categoryName }: ProductComparisonGuideProps) {
  if (!details || details.length === 0) {
    return null
  }

  return (
    <section className="my-12 md:my-16 bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-slate-700/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
        {title || `${categoryName} Editions: What's the Difference?`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {details.map((edition) => (
          <div
            key={edition.editionName}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-300 mb-1">{edition.editionName}</h3>
            <p className="text-3xl font-bold text-slate-100 mb-4">{edition.price}</p>

            <div className="mb-4">
              <p className="text-sm font-medium text-slate-400 mb-1">Key Features:</p>
              <ul className="space-y-1">
                {edition.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <Zap className="h-4 w-4 mr-2 mt-1 shrink-0 text-cyan-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-slate-400 mb-1">Best For:</p>
              <p className="text-slate-300 flex items-start">
                <Package className="h-4 w-4 mr-2 mt-1 shrink-0 text-purple-400" />
                <span>{edition.bestFor}</span>
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-400">Availability:</span>
                <Badge
                  variant={
                    edition.stockStatus === "in-stock"
                      ? "default"
                      : edition.stockStatus === "low-stock"
                        ? "secondary"
                        : "destructive"
                  }
                  className="flex items-center gap-1.5"
                >
                  {getStockIcon(edition.stockStatus)}
                  {getStockText(edition.stockStatus)}
                </Badge>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
                disabled={edition.stockStatus === "out-of-stock"}
              >
                <Link href={`/products/${edition.productId}`}>
                  View {edition.editionName.replace(/\[.*?\]\s*/, "")} {/* Removes [FN] etc. */}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
