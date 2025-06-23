import type React from "react"
// New component for "What's the difference?"
import type { Product } from "@/lib/products"
import { CheckCircle, XCircle, MinusCircle } from "lucide-react"

interface ProductComparisonProps {
  productsToCompare: Product[]
  groupTitle: string
}

const FeatureItem: React.FC<{ text: string; type: "unique" | "shared" | "not-present" }> = ({ text, type }) => {
  let IconComponent
  let iconColorClass

  switch (type) {
    case "unique":
      IconComponent = CheckCircle
      iconColorClass = "text-green-500"
      break
    case "shared":
      IconComponent = CheckCircle
      iconColorClass = "text-blue-500"
      break
    case "not-present":
      IconComponent = XCircle
      iconColorClass = "text-red-500"
      break
    default:
      IconComponent = MinusCircle
      iconColorClass = "text-gray-500"
  }

  return (
    <li className="flex items-start space-x-2 py-1">
      <IconComponent className={`h-5 w-5 mt-0.5 shrink-0 ${iconColorClass}`} />
      <span className="text-foreground/80">{text}</span>
    </li>
  )
}

export default function ProductComparison({ productsToCompare, groupTitle }: ProductComparisonProps) {
  if (productsToCompare.length < 2) {
    // Attempt to find a base product if only one is provided for comparison (e.g. the base product itself)
    const singleProduct = productsToCompare[0]
    if (singleProduct && singleProduct.comparisonFeatures?.uniqueToThis) {
      return (
        <div className="mt-12 p-6 rounded-lg border border-border/50 bg-background/30 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
            {singleProduct.name} - Key Features
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-4 rounded-md bg-foreground/5">
              <h3 className="text-xl font-medium mb-3 text-foreground">{singleProduct.name}</h3>
              <ul className="space-y-1">
                {singleProduct.comparisonFeatures.uniqueToThis.map((feature, i) => (
                  <FeatureItem key={`${singleProduct.id}-unique-${i}`} text={feature} type="unique" />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return null // Not enough products to compare or no comparison features defined
  }

  const baseProduct =
    productsToCompare.find((p) =>
      productsToCompare.some((other) => other.comparisonFeatures?.baseProductName === p.name),
    ) || productsToCompare[0]
  const otherProducts = productsToCompare.filter((p) => p.id !== baseProduct.id)

  return (
    <div className="mt-12 p-6 rounded-lg border border-border/50 bg-background/30 backdrop-blur-md shadow-xl">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
        {groupTitle}: What&apos;s the Difference?
      </h2>
      <div className={`grid grid-cols-1 md:grid-cols-${productsToCompare.length} gap-6`}>
        {productsToCompare.map((product) => (
          <div key={product.id} className="p-4 rounded-md bg-foreground/5 border border-foreground/10">
            <h3 className="text-xl font-medium mb-4 text-foreground text-center">{product.name}</h3>
            <ul className="space-y-1">
              {product.comparisonFeatures?.sharedWithBase?.map((feature, i) => (
                <FeatureItem key={`${product.id}-shared-${i}`} text={feature} type="shared" />
              ))}
              {product.comparisonFeatures?.uniqueToThis.map((feature, i) => (
                <FeatureItem key={`${product.id}-unique-${i}`} text={feature} type="unique" />
              ))}
              {/* Optionally, show features present in base but not here */}
              {baseProduct &&
                product.id !== baseProduct.id &&
                baseProduct.comparisonFeatures?.uniqueToThis.map((baseFeature, i) => {
                  const isPresentInCurrent =
                    product.comparisonFeatures?.uniqueToThis.includes(baseFeature) ||
                    product.comparisonFeatures?.sharedWithBase?.includes(baseFeature)
                  if (!isPresentInCurrent) {
                    return <FeatureItem key={`${product.id}-missing-${i}`} text={baseFeature} type="not-present" />
                  }
                  return null
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
