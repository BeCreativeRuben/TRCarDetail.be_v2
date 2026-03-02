/**
 * Persist bookings in Vercel KV (Redis) so we can send review-request emails
 * after the appointment date. If KV is not configured, all functions no-op.
 */

import type { BookingPayload } from './email'

const BOOKING_IDS_KEY = 'trcardetail:booking:ids'

export type StoredBooking = BookingPayload & {
  id: string
  createdAt: number
  reviewRequestSent: boolean
}

async function getKv(): Promise<{ lpush: (k: string, v: string) => Promise<number>; set: (k: string, v: string) => Promise<string>; get: (k: string) => Promise<unknown>; lrange: (k: string, s: number, e: number) => Promise<string[]> } | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  try {
    const { kv } = await import('@vercel/kv')
    return kv
  } catch {
    return null
  }
}

export async function saveBooking(payload: BookingPayload): Promise<string | null> {
  const store = await getKv()
  if (!store) return null
  try {
    const id = crypto.randomUUID()
    const record: StoredBooking = {
      ...payload,
      id,
      createdAt: Date.now(),
      reviewRequestSent: false,
    }
    await store.lpush(BOOKING_IDS_KEY, id)
    await store.set(`trcardetail:booking:${id}`, JSON.stringify(record))
    return id
  } catch (e) {
    console.error('Failed to save booking to KV:', e)
    return null
  }
}

export async function getBookingsForReviewRequest(): Promise<StoredBooking[]> {
  const store = await getKv()
  if (!store) return []
  try {
    const ids = await store.lrange(BOOKING_IDS_KEY, 0, -1)
    if (!ids?.length) return []
    const today = new Date().toISOString().slice(0, 10)
    const result: StoredBooking[] = []
    for (const id of ids) {
      const raw = await store.get(`trcardetail:booking:${id}`)
      if (raw == null) continue
      const booking = typeof raw === 'string' ? JSON.parse(raw) : (raw as StoredBooking)
      if (booking.reviewRequestSent) continue
      const dateStr = booking.preferredDate
      if (!dateStr || dateStr >= today) continue
      result.push(booking)
    }
    return result
  } catch (e) {
    console.error('Failed to get bookings from KV:', e)
    return []
  }
}

export async function markReviewRequestSent(id: string): Promise<void> {
  const store = await getKv()
  if (!store) return
  try {
    const raw = await store.get(`trcardetail:booking:${id}`)
    if (!raw) return
    const booking = typeof raw === 'string' ? JSON.parse(raw) : (raw as StoredBooking)
    booking.reviewRequestSent = true
    await store.set(`trcardetail:booking:${id}`, JSON.stringify(booking))
  } catch (e) {
    console.error('Failed to mark review sent:', e)
  }
}
