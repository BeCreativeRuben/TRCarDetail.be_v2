import type { Metadata } from 'next'
import ZakelijkHeader from '@/components/zakelijk/ZakelijkHeader'
import ZakelijkFooter from '@/components/zakelijk/ZakelijkFooter'
import JsonLd from '@/components/seo/JsonLd'
import { buildB2bServiceJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.zakelijk

export default function ZakelijkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-light text-primary-dark">
      <JsonLd data={buildB2bServiceJsonLd()} />
      <ZakelijkHeader />
      <main className="flex-grow">{children}</main>
      <ZakelijkFooter />
    </div>
  )
}
