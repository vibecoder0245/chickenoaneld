/* ─────────────────────────────── app/admin/login/page.tsx ──────────────── */
import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = { title: 'Admin Login · CDN Cheats' }

/**
 * Must be a Server Component so Next can pre-render the page shell,
 * but it should NOT call any client-only hooks.
 */
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <LoginClient />
    </div>
  )
}
