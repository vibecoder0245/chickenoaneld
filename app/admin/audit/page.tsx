/* app/admin/audit/page.tsx
   Displays the 50 most-recent AuditLog rows. */

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic"; // no cache – always fresh

export default async function AuditLogPage() {
  /* ───────── Auth guard ───────── */
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/audit");

  /* ───────── Fetch logs ───────── */
  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } } },
  });

  /* ───────── UI ───────── */
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Audit Log</h1>

      {logs.length === 0 ? (
        <p className="text-muted-foreground">No activity yet.</p>
      ) : (
        <ul className="divide-y border rounded-lg">
          {logs.map((log) => (
            <li key={log.id} className="p-4 flex flex-col gap-1">
              <span>{log.action}</span>
              <span className="text-xs text-muted-foreground">
                {log.user?.email ?? "system"} •{" "}
                {log.createdAt.toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
