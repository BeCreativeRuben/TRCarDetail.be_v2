import type { Metadata } from 'next'
import Link from 'next/link'
import { FiFileText, FiCheck } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import JsonLd from '@/components/seo/JsonLd'
import PageHero from '@/components/brand/PageHero'
import Texture from '@/components/brand/Texture'
import { buildBreadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.zakelijkAanbod

const offerings = [
  {
    title: 'Exterieur voor fleets',
    description:
      'Contactloze voorwas, handwas volgens de 2-emmer methode, velgen en banden — afgestemd op het gebruik van uw wagens (stad, werf, lange afstand).',
    points: ['Krasvrij en grondig', 'Ideaal voor representatieve fleets', 'Batch per bezoek mogelijk'],
  },
  {
    title: 'Interieur voor fleets',
    description:
      'Van snelle opfrisbeurt tot dieptereiniging. Handig voor saleswagens, poolwagens en voertuigen met intensief gebruik.',
    points: ['Stofzuigen & oppervlakken', 'Dieptereiniging op aanvraag', 'Consistente uitstraling per wagen'],
  },
  {
    title: 'Periodiek vlootonderhoud',
    description:
      'Vaste ritmes (maandelijks of op maat) zodat uw vloot er verzorgd uitziet zonder ad-hoc planning door chauffeurs.',
    points: ['Geplande bezoekdagen', 'Schaalbaar met vlootomvang', 'Eén factuur / aanspreekpunt'],
  },
]

export default function ZakelijkAanbodPage() {
  return (
    <div className="bg-light min-h-screen">
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Zakelijk', path: '/zakelijk' }, { name: 'Aanbod', path: '/zakelijk/aanbod' }])} />
      <PageHero eyebrow="Aanbod" title="Wat we voor uw vloot doen" withRedPaper={false}>
        <p className="text-lg md:text-xl text-light/85 max-w-3xl mx-auto">
          Geen consumentenprijslijst — wel duidelijke diensten die we op schaal uitvoeren op uw locatie in Vlaanderen.
        </p>
      </PageHero>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="relative bg-white border border-primary-dark/10 rounded-xl p-6 pt-7 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent-red" />
                <h2 className="text-xl font-bold text-primary-dark mb-3">{item.title}</h2>
                <p className="text-primary-dark/80 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-primary-dark">
                      <FiCheck className="text-accent-red flex-shrink-0 mt-0.5" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mb-10 rounded-xl border border-primary-dark/10 bg-white p-6 text-sm text-primary-dark/80 shadow-sm">
            <p className="font-semibold text-primary-dark mb-1">Praktisch op uw locatie</p>
            <p>
              Voor detailing op site hebben we toegang tot water en elektriciteit nodig bij u. Dat houdt de
              werkwijze eenvoudig en beperkt stilstand van uw vloot.
            </p>
          </div>

          <div className="relative overflow-hidden max-w-2xl mx-auto rounded-xl border border-white/10 text-center shadow-lg">
            <Texture />
            <div className="relative px-6 py-10 md:px-10 md:py-12">
              <h2 className="text-2xl font-bold text-light mb-3">Prijs op maat</h2>
              <p className="text-light/85 mb-6 text-sm md:text-base">
                Afhankelijk van vlootomvang, type voertuigen, frequentie en locatie maken wij een voorstel.
                Geen verrassingen: eerst overleg, dan planning.
              </p>
              <Link href="/zakelijk/offerte" className="inline-flex">
                <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                  <FiFileText className="w-5 h-5" aria-hidden />
                  Offerte aanvragen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
