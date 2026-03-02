'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Thursday 5 March 2026 @ 17:00 Brussels (UTC+1) = 16:00 UTC
const TARGET = new Date('2026-03-05T16:00:00.000Z')

function getTimeLeft(now: Date) {
  const diff = TARGET.getTime() - now.getTime()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, done: false }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()))

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft(new Date()))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Avoid hydration mismatch: show placeholder until client
  if (!mounted) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-light font-heading text-4xl opacity-50">...</div>
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'Dagen' },
    { value: timeLeft.hours, label: 'Uren' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Seconden' },
  ]

  const totalSecondsLeft = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds
  const isLastMinute = !timeLeft.done && totalSecondsLeft <= 60

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-secondary-dark to-primary-dark" />
      <div className="absolute inset-0 bg-primary-dark/60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 w-full container-custom max-w-5xl"
      >
        {/* Hero-style titel: twee regels, tweede in accent-red */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-light mb-2 tracking-wider">
          COMING SOON
          <span className="block text-accent-red">T&R CAR DETAIL</span>
        </h1>
        <p className="text-lg md:text-xl text-light/80 font-body mb-12 md:mb-16">
          Donderdag 5 maart 2026 · 17:00 UTC+1
        </p>

        {/* Knop-achtige blokken met afwisselende hoeken (corner-shape per kant) */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {units.map(({ value, label }, i) => {
            const cornerClasses = ['corner-shape', 'corner-shape-tr', 'corner-shape-bl', 'corner-shape-br']
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-full aspect-square max-w-[88px] sm:max-w-[110px] md:max-w-[130px] flex flex-col items-center justify-center border-2 border-accent-red bg-secondary-dark shadow-sm overflow-hidden ${cornerClasses[i]}`}
                >
                  <span className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-light tabular-nums">
                    {label === 'Dagen' ? value : pad(value)}
                  </span>
                </div>
                <span className="font-body text-xs sm:text-sm text-light/80 mt-3 uppercase tracking-wider font-medium">
                  {label}
                </span>
              </motion.div>
            )
          })}
        </div>

        {isLastMinute && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 max-w-xl mx-auto text-light/90 font-body text-sm sm:text-base leading-relaxed"
          >
            Bedankt om erbij te zijn voor de launch. Onze nummer 1 prioriteit: uw auto weer in volle showroomkwaliteit brengen.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
