import type { Metadata } from 'next'
import Link from 'next/link'
import { FiFileText, FiCheck } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { pageMetadata } from '@/lib/seo'

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
      <section className="bg-primary-dark text-light py-16 md:py-20">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-accent-red text-sm font-semibold uppercase tracking-wider mb-3">Aanbod</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wat we voor uw vloot doen</h1>
          <p className="text-light/80 text-lg">
            Geen consumentenprijslijst — wel duidelijke diensten die we op schaal uitvoeren op uw locatie in Vlaanderen.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {offerings.map((item) => (
              <article key={item.title} className="bg-white border border-primary-dark/10 rounded-xl p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold text-primary-dark mb-3">{item.title}</h2>
                <p className="text-primary-dark/75 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-primary-dark">
                      <FiCheck className="text-accent-red flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mb-10 rounded-xl border border-primary-dark/10 bg-white p-6 text-sm text-primary-dark/80">
            <p className="font-semibold text-primary-dark mb-1">Praktisch op uw locatie</p>
            <p>
              Voor detailing op site hebben we toegang tot water en elektriciteit nodig bij u. Dat houdt de
              werkwijze eenvoudig en beperkt stilstand van uw vloot.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-primary-dark text-light rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Prijs op maat</h2>
            <p className="text-light/80 mb-6 text-sm md:text-base">
              Afhankelijk van vlootomvang, type voertuigen, frequentie en locatie maken wij een voorstel.
              Geen verrassingen: eerst overleg, dan planning.
            </p>
            <Link href="/zakelijk/offerte">
              <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                <FiFileText className="w-5 h-5" />
                Offerte aanvragen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
