import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.contact

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Contact', path: '/contact' }])} />
      {children}
    </>
  )
}
