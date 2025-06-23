import { NextResponse } from "next/server"
// import { prisma } from '@/lib/prisma'; // Assuming you have prisma instance
// import { getShopifyProductCount, getSellAuthProductCount } from '@/lib/platform-helpers'; // Assuming these helpers exist

export const runtime = "edge"

interface ProductMapEntry {
  id: string
  productName: string
  platform: string // e.g., 'SHOPIFY', 'SELLAUTH'
  platformId: string
  criticalThreshold: number
  warningThreshold: number
}

interface StockItem {
  name: string
  count: number
  crit: number
  warn: number
}

// Mocked Prisma and helpers for demonstration
const mockPrisma = {
  productMap: {
    findMany: async (): Promise<ProductMapEntry[]> => [
      {
        id: "1",
        productName: "Valo-Boost",
        platform: "SELLAUTH",
        platformId: "vb-01",
        criticalThreshold: 10,
        warningThreshold: 50,
      },
      {
        id: "2",
        productName: "CS2-Prime",
        platform: "SHOPIFY",
        platformId: "cs2p-02",
        criticalThreshold: 5,
        warningThreshold: 20,
      },
      {
        id: "3",
        productName: "Apex Legends Coins",
        platform: "SELLAUTH",
        platformId: "apx-03",
        criticalThreshold: 20,
        warningThreshold: 100,
      },
    ],
  },
}

const getPlatformProductCount = async (platform: string, platformId: string): Promise<number> => {
  // Mock implementation
  if (platform === "SELLAUTH") return Math.floor(Math.random() * 100)
  if (platform === "SHOPIFY") return Math.floor(Math.random() * 50)
  return 0
}

export async function GET() {
  try {
    // const products = await prisma.productMap.findMany(); // Real implementation
    const products = await mockPrisma.productMap.findMany() // Mocked

    const stockLevels: StockItem[] = await Promise.all(
      products.map(async (product) => {
        // const count = await getPlatformProductCount(product.platform, product.platformId); // Real implementation
        const count = await getPlatformProductCount(product.platform, product.platformId) // Mocked
        return {
          name: product.productName,
          count: count,
          crit: product.criticalThreshold,
          warn: product.warningThreshold,
        }
      }),
    )

    return NextResponse.json(stockLevels)
  } catch (error) {
    console.error("Error fetching stock levels:", error)
    return NextResponse.json({ error: "Failed to fetch stock levels" }, { status: 500 })
  }
}
