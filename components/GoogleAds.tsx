'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { registerGtagReportConversion } from '@/lib/google-ads'

const GOOGLE_ADS_ID = 'AW-18036326015'

export default function GoogleAds() {
  useEffect(() => {
    registerGtagReportConversion()
  }, [])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  )
}
