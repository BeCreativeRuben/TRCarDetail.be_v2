'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { CONSENT_OPEN_EVENT, readConsent, writeConsent } from '@/lib/consent'

type View = 'hidden' | 'bar' | 'settings'

export default function CookieBanner() {
  const titleId = useId()
  const [view, setView] = useState<View>('hidden')
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    if (!stored) setView('bar')
    else {
      setAnalytics(stored.analytics)
      setMarketing(stored.marketing)
    }
    setReady(true)
    const open = () => {
      const current = readConsent()
      setAnalytics(Boolean(current?.analytics))
      setMarketing(Boolean(current?.marketing))
      setView('settings')
    }
    window.addEventListener(CONSENT_OPEN_EVENT, open)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open)
  }, [])

  if (!ready || view === 'hidden') return null

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true })
    setView('hidden')
  }
  const necessaryOnly = () => {
    writeConsent({ analytics: false, marketing: false })
    setView('hidden')
  }
  const saveSettings = () => {
    writeConsent({ analytics, marketing })
    setView('hidden')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-4" role="dialog" aria-modal="false" aria-labelledby={titleId}>
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-accent-red/50 bg-primary-dark text-light shadow-[0_16px_50px_rgba(0,0,0,.45)]">
        <div className="h-1.5 bg-accent-red" aria-hidden />
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-5">
          <h2 id={titleId} className="text-lg font-bold normal-case tracking-normal text-light">
            Cookies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-light/85">
            Noodzakelijke cookies onthouden alleen uw keuze. Analytische en marketingcookies (Google Analytics en Google Ads) plaatsen we pas nadat u toestemming geeft.
          </p>
          {view === 'settings' && (
            <ul className="mt-4 space-y-3">
              <li className="flex items-center justify-between gap-4 rounded-lg bg-light/10 px-3 py-3">
                <span>
                  <span className="block text-sm font-semibold">Noodzakelijk</span>
                  <span className="block text-xs text-light/70">Bewaart deze keuze, ongeveer 6 maanden.</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-red">Altijd aan</span>
              </li>
              <Toggle
                label="Analytisch"
                description="Google Analytics, om te zien hoe de site gebruikt wordt."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Toggle
                label="Marketing"
                description="Google Ads, om te meten of een campagne tot een aanvraag leidt."
                checked={marketing}
                onChange={setMarketing}
              />
            </ul>
          )}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={acceptAll}
              className="min-h-12 rounded-lg bg-accent-red px-4 py-3 text-sm font-bold text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
            >
              Alles accepteren
            </button>
            <button
              type="button"
              onClick={necessaryOnly}
              className="min-h-12 rounded-lg bg-light px-4 py-3 text-sm font-bold text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
            >
              Alleen noodzakelijk
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {view === 'bar' ? (
              <button
                type="button"
                onClick={() => setView('settings')}
                className="min-h-11 text-sm font-semibold text-light underline decoration-accent-red underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
              >
                Instellingen
              </button>
            ) : (
              <button
                type="button"
                onClick={saveSettings}
                className="min-h-11 text-sm font-semibold text-light underline decoration-accent-red underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
              >
                Voorkeuren opslaan
              </button>
            )}
            <Link href="/privacy" className="min-h-11 inline-flex items-center text-sm text-light/80 underline underline-offset-4 hover:text-light">
              Privacy- en cookiebeleid
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg bg-light/10 px-3 py-3">
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-light/70">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red ${checked ? 'bg-accent-red' : 'bg-light/30'}`}
      >
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-light transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </li>
  )
}
