'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatLocalDateString, isDateBookable, isDateInBlockedRange } from '@/lib/booking-dates'

interface BookingCalendarProps {
  selectedDate: string | null | undefined
  onDateSelect: (date: string) => void
}

export default function BookingCalendar({ selectedDate, onDateSelect }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    // Kalender start op maandag; JS getDay() start op zondag (0).
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7
    const days: (number | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(day)
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const formatDate = (day: number) => formatLocalDateString(year, month, day)

  const isSelected = (day: number) => selectedDate && day && formatDate(day) === selectedDate

  return (
    <div className="bg-light rounded-lg p-4 shadow-lg max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="text-primary-dark hover:text-accent-red transition-colors text-sm p-1">←</button>
        <h3 className="text-base font-bold text-primary-dark">{monthNames[month]} {year}</h3>
        <button type="button" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="text-primary-dark hover:text-accent-red transition-colors text-sm p-1">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-primary-dark opacity-70">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const padKey = `pad-${year}-${month}-${index}`
          if (day === null) return <div key={padKey} />
          const dateStr = formatDate(day)
          const fullyBooked = isDateInBlockedRange(year, month, day)
          const bookable = isDateBookable(year, month, day)
          const selected = isSelected(day)
          return (
            <motion.button
              key={dateStr}
              type="button"
              onClick={() => bookable && onDateSelect(dateStr)}
              disabled={!bookable}
              title={fullyBooked ? 'Volzet – niet beschikbaar' : undefined}
              aria-label={fullyBooked ? `${day} – volzet` : `${day}`}
              className={`aspect-square max-w-[36px] max-h-[36px] w-full rounded text-xs font-medium transition-all flex flex-col items-center justify-center leading-tight ${
                fullyBooked
                  ? 'bg-accent-red/15 text-accent-red ring-1 ring-accent-red/40 cursor-not-allowed'
                  : !bookable
                    ? 'text-primary-dark opacity-30 cursor-not-allowed'
                    : selected
                      ? 'bg-accent-red text-white'
                      : 'text-primary-dark hover:bg-secondary-dark hover:text-accent-red'
              }`}
              whileHover={bookable ? { scale: 1.05 } : {}}
              whileTap={bookable ? { scale: 0.95 } : {}}
            >
              <span className={fullyBooked ? 'line-through opacity-80 text-[11px]' : ''}>{day}</span>
              {fullyBooked && <span className="text-[7px] font-bold uppercase tracking-wide">Vol</span>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
