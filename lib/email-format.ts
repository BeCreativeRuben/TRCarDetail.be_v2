const dutchLongDate = new Intl.DateTimeFormat('nl-BE', {
  timeZone: 'Europe/Brussels',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/**
 * Kalenderdatum YYYY-MM-DD → "zondag 1 november 2026" (Europe/Brussels, nl-BE).
 * Andere tekst (vrije notities, al uitgeschreven data) blijft ongewijzigd.
 */
export function formatDutchDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return value
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return value
  }
  return dutchLongDate.format(date)
}

/** Zelfde korte labels als het adminpaneel: Standaard / Groot. */
export function formatVehicleSize(size: string): string {
  if (size === 'standard') return 'Standaard'
  if (size === 'large') return 'Groot'
  return size
}
