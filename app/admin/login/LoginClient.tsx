/* ─────────────────────────────── app/admin/login/LoginClient.tsx ───────── */
'use client'

import { useState } from 'react'
import { signIn }   from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'

export default function LoginClient() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn('credentials', {
      redirect   : false,
      email,
      password,
      callbackUrl: '/admin',
    })

    setLoading(false)

    if (res?.error) setError('Invalid email or password')
    if (res?.ok)    router.replace(res.url ?? '/admin')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-lg border p-6 shadow"
    >
      <h1 className="text-center text-2xl font-semibold">Admin Login</h1>

      <div className="space-y-2">
        <label className="text-sm">Email</label>
        <Input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm">Password</label>
        <Input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="rounded bg-red-950/40 p-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
