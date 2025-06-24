// app/admin/audit-log/page.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Audit Log · Admin",
  description: "View recent administrative activity",
}

export default function AuditLogPage() {
  return (
    <section className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Audit Log</h1>

      <p className="text-muted-foreground">
        This page will show a chronological list of actions (stock changes,
        user edits, settings updates, etc.).
      </p>

      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm">📜 TODO: audit log table / timeline.</p>
      </div>
    </section>
  )
}
