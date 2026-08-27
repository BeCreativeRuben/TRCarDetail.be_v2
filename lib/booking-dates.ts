/** Vandaag om middernacht in lokale tijdzone */
export function getTodayLocal(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/** YYYY-MM-DD in lokale tijdzone (geen UTC-shift) */
export function formatLocalDateString(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

/** Gesloten periodes (inclusief start- en einddatum). */
const BLOCKED_DATE_RANGES: { start: string; end: string }[] = [
  { start: '2026-07-06', end: '2026-07-12' },
  { start: '2026-07-13', end: '2026-07-19' },
  { start: '2026-09-05', end: '2026-09-13' },
]

/**
 * Periodes met aangepaste openingsuren (open vanaf 09:00 de hele dag).
 * Buiten deze periodes gelden de normale uren.
 */
export const EXTENDED_HOURS_RANGES: { start: string; end: string; opensAt: string }[] = [
  { start: '2026-08-31', end: '2026-09-04', opensAt: '09:00' },
  { start: '2026-09-14', end: '2026-09-20', opensAt: '09:00' },
]

export function getExtendedHoursForDate(preferredDate: string): string | null {
  const match = EXTENDED_HOURS_RANGES.find(
    (range) => preferredDate >= range.start && preferredDate <= range.end
  )
  return match?.opensAt ?? null
}

export function isDateInBlockedRange(year: number, month: number, day: number): boolean {
  const dateStr = formatLocalDateString(year, month, day)
  return BLOCKED_DATE_RANGES.some((range) => dateStr >= range.start && dateStr <= range.end)
}

/** Gesloten periodes met reden (voor gebruikersfeedback). */
const BLOCKED_DATE_REASONS: { start: string; end: string; reason: string }[] = [
  { start: '2026-09-05', end: '2026-09-13', reason: 'Wij zijn gesloten wegens verlof van 5 t/m 13 september. Kies een andere datum.' },
]

export function getBlockedRangeReason(preferredDate: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(preferredDate)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  if (!isDateInBlockedRange(year, month, day)) return null
  const dateStr = formatLocalDateString(year, month, day)
  const specific = BLOCKED_DATE_REASONS.find((r) => dateStr >= r.start && dateStr <= r.end)
  return specific?.reason ?? 'Deze datum is volzet. Kies een andere dag.'
}

/** Alleen datums ná vandaag zijn boekbaar (vandaag zelf uitgesloten). */
export function isDateBookable(year: number, month: number, day: number): boolean {
  if (isDateInBlockedRange(year, month, day)) return false
  const date = new Date(year, month, day)
  date.setHours(0, 0, 0, 0)
  return date > getTodayLocal()
}

export function parsePreferredDateParts(preferredDate: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(preferredDate)
  if (!match) return null
  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3]),
  }
}

/** 0 = zondag, 6 = zaterdag (lokale tijdzone). */
export function getLocalDayOfWeek(year: number, month: number, day: number): number {
  return new Date(year, month, day).getDay()
}

export function isWeekendDateString(preferredDate: string): boolean {
  const parts = parsePreferredDateParts(preferredDate)
  if (!parts) return false
  const dow = getLocalDayOfWeek(parts.year, parts.month, parts.day)
  return dow === 0 || dow === 6
}

/** Valideert preferredDate uit formulier/API (YYYY-MM-DD). */
export function isPreferredDateBookable(preferredDate: string): boolean {
  const parts = parsePreferredDateParts(preferredDate)
  if (!parts) return false
  return isDateBookable(parts.year, parts.month, parts.day)
}
