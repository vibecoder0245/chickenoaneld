import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { timeAgo } from "@/utils/time-ago" // Ensure this path is correct

// Define a more specific type for AuditLogEntry if you have one from Prisma
interface AuditLogEntry {
  id: string
  user: { email: string } | null // Assuming user relation or denormalized email
  action: string
  createdAt: Date
  // Add other fields from your AuditLog model as needed
}

interface RecentActivityServerProps {
  activityLogs: AuditLogEntry[]
}

export function RecentActivityServer({ activityLogs }: RecentActivityServerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activityLogs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <ul className="space-y-3">
            {activityLogs.map((log) => (
              <li key={log.id} className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{log.user?.email || "System"}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(log.createdAt)}</span>
                </div>
                <p className="text-muted-foreground">{log.action}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
