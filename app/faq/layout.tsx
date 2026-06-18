import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { FAQ_ITEMS } from '@/lib/faq-data'
import { buildFaqPageJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.faq

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildFaqPageJsonLd([...FAQ_ITEMS])} />
      {children}
    </>
  )
}
