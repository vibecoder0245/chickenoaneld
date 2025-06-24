// app/admin/users/page.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Users · Admin",
  description: "Manage staff and customer accounts",
}

export default function UsersPage() {
  return (
    <section className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">User Management</h1>

      <p className="text-muted-foreground">
        Future feature: list staff / customers, edit roles, reset passwords, &
        invite new users.
      </p>

      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm">👥 TODO: user table & role controls.</p>
      </div>
    </section>
  )
}
