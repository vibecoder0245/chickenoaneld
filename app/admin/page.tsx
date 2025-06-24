// app/admin/page.tsx
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { SideNavClient } from "@/components/admin/side-nav-client"
import QuickActionsWrapper from "@/components/admin/QuickActionsWrapper"
import { RecentActivityServer } from "@/components/admin/recent-activity-server"
import StockTable from "@/components/admin/stock-table"
import { Toaster } from "@/components/ui/sonner"

/* ─────────────────────────────────────────────────────────── */
/* 1.   helpers                                               */
/* ─────────────────────────────────────────────────────────── */

async function getCurrentUser() {
  /* Runs on the server – no sensitive data leaks to the client */
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  /* enrich from DB – role lives on User table */
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, role: true },
  })

  return dbUser
}

async function getRecentAuditLogs() {
  return prisma.auditLog.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } } },
  })
}

/* ─────────────────────────────────────────────────────────── */
/* 2.   page component                                        */
/* ─────────────────────────────────────────────────────────── */

export default async function AdminDashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/admin/login?callbackUrl=/admin")

  const recentActivity = await getRecentAuditLogs()

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[14rem_1fr_18rem] xl:grid-cols-[16rem_1fr_20rem]">
        {/* Left – nav */}
        <aside className="w-full lg:w-56">
          <div className="sticky top-20 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
            <SideNavClient userRole={user.role as any} />
          </div>
        </aside>

        {/* Centre – widgets */}
        <main className="flex-1 space-y-6">
          <QuickActionsWrapper />
          <RecentActivityServer activityLogs={recentActivity} />
        </main>

        {/* Right – live stock */}
        <aside className="w-full lg:w-72">
          <div className="sticky top-20 space-y-4">
            <StockTable />
          </div>
        </aside>
      </div>

      {/* toast portal */}
      <Toaster richColors />
    </div>
  )
}
