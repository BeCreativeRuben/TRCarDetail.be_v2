import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import CookieBanner from '@/components/consent/CookieBanner'
import GoogleTag from '@/components/GoogleTag'
import SiteChrome from '@/components/layout/SiteChrome'
import JsonLd from '@/components/seo/JsonLd'
import { buildLocalBusinessJsonLd, buildWebSiteJsonLd, pageMetadata, SITE_URL } from '@/lib/seo'
import './globals.css'

const bebas = Bebas_Neue({ weight: '400', variable: '--font-bebas', subsets: ['latin'], display: 'swap', preload: false })
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap', preload: false })
const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageMetadata.home.title as string,
    template: '%s',
  },
  description: pageMetadata.home.description as string,
  keywords: pageMetadata.home.keywords as string[],
  alternates: {
    canonical: SITE_URL,
    languages: { 'nl-BE': SITE_URL, 'x-default': SITE_URL },
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    ...pageMetadata.home.openGraph,
    siteName: 'T&R Car Detail',
    locale: 'nl_BE',
    type: 'website',
  },
  twitter: pageMetadata.home.twitter,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl-BE" className={`${bebas.variable} ${inter.variable} ${montserrat.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/brand/texture-dark-mobile.avif"
          type="image/avif"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/brand/texture-dark.avif"
          type="image/avif"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
      </head>
      <body className="bg-primary-dark text-light min-h-screen">
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>
        <JsonLd data={[buildLocalBusinessJsonLd(), buildWebSiteJsonLd()]} />
        <GoogleTag />
        <SiteChrome>{children}</SiteChrome>
        <CookieBanner />
      </body>
    </html>
  )
}
