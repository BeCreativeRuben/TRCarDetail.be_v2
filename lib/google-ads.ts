/** Google Ads contact conversion label */
export const GOOGLE_ADS_CONTACT_SEND_TO = 'AW-18036326015/WAOgCMvYl6ocEP_8sZhD'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    gtag_report_conversion?: (url?: string) => boolean
  }
}

function fireContactConversion(url?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  const callback =
    url !== undefined
      ? () => {
          window.location.href = url
        }
      : undefined

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_CONTACT_SEND_TO,
    ...(callback ? { event_callback: callback } : {}),
  })
}

/** Fire contact conversion after successful form submit (no redirect). */
export function trackContactConversion(): void {
  fireContactConversion()
}

/**
 * Google Ads snippet helper for link/button clicks.
 * Pass a URL to redirect after the conversion is recorded.
 */
export function gtagReportConversion(url?: string): boolean {
  fireContactConversion(url)
  return false
}

export function registerGtagReportConversion(): void {
  if (typeof window === 'undefined') return
  window.gtag_report_conversion = gtagReportConversion
}
