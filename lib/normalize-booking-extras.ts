import type { BookingPayload } from '@/lib/email'
import { getExtraById } from '@/lib/extras-catalog'

/** Valideert extra-id’s tegen de catalogus (server-side). */
export function normalizeSelectedExtras(raw: unknown): BookingPayload['selectedExtras'] {
  if (!Array.isArray(raw)) return undefined
  const out: NonNullable<BookingPayload['selectedExtras']> = []
  const seen = new Set<string>()
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const id = typeof (item as { id?: unknown }).id === 'string' ? (item as { id: string }).id : ''
    if (!id || seen.has(id)) continue
    const cat = getExtraById(id)
    if (!cat) continue
    seen.add(id)
    out.push({
      id: cat.id,
      name: cat.name,
      priceExclBtwEuro: cat.priceExclBtwEuro,
      ...(cat.priceNote ? { priceNote: cat.priceNote } : {}),
    })
  }
  return out.length ? out : undefined
}
