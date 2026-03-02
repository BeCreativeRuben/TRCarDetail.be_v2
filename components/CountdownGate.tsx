'use client'

import { useState, useEffect, ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Countdown from '@/components/Countdown'

// Thursday 5 March 2026 @ 17:00 Brussels (UTC+1) = 16:00 UTC
const TARGET = new Date('2026-03-05T16:00:00.000Z')

/** Standaard uit: timer verborgen, volledige site. Zet NEXT_PUBLIC_COUNTDOWN_HIDDEN=false om de timer te tonen. */
const COUNTDOWN_HIDDEN = process.env.NEXT_PUBLIC_COUNTDOWN_HIDDEN !== 'false'

/** Testmodus: toon de volledige site alsof de timer op 0 staat. Zet NEXT_PUBLIC_COUNTDOWN_FORCE_REACHED=true in .env.local */
const FORCE_REACHED = process.env.NEXT_PUBLIC_COUNTDOWN_FORCE_REACHED === 'true'

function isReached(now: Date) {
  return FORCE_REACHED || now.getTime() >= TARGET.getTime()
}

export default function CountdownGate({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [reached, setReached] = useState(FORCE_REACHED)

  useEffect(() => {
    setMounted(true)
    if (!FORCE_REACHED) setReached(isReached(new Date()))
    const t = setInterval(() => {
      if (isReached(new Date())) setReached(true)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Timer voorlopig verborgen: altijd volledige site tonen
  if (COUNTDOWN_HIDDEN) {
    return (
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    )
  }

  // Before hydration or before target: show countdown only (met testknop om overschakeling te proberen)
  if (!mounted || !reached) {
    return <Countdown onTestReached={() => setReached(true)} />
  }

  // After target: show full website
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
