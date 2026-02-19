import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

const bebas = Bebas_Neue({ weight: '400', variable: '--font-bebas', subsets: ['latin'] })
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T&R Car Detail - Professional Car Detailing Services',
  description: 'Professionele autoreiniging en detailing diensten',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'T&R Car Detail - Professional Car Detailing Services',
    description: 'Professionele autoreiniging en detailing diensten',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 1200,
        alt: 'T&R Car Detail Logo',
      },
    ],
    type: 'website',
    locale: 'nl_BE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T&R Car Detail - Professional Car Detailing Services',
    description: 'Professionele autoreiniging en detailing diensten',
    images: ['/logo.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-primary-dark text-light min-h-screen">
        <GoogleAnalytics />
        <div className="min-h-screen flex flex-col">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
