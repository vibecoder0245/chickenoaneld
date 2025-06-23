import { NextResponse } from "next/server"
import { shopify } from "@/lib/shopify" // Use the centralized Shopify client

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, lines } = body as {
      email: string
      lines: Array<{ variantId: string; quantity: number }>
    }

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 })
    }

    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty or lines are invalid." }, { status: 400 })
    }

    // Ensure variantId is just the ID, not the full GID for shopify-buy SDK
    const formattedLines = lines.map((line) => ({
      variantId: line.variantId.startsWith("gid://shopify/ProductVariant/")
        ? line.variantId
        : `gid://shopify/ProductVariant/${line.variantId}`,
      quantity: line.quantity,
    }))

    const checkout = await shopify.checkout.create({
      email: email,
      lineItems: formattedLines,
    })

    if (!checkout || !checkout.webUrl) {
      // This case might indicate an issue with the Shopify SDK or response
      console.error("Shopify checkout creation failed, no webUrl returned:", checkout)
      return NextResponse.json(
        { success: false, message: "Failed to create Shopify checkout session." },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, url: checkout.webUrl })
  } catch (error: any) {
    console.error("Shopify Checkout API Error:", error)
    // Attempt to parse Shopify's error messages if available
    let errorMessage = "An unexpected error occurred during checkout."
    if (error.message) {
      errorMessage = error.message
    }
    if (error.response?.data?.errors) {
      // Example for GraphQL like errors
      errorMessage = JSON.stringify(error.response.data.errors)
    } else if (typeof error === "string") {
      errorMessage = error
    }

    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}
