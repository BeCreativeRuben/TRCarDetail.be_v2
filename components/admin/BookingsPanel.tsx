'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import type { StoredBooking } from '@/lib/bookings-store'
import { formatServiceType } from '@/lib/service-labels'
import { defaultReviewPersonalMessage } from '@/lib/review-email'

type Filter = 'all' | 'past' | 'upcoming'

type BookingsPanelProps = {
  initialBookings: StoredBooking[]
  kvConfigured: boolean
}

function todayString(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatDateNl(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${d}/${m}/${y}`
}

function formatCreatedAt(ts: number): string {
  return new Date(ts).toLocaleString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function BookingsPanel({ initialBookings, kvConfigured }: BookingsPanelProps) {
  const router = useRouter()
  const [bookings, setBookings] = useState(initialBookings)
  const [filter, setFilter] = useState<Filter>('past')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [personalMessage, setPersonalMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const today = todayString()

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (filter === 'past') return b.preferredDate < today
      if (filter === 'upcoming') return b.preferredDate >= today
      return true
    })
  }, [bookings, filter, today])

  const selectedBooking = bookings.find((b) => b.id === selectedId) ?? null

  const openReviewModal = (booking: StoredBooking) => {
    const serviceLabel = formatServiceType(booking.serviceType)
    setSelectedId(booking.id)
    setPersonalMessage(defaultReviewPersonalMessage(booking.customerName, serviceLabel))
    setFeedback(null)
    setError(null)
  }

  const closeReviewModal = () => {
    setSelectedId(null)
    setPersonalMessage('')
    setError(null)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const handleSendReview = async () => {
    if (!selectedBooking) return
    setSending(true)
    setError(null)
    setFeedback(null)
    try {
      const res = await fetch(`/api/admin/bookings/${selectedBooking.id}/review-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalMessage }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Versturen mislukt.')
        return
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === selectedBooking.id ? { ...b, reviewRequestSent: true } : b))
      )
      setFeedback(`Review-mail verstuurd naar ${selectedBooking.email}.`)
      setTimeout(closeReviewModal, 1200)
    } catch {
      setError('Versturen mislukt. Probeer opnieuw.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary-dark/10 bg-white">
        <div className="container-custom py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-dark">Boekingen</h1>
            <p className="text-sm text-primary-dark/70">Bekijk eerdere klanten en stuur gepersonaliseerde review-mails.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
            Uitloggen
          </Button>
        </div>
      </header>

      <main className="container-custom py-8 space-y-6">
        {!kvConfigured && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Vercel KV is niet geconfigureerd. Boekingen worden wel per e-mail ontvangen, maar verschijnen hier pas na
            opslag in Redis/KV.
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {([
            ['past', 'Geweest'],
            ['upcoming', 'Komend'],
            ['all', 'Alle'],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-accent-red text-white'
                  : 'bg-white border border-primary-dark/15 text-primary-dark hover:border-accent-red'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <div className="rounded-xl border border-primary-dark/10 bg-white p-8 text-center text-primary-dark/70">
            Geen boekingen gevonden voor dit filter.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-primary-dark/10 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-primary-dark/5 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Klant</th>
                  <th className="px-4 py-3 font-semibold">Dienst</th>
                  <th className="px-4 py-3 font-semibold">Afspraak</th>
                  <th className="px-4 py-3 font-semibold">Voertuig</th>
                  <th className="px-4 py-3 font-semibold">Review</th>
                  <th className="px-4 py-3 font-semibold">Actie</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const serviceLabel = formatServiceType(booking.serviceType)
                  const isPast = booking.preferredDate < today
                  return (
                    <tr key={booking.id} className="border-t border-primary-dark/10 align-top">
                      <td className="px-4 py-3">
                        <p className="font-medium text-primary-dark">{booking.customerName}</p>
                        <p className="text-primary-dark/70">{booking.email}</p>
                        <p className="text-primary-dark/70">{booking.phone}</p>
                        {booking.address && <p className="text-primary-dark/60 text-xs mt-1">{booking.address}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{serviceLabel}</p>
                        {booking.selectedExtras?.length ? (
                          <ul className="mt-1 text-xs text-primary-dark/70 list-disc list-inside">
                            {booking.selectedExtras.map((extra) => (
                              <li key={extra.id}>{extra.name}</li>
                            ))}
                          </ul>
                        ) : null}
                        {booking.totalExclBtw != null && (
                          <p className="text-xs text-primary-dark/60 mt-1">Richtprijs: €{booking.totalExclBtw.toFixed(2)}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p>{formatDateNl(booking.preferredDate)}</p>
                        <p className="text-primary-dark/70">{booking.preferredTime}</p>
                        <p className="text-xs text-primary-dark/50 mt-1">Geboekt: {formatCreatedAt(booking.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        {booking.vehicleInfo ? (
                          <>
                            <p>{booking.vehicleInfo.make} {booking.vehicleInfo.model}</p>
                            <p className="text-primary-dark/70 text-xs">{booking.vehicleInfo.year} · {booking.vehicleInfo.size === 'large' ? 'Groot' : 'Standaard'}</p>
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {booking.reviewRequestSent ? (
                          <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                            Verstuurd
                          </span>
                        ) : isPast ? (
                          <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-900">
                            Nog niet
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-primary-dark/10 px-2.5 py-1 text-xs font-medium text-primary-dark/70">
                            Komend
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          type="button"
                          size="sm"
                          variant={booking.reviewRequestSent ? 'outline' : 'primary'}
                          disabled={!isPast}
                          onClick={() => openReviewModal(booking)}
                        >
                          {booking.reviewRequestSent ? 'Opnieuw mailen' : 'Review mailen'}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-primary-dark mb-1">Review-mail sturen</h2>
            <p className="text-sm text-primary-dark/70 mb-4">
              Naar {selectedBooking.customerName} ({selectedBooking.email})
            </p>
            <label htmlFor="personalMessage" className="block text-sm font-medium text-primary-dark mb-2">
              Persoonlijk bericht
            </label>
            <textarea
              id="personalMessage"
              rows={8}
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark/30 text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red"
            />
            <p className="text-xs text-primary-dark/60 mt-2">
              Dit bericht wordt toegevoegd in de review-mail, samen met de standaard intro over de afspraak.
            </p>
            {error && <p className="text-sm text-accent-red mt-3">{error}</p>}
            {feedback && <p className="text-sm text-green-700 mt-3">{feedback}</p>}
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <Button type="button" variant="outline" size="sm" onClick={closeReviewModal} disabled={sending}>
                Annuleren
              </Button>
              <Button type="button" size="sm" onClick={handleSendReview} disabled={sending || !personalMessage.trim()}>
                {sending ? 'Versturen…' : 'Versturen'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
