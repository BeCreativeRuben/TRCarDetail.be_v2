import { isWeekendDateString } from '@/lib/booking-dates'

const WEEKDAY_TIME_SLOTS = ['18:00', '19:00', '20:00', '21:00', '22:00'] as const
const WEEKEND_TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
] as const

export function getTimeSlotsForDate(preferredDate: string): string[] {
  if (!preferredDate) return []
  return isWeekendDateString(preferredDate) ? [...WEEKEND_TIME_SLOTS] : [...WEEKDAY_TIME_SLOTS]
}

export function isPreferredTimeValid(preferredDate: string, preferredTime: string): boolean {
  return getTimeSlotsForDate(preferredDate).includes(preferredTime)
}
