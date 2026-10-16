import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd, buildOfferCatalogJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.services

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[buildOfferCatalogJsonLd(), buildBreadcrumbJsonLd([{ name: 'Diensten', path: '/services' }])]} />
      {children}
    </>
  )
}
