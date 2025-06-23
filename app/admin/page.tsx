// import { prisma } from '@/lib/prisma'; // Assuming you have prisma instance
// import { getCurrentUser, AuthenticatedUser } from '@/lib/auth'; // Assuming auth helpers
import { SideNavClient } from "@/components/admin/side-nav-client"
import { QuickActionsClient } from "@/components/admin/quick-actions-client"
import { RecentActivityServer } from "@/components/admin/recent-activity-server"
import StockTable from "@/components/admin/stock-table"
import { Toaster } from "@/components/ui/sonner" // For toasts from QuickActionsClient

// Mocked Prisma and auth for demonstration
type UserRole = "STAFF" | "ADMIN" | "SUPER_ADMIN" | "OWNER"
interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
}

const mockGetCurrentUser = async (): Promise<AuthenticatedUser | null> => {
  // This should be replaced with your actual auth logic
  return { id: "admin-user", email: "admin@example.com", role: "OWNER" }
}

interface AuditLogEntry {
  id: string
  user: { email: string } | null
  action: string
  createdAt: Date
}

const mockPrisma = {
  auditLog: {
    findMany: async (args: { take: number; orderBy: { createdAt: "desc" }; include?: { user: boolean } }): Promise<
      AuditLogEntry[]
    > => {
      // Mock data
      return [
        {
          id: "log1",
          user: { email: "staff@example.com" },
          action: 'Product "Valo-Boost" restocked: 50 keys added.',
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          id: "log2",
          user: { email: "admin@example.com" },
          action: 'User "new_user@example.com" created.',
          createdAt: new Date(Date.now() - 7200000 * 2),
        },
        {
          id: "log3",
          user: { email: "owner@example.com" },
          action: "Settings updated: Payment gateway changed.",
          createdAt: new Date(Date.now() - 86400000 * 1.5),
        },
        {
          id: "log4",
          user: { email: "staff@example.com" },
          action: 'Product "CS2-Prime" price updated to $19.99.',
          createdAt: new Date(Date.now() - 86400000 * 3),
        },
        {
          id: "log5",
          user: { email: "system" },
          action: "Nightly backup completed successfully.",
          createdAt: new Date(Date.now() - 86400000 * 5),
        },
      ].slice(0, args.take)
    },
  },
}

export default async function AdminDashboardPage() {
  // const currentUser = await getCurrentUser(); // Real implementation
  const currentUser = await mockGetCurrentUser() // Mocked

  if (!currentUser) {
    // This should ideally be handled by middleware, but as a fallback:
    return <p>Access Denied. Please log in.</p>
  }

  // const recentActivity = await prisma.auditLog.findMany({ // Real implementation
  //   take: 5,
  //   orderBy: { createdAt: 'desc' },
  //   include: { user: true } // To get user.email
  // });
  const recentActivity = await mockPrisma.auditLog.findMany({
    // Mocked
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })

  // This function would be passed from a layout component that manages the drawer state
  const handleOpenRestockDrawer = () => {
    console.log("AdminDashboardPage: Request to open restock drawer. Implement state management in layout.")
    // Example: setRestockDrawerOpenState(true);
    alert(
      "Restock drawer would open here. Implement state management in a parent client component (e.g., admin layout).",
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[14rem_1fr_18rem] xl:grid-cols-[16rem_1fr_20rem]">
        {/* Left Column: Navigation */}
        <aside className="w-full lg:w-56">
          <div className="sticky top-20 space-y-4">
            {" "}
            {/* Adjust top-X based on your header height */}
            <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
            <SideNavClient userRole={currentUser.role} />
          </div>
        </aside>

        {/* Center Column: Main Widgets */}
        <main className="flex-1 space-y-6">
          <QuickActionsClient onOpenRestockDrawer={handleOpenRestockDrawer} />
          <RecentActivityServer activityLogs={recentActivity} />
        </main>

        {/* Right Column: Live Stats */}
        <aside className="w-full lg:w-72">
          <div className="sticky top-20 space-y-4">
            {" "}
            {/* Adjust top-X based on your header height */}
            <StockTable />
          </div>
        </aside>
      </div>
      <Toaster richColors />
    </div>
  )
}
