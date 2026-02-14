import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({ weight: '400', variable: '--font-bebas', subsets: ['latin'] })
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T&R Car Detail - Professional Car Detailing Services',
  description: 'Professionele autoreiniging en detailing diensten',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${bebas.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
