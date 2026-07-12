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
const BLOCKED_DATE_RANGES: { start: string; end: string; reason: string }[] = [
  {
    start: '2026-07-06',
    end: '2026-07-12',
    reason: 'Deze week (6–12 juli) zijn we volzet. Kies een datum vanaf 13 juli.',
  },
  {
    start: '2026-07-13',
    end: '2026-07-19',
    reason: 'Deze week (13–19 juli) zijn we volzet. Kies een datum vanaf 20 juli.',
  },
]

export function isDateInBlockedRange(year: number, month: number, day: number): boolean {
  const dateStr = formatLocalDateString(year, month, day)
  return BLOCKED_DATE_RANGES.some((range) => dateStr >= range.start && dateStr <= range.end)
}

export function getBlockedRangeReason(preferredDate: string): string | null {
  const match = BLOCKED_DATE_RANGES.find(
    (range) => preferredDate >= range.start && preferredDate <= range.end
  )
  return match?.reason ?? null
}

/** Korte melding voor de kalender wanneer een gesloten periode in de getoonde maand valt. */
export function getBlockedRangeNoticeForMonth(year: number, month: number): string | null {
  const monthStart = formatLocalDateString(year, month, 1)
  const lastDay = new Date(year, month + 1, 0).getDate()
  const monthEnd = formatLocalDateString(year, month, lastDay)
  const today = getTodayLocal()
  const todayStr = formatLocalDateString(today.getFullYear(), today.getMonth(), today.getDate())

  const reasons = BLOCKED_DATE_RANGES.filter(
    (range) => range.start <= monthEnd && range.end >= monthStart && range.end >= todayStr
  ).map((range) => range.reason)

  return reasons.length ? reasons.join(' ') : null
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
