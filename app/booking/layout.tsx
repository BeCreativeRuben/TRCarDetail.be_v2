import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.booking

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Boeken', path: '/booking' }])} />
      {children}
    </>
  )
}
