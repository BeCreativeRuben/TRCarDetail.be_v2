import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Bebas_Neue, Inter } from 'next/font/google'
import GoogleTag from '@/components/GoogleTag'
import ScrollToTop from '@/components/ScrollToTop'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { buildLocalBusinessJsonLd, buildWebSiteJsonLd, pageMetadata, SITE_URL } from '@/lib/seo'
import './globals.css'

const bebas = Bebas_Neue({ weight: '400', variable: '--font-bebas', subsets: ['latin'] })
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageMetadata.home.title as string,
    template: '%s',
  },
  description: pageMetadata.home.description as string,
  keywords: pageMetadata.home.keywords as string[],
  alternates: { canonical: SITE_URL },
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <html lang="nl" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-primary-dark text-light min-h-screen">
        <JsonLd data={[buildLocalBusinessJsonLd(), buildWebSiteJsonLd()]} />
        <GoogleTag />
        {isAdminRoute ? (
          children
        ) : (
          <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        )}
      </body>
    </html>
  )
}
