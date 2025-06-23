// app/api/sa-checkout/route.ts
import { type NextRequest, NextResponse } from "next/server"

// These are resolved at build time or when the server starts.
// If they are missing, the application will fail to start or this route won't load,
// which is a good way to catch configuration errors early.
const SHOP_ID = process.env.SELLAUTH_SHOP_ID || process.env.NEXT_PUBLIC_SA_SHOP_ID
const API_KEY = process.env.SELLAUTH_API_KEY

if (!SHOP_ID) {
  console.error("CRITICAL: Missing SELLAUTH_SHOP_ID or NEXT_PUBLIC_SA_SHOP_ID environment variable.")
  // Depending on the environment, you might want to prevent the app from starting.
  // In Next.js, throwing here might affect build or server startup.
  // For a serverless function, this check runs per invocation if not optimized out.
}
if (!API_KEY) {
  console.error("CRITICAL: Missing SELLAUTH_API_KEY environment variable.")
}

export async function POST(req: NextRequest) {
  if (!SHOP_ID || !API_KEY) {
    // Check again in case the server started despite missing env vars (e.g. in dev)
    return NextResponse.json(
      { success: false, message: "SellAuth environment variables are not properly configured on the server." },
      { status: 500 },
    )
  }

  try {
    const { cart, email, gateway = "PAYPALFF" } = await req.json()

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty" }, { status: 400 })
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is missing or invalid" }, { status: 400 })
    }

    const saRes = await fetch(`https://api.sellauth.com/v1/shops/${SHOP_ID}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`, // API_KEY should be just the token, not "Bearer <token>"
      },
      body: JSON.stringify({ cart, email, gateway }),
    })

    const data = await saRes.json()

    if (!data.success) {
      console.error("SellAuth API Error:", data)
      return NextResponse.json(
        { success: false, message: data?.message || "SellAuth API error", details: data },
        { status: saRes.status === 200 ? 502 : saRes.status }, // If SA returns 200 but success:false, use 502. Otherwise, proxy status.
      )
    }

    // Prefer the hosted-invoice url (has gateway pre-selected), fall back to raw payment url
    const checkoutUrl = data.invoice_url ?? data.url
    if (!checkoutUrl) {
      console.error("SellAuth API Error: No invoice_url or url returned.", data)
      return NextResponse.json(
        { success: false, message: "SellAuth did not return a checkout URL.", details: data },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, url: checkoutUrl })
  } catch (e: any) {
    console.error("Error in /api/sa-checkout:", e)
    return NextResponse.json({ success: false, message: e.message || "An unexpected error occurred." }, { status: 500 })
  }
}
