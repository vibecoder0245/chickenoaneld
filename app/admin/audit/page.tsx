/* /admin/audit – shows 50 most-recent logs */
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AuditLog() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/audit");

  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } } },
  });

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Audit Log</h1>

      {logs.length === 0 ? (
        <p className="text-muted-foreground">No activity yet.</p>
      ) : (
        <ul className="border divide-y rounded-lg bg-card">
          {logs.map((l) => (
            <li key={l.id} className="p-4 flex flex-col gap-1">
              <span>{l.action}</span>
              <span className="text-xs text-muted-foreground">
                {l.user?.email ?? "system"} •{" "}
                {l.createdAt.toLocaleString(undefined, {
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
