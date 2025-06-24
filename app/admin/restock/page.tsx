// app/admin/restock/page.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Restock · Admin",
  description: "Add product keys or stock to the store",
}

export default function RestockPage() {
  return (
    <section className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Restock</h1>

      <p className="text-muted-foreground">
        This is a placeholder. Here you’ll build a form or drawer that lets
        admins add keys / inventory to products.
      </p>

      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm">📦 TODO: Restock interface goes here.</p>
      </div>
    </section>
  )
}
