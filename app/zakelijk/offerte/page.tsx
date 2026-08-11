import type { Metadata } from 'next'
import ZakelijkQuoteForm from '@/components/zakelijk/ZakelijkQuoteForm'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.zakelijkOfferte

export default function ZakelijkOffertePage() {
  return (
    <div className="bg-light min-h-screen">
      <section className="bg-primary-dark text-light py-14 md:py-16">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-accent-red text-sm font-semibold uppercase tracking-wider mb-3">Offerte</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Offerte vlootdetailing</h1>
          <p className="text-light/80">
            Vertel ons over uw bedrijf en vloot. We nemen binnen 1–2 werkdagen contact op — geen vaste
            online prijzen, wel een voorstel op maat.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom max-w-2xl">
          <div className="bg-white border border-primary-dark/10 rounded-xl p-6 md:p-8 shadow-sm">
            <ZakelijkQuoteForm />
          </div>
        </div>
      </section>
    </div>
  )
}
