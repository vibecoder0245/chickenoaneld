import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addKeysToSellAuth } from "@/lib/stockService";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauth" }, { status: 401 });

  const { sku, keys } = await req.json(); // keys is string[]
  if (!sku || !Array.isArray(keys) || keys.length === 0)
    return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const ok = await addKeysToSellAuth(sku, keys);
  if (ok) {
    await prisma.auditLog.create({
      data: {
        action: `Restocked "${sku}" – ${keys.length} keys`,
        userId: session.user.id,
      },
    });
  }

  return NextResponse.json({ success: ok });
}
