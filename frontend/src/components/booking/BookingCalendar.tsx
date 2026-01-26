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

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
  ]

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

  const isSelected = (day: number) => {
    if (!selectedDate || !day) return false
    return formatDate(day) === selectedDate
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="bg-light rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="text-primary-dark hover:text-accent-red transition-colors"
        >
          ←
        </button>
        <h3 className="text-xl font-bold text-primary-dark">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="text-primary-dark hover:text-accent-red transition-colors"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-primary-dark opacity-70">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} />
          }

          const dateStr = formatDate(day)
          const past = isPastDate(day)
          const selected = isSelected(day)

          return (
            <motion.button
              key={day}
              onClick={() => !past && onDateSelect(dateStr)}
              disabled={past}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${past
                  ? 'text-primary-dark opacity-30 cursor-not-allowed'
                  : selected
                  ? 'bg-accent-red text-white'
                  : 'text-primary-dark hover:bg-secondary-dark hover:text-accent-red'
                }
              `}
              whileHover={!past ? { scale: 1.1 } : {}}
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
