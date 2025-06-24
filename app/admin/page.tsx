// app/admin/page.tsx
import { SideNavClient } from "@/components/admin/side-nav-client"
import QuickActionsWrapper from "@/components/admin/QuickActionsWrapper"
import { RecentActivityServer } from "@/components/admin/recent-activity-server"
import StockTable from "@/components/admin/stock-table"
import { Toaster } from "@/components/ui/sonner"

// ────────────────────────────────────────
// MOCKS – replace with real auth / prisma
// ────────────────────────────────────────
type UserRole = "STAFF" | "ADMIN" | "SUPER_ADMIN" | "OWNER"
interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
}

const mockGetCurrentUser = async (): Promise<AuthenticatedUser | null> => ({
  id: "admin-user",
  email: "admin@example.com",
  role: "OWNER",
})

interface AuditLogEntry {
  id: string
  user: { email: string } | null
  action: string
  createdAt: Date
}

const mockPrisma = {
  auditLog: {
    findMany: async (): Promise<AuditLogEntry[]> => [
      {
        id: "log1",
        user: { email: "staff@example.com" },
        action: 'Product "Valo-Boost" restocked: 50 keys added.',
        createdAt: new Date(Date.now() - 3_600_000),
      },
      {
        id: "log2",
        user: { email: "admin@example.com" },
        action: 'User "new_user@example.com" created.',
        createdAt: new Date(Date.now() - 2 * 3_600_000),
      },
      {
        id: "log3",
        user: { email: "owner@example.com" },
        action: "Settings updated: Payment gateway changed.",
        createdAt: new Date(Date.now() - 1.5 * 86_400_000),
      },
    ],
  },
}

// ────────────────────────────────────────
// PAGE
// ────────────────────────────────────────
export default async function AdminDashboardPage() {
  // ⬇ swap mocks for real helpers when wired up
  const currentUser = await mockGetCurrentUser()
  if (!currentUser) return <p>Access denied. Please log in.</p>

  const recentActivity = await mockPrisma.auditLog.findMany()

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[14rem_1fr_18rem] xl:grid-cols-[16rem_1fr_20rem]">
        {/* ───────── Left – nav ───────── */}
        <aside className="w-full lg:w-56">
          <div className="sticky top-20 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
            <SideNavClient userRole={currentUser.role} />
          </div>
        </aside>

        {/* ───────── Center – widgets ───────── */}
        <main className="flex-1 space-y-6">
          <QuickActionsWrapper />
          <RecentActivityServer activityLogs={recentActivity} />
        </main>

        {/* ───────── Right – live stock ───────── */}
        <aside className="w-full lg:w-72">
          <div className="sticky top-20 space-y-4">
            <StockTable />
          </div>
        </aside>
      </div>

      {/* global toast portal */}
      <Toaster richColors />
    </div>
  )
}
