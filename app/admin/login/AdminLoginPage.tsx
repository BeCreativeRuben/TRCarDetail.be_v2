'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Inloggen mislukt.')
        return
      }
      const next = searchParams.get('next') || '/admin/bookings'
      router.push(next)
      router.refresh()
    } catch {
      setError('Inloggen mislukt. Probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-primary-dark/10 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Admin</h1>
        <p className="text-sm text-primary-dark/70 mb-6">Log in om boekingen en review-mails te beheren.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary-dark mb-2">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark/30 text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-accent-red">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Bezig…' : 'Inloggen'}
          </Button>
        </form>
      </div>
    </div>
  )
}
