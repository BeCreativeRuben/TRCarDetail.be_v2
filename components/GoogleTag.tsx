'use client'

import Script from 'next/script'

/** Google Analytics (statistics) */
const GA_ID = 'G-2Z07BE36YG'
/** Google Ads account */
const GOOGLE_ADS_ID = 'AW-18036326015'
/** Contact conversion label */
const CONTACT_CONVERSION_SEND_TO = 'AW-18036326015/WAOgCMvYl6ocEP_8sZhD'

/**
 * Single gtag.js load with GA + Google Ads config, plus the contact conversion
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
          gtag('config', '${GA_ID}');
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
