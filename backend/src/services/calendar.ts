// Calendar service for managing availability
// This can be extended to integrate with external calendar systems

export interface TimeSlot {
  time: string
  available: boolean
}

export function getAvailableTimeSlots(date: string, bookedSlots: string[]): TimeSlot[] {
  const allSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
  ]

  return allSlots.map(time => ({
    time,
    available: !bookedSlots.includes(time)
  }))
}

export function isDateAvailable(date: string): boolean {
  // Check if date is in the past
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  
  return checkDate >= today
}
