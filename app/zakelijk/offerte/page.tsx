import type { Metadata } from 'next'
import ZakelijkQuoteForm from '@/components/zakelijk/ZakelijkQuoteForm'
import JsonLd from '@/components/seo/JsonLd'
import PageHero from '@/components/brand/PageHero'
import { buildBreadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.zakelijkOfferte

export default function ZakelijkOffertePage() {
  return (
    <div className="bg-light min-h-screen">
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Zakelijk', path: '/zakelijk' }, { name: 'Offerte', path: '/zakelijk/offerte' }])} />
      <PageHero eyebrow="Offerte" title="Offerte vlootdetailing" withRedPaper={false}>
        <p className="text-lg text-light/85 max-w-2xl mx-auto">
          Vertel ons over uw bedrijf en vloot. We nemen binnen 1–2 werkdagen contact op — geen vaste
          online prijzen, wel een voorstel op maat. Op locatie werken we met water en elektriciteit ter
          beschikking van de klant.
        </p>
      </PageHero>

      <section className="pb-16 md:pb-24">
        <div className="container-custom max-w-2xl">
          <div className="bg-white border border-primary-dark/10 rounded-xl p-6 md:p-8 shadow-sm">
            <ZakelijkQuoteForm />
          </div>
        </div>
      </section>
    </div>
  )
}
