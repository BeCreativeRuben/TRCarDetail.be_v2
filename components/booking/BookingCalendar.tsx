'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
    const startingDayOfWeek = firstDay.getDay()
    const days: (number | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(day)
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']

  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toISOString().split('T')[0]
  }

  const isSelected = (day: number) => selectedDate && day && formatDate(day) === selectedDate

  return (
    <div className="bg-light rounded-lg p-4 shadow-lg max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-primary-dark hover:text-accent-red transition-colors text-sm p-1">←</button>
        <h3 className="text-base font-bold text-primary-dark">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-primary-dark hover:text-accent-red transition-colors text-sm p-1">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-primary-dark opacity-70">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) return <div key={index} />
          const dateStr = formatDate(day)
          const past = isPastDate(day)
          const selected = isSelected(day)
          return (
            <motion.button
              key={day}
              onClick={() => !past && onDateSelect(dateStr)}
              disabled={past}
              className={`aspect-square max-w-[36px] max-h-[36px] w-full rounded text-xs font-medium transition-all ${past ? 'text-primary-dark opacity-30 cursor-not-allowed' : selected ? 'bg-accent-red text-white' : 'text-primary-dark hover:bg-secondary-dark hover:text-accent-red'}`}
              whileHover={!past ? { scale: 1.05 } : {}}
              whileTap={!past ? { scale: 0.95 } : {}}
            >
              {day}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
