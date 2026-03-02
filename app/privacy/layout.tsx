import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacyvoorwaarden - T&R Car Detail',
  description: 'Privacy en cookiegebruik op de website van T&R Car Detail. We gebruiken Google Analytics voor anonieme statistieken.',
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
