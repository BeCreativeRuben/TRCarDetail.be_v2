import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.about

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Over ons', path: '/about' }])} />
      {children}
    </>
  )
}
