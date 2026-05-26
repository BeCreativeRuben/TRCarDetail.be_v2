/** Google Ads contact conversion label (must match GoogleTag.tsx snippet). */
export const GOOGLE_ADS_CONTACT_SEND_TO = 'AW-18036326015/WAOgCMvYl6ocEP_8sZhD'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    gtag_report_conversion?: (url?: string) => boolean
  }
}

/**
 * Fire the Contact conversion after a successful form submit.
 * Uses the global gtag_report_conversion from the Google Ads event snippet.
 */
export function trackContactConversion(): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag_report_conversion === 'function') {
    window.gtag_report_conversion()
    return
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_CONTACT_SEND_TO })
  }
}
