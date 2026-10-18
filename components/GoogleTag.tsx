'use client'

import { useEffect } from 'react'
import { CONSENT_CHANGE_EVENT, readConsent, type ConsentChoice } from '@/lib/consent'

declare global {
  interface Window {
    __trGoogleTagStarted?: boolean
  }
}

/** GA4 property already installed on the site. */
const EXISTING_GA_ID = 'G-2Z07BE36YG'
/**
 * GA4 measurement ID to add site-wide. Always configured.
 * NEXT_PUBLIC_GA_ID is included as well when it names another G- property.
 */
const GA_MEASUREMENT_ID = 'G-WLZKJ16ZZ4'
const GA_ID_FROM_ENV = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? ''
/** Google Ads account */
const GOOGLE_ADS_ID = 'AW-18036326015'
/** Contact conversion label */
const CONTACT_CONVERSION_SEND_TO = 'AW-18036326015/WAOgCMvYl6ocEP_8sZhD'

function gaIds(): string[] {
  const ids = [EXISTING_GA_ID, GA_MEASUREMENT_ID]
  if (/^G-[A-Z0-9]+$/.test(GA_ID_FROM_ENV) && !ids.includes(GA_ID_FROM_ENV)) {
    ids.push(GA_ID_FROM_ENV)
  }
  return ids
}

function gtagUpdate(choice: ConsentChoice | null) {
  const analytics = choice?.analytics ? 'granted' : 'denied'
  const ads = choice?.marketing ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  })
}

function ensureGoogleTag(choice: ConsentChoice) {
  gtagUpdate(choice)
  if (window.__trGoogleTagStarted) return
  window.__trGoogleTagStarted = true
  window.gtag?.('js', new Date())
  for (const id of gaIds()) window.gtag?.('config', id)
  window.gtag?.('config', GOOGLE_ADS_ID)
  window.gtag_report_conversion = (url?: string) => {
    const callback = () => {
      if (typeof url !== 'undefined') window.location.assign(url)
    }
    window.gtag?.('event', 'conversion', {
      send_to: CONTACT_CONVERSION_SEND_TO,
      event_callback: callback,
    })
    return false
  }
  const script = document.createElement('script')
  script.id = 'gtag-src'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  document.head.appendChild(script)
}

/**
 * Google-tag pas na toestemming. Standaard staat consent op denied in de head,
 * vóór dit script, zodat er geen advertentie- of analyticscookies gezet worden.
 */
export default function GoogleTag() {
  useEffect(() => {
    const apply = () => {
      const choice = readConsent()
      if (choice && (choice.analytics || choice.marketing)) {
        ensureGoogleTag(choice)
        return
      }
      gtagUpdate(choice)
    }
    apply()
    window.addEventListener(CONSENT_CHANGE_EVENT, apply)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, apply)
  }, [])
  return null
}
