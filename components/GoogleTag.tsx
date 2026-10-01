'use client'

import Script from 'next/script'

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

function gaConfigLines(): string {
  const ids = [EXISTING_GA_ID, GA_MEASUREMENT_ID]
  if (/^G-[A-Z0-9]+$/.test(GA_ID_FROM_ENV) && !ids.includes(GA_ID_FROM_ENV)) {
    ids.push(GA_ID_FROM_ENV)
  }
  return ids.map((id) => `gtag('config', '${id}');`).join('\n          ')
}

/**
 * Single gtag.js load with GA4 + Google Ads config, plus the contact conversion
 * snippet exactly as provided by Google Ads (HTML pages instructions).
 */
export default function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gaConfigLines()}
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <Script id="google-ads-contact-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': '${CONTACT_CONVERSION_SEND_TO}',
                'event_callback': callback
            });
            return false;
          }
          window.gtag_report_conversion = gtag_report_conversion;
        `}
      </Script>
    </>
  )
}
