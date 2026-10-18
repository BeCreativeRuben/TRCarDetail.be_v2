/** Cookievoorkeur. Ongeveer 6 maanden geldig. Geen tracking vóór een keuze. */

export const CONSENT_STORAGE_KEY = 'tr_cookie_consent'
export const CONSENT_OPEN_EVENT = 'tr-open-cookie-settings'
export const CONSENT_CHANGE_EVENT = 'tr-consent'
/** 183 dagen ≈ 6 maanden */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 183
export const CONSENT_MAX_AGE_MS = CONSENT_MAX_AGE_SECONDS * 1000

export type ConsentChoice = {
  analytics: boolean
  marketing: boolean
  decidedAt: number
}

export function serializeConsent(choice: ConsentChoice): string {
  return `1|a:${choice.analytics ? 1 : 0}|m:${choice.marketing ? 1 : 0}|t:${choice.decidedAt}`
}

export function parseConsent(raw: string | null | undefined): ConsentChoice | null {
  if (!raw) return null
  const match = /^1\|a:([01])\|m:([01])\|t:(\d+)$/.exec(raw.trim())
  if (!match) return null
  const decidedAt = Number(match[3])
  if (!Number.isFinite(decidedAt)) return null
  if (Date.now() - decidedAt > CONSENT_MAX_AGE_MS) return null
  return {
    analytics: match[1] === '1',
    marketing: match[2] === '1',
    decidedAt,
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const parts = document.cookie.split(';')
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return null
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  let fromStorage: ConsentChoice | null = null
  try {
    fromStorage = parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY))
  } catch {
    fromStorage = null
  }
  const fromCookie = parseConsent(readCookie(CONSENT_STORAGE_KEY))
  if (!fromStorage) return fromCookie
  if (!fromCookie) return fromStorage
  return fromStorage.decidedAt >= fromCookie.decidedAt ? fromStorage : fromCookie
}

export function writeConsent(partial: { analytics: boolean; marketing: boolean }): ConsentChoice {
  const choice: ConsentChoice = {
    analytics: partial.analytics,
    marketing: partial.marketing,
    decidedAt: Date.now(),
  }
  const value = serializeConsent(choice)
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    /* privémodus */
  }
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_STORAGE_KEY}=${encodeURIComponent(value)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }))
  return choice
}

export function openCookieSettings(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}

export function consentAllowsTracking(choice: ConsentChoice | null): boolean {
  return Boolean(choice && (choice.analytics || choice.marketing))
}
