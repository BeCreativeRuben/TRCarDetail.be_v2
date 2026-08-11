/**
 * GA4 event helpers for booking funnel / path exploration.
 * Events appear in GA4 → Reports → Engagement → Events
 * and can be used in Explore → Funnel / Path exploration.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === 'undefined') return
  const cleaned: Record<string, string | number | boolean> = {}
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) cleaned[key] = value
    }
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, cleaned)
    return
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...cleaned })
}

/** User clicked a CTA that should lead to booking */
export function trackBookCtaClick(location: string, destination = '/booking'): void {
  trackEvent('book_cta_click', {
    cta_location: location,
    link_url: destination,
  })
}

/** User landed on /booking (form mount) */
export function trackBeginBooking(source?: string | null, serviceFromUrl?: string | null): void {
  trackEvent('begin_booking', {
    booking_source: source || 'direct',
    service_from_url: serviceFromUrl || undefined,
  })
}

export function trackSelectService(serviceId: string, source: 'form' | 'url' = 'form'): void {
  trackEvent('select_service', {
    service_id: serviceId,
    selection_source: source,
  })
}

export function trackSelectDate(date: string): void {
  trackEvent('select_date', { preferred_date: date })
}

export function trackSelectTime(time: string): void {
  trackEvent('select_time', { preferred_time: time })
}

export function trackBookingSubmitSuccess(serviceId: string): void {
  trackEvent('booking_submit_success', {
    service_id: serviceId,
    // Recommended GA4 ecommerce-style name for conversions
    currency: 'EUR',
  })
  // Alias many marketers configure as a key event in GA4
  trackEvent('generate_lead', {
    lead_type: 'booking',
    service_id: serviceId,
  })
}

export function trackBookingSubmitError(reason: string): void {
  trackEvent('booking_submit_error', { error_reason: reason.slice(0, 100) })
}

export function trackB2bQuoteStart(): void {
  trackEvent('b2b_quote_start')
}

export function trackB2bQuoteSuccess(fleetSize: string): void {
  trackEvent('b2b_quote_submit_success', { fleet_size: fleetSize })
  trackEvent('generate_lead', { lead_type: 'b2b_quote', fleet_size: fleetSize })
}

export function trackB2bQuoteError(reason: string): void {
  trackEvent('b2b_quote_submit_error', { error_reason: reason.slice(0, 100) })
}
