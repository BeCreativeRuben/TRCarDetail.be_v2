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

/** Alleen datums ná vandaag zijn boekbaar (vandaag zelf uitgesloten). */
export function isDateBookable(year: number, month: number, day: number): boolean {
  const date = new Date(year, month, day)
  date.setHours(0, 0, 0, 0)
  return date > getTodayLocal()
}

/** Valideert preferredDate uit formulier/API (YYYY-MM-DD). */
export function isPreferredDateBookable(preferredDate: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(preferredDate)
  if (!match) return false
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  return isDateBookable(year, month, day)
}
