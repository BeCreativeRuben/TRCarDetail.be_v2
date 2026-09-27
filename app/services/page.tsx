'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Service } from '@/lib/types'
import { exterieurCatalog, interieurCatalog } from '@/lib/services-catalog'
import { extrasAsServices } from '@/lib/extras-catalog'
import PricingCard from '@/components/sections/PricingCard'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import { FiCalendar, FiShield, FiCheck, FiPlusCircle } from 'react-icons/fi'
import TrackedBookLink from '@/components/analytics/TrackedBookLink'

type ServiceCategory = 'interieur' | 'exterieur' | 'full' | 'polieren' | 'coating' | 'moto' | 'extras'

const interieurServices: Service[] = interieurCatalog
const exterieurServices: Service[] = exterieurCatalog

const exterieurBasisFeatures =
  exterieurServices.find((s) => s.id === 'exterieur-basis')?.features ?? []
const exterieurBasisDescription =
  exterieurServices.find((s) => s.id === 'exterieur-basis')?.description ?? ''
const interieurBasisFeatures =
  interieurServices.find((s) => s.id === 'interieur-basis')?.features ?? []
const interieurBasisDescription =
  interieurServices.find((s) => s.id === 'interieur-basis')?.description ?? ''
const interieurDeluxeFeatures =
  interieurServices.find((s) => s.id === 'interieur-deluxe')?.features ?? []
const interieurDeluxeDescription =
  interieurServices.find((s) => s.id === 'interieur-deluxe')?.description ?? ''
const interieurPremiumFeatures =
  interieurServices.find((s) => s.id === 'interieur-premium')?.features ?? []
const interieurPremiumDescription =
  interieurServices.find((s) => s.id === 'interieur-premium')?.description ?? ''

const fullServices: Service[] = [
  {
    id: 'full-basis',
    name: 'Basis Pakket',
    description:
      `${exterieurBasisDescription} ${interieurBasisDescription}`.trim(),
    basePrice: 100,
    largeCarSurcharge: 0,
    features: [...exterieurBasisFeatures, ...interieurBasisFeatures],
  },
  {
    id: 'full-deluxe',
    name: 'Deluxe Pakket',
    description: `${exterieurBasisDescription} ${interieurDeluxeDescription}`.trim(),
    basePrice: 170,
    largeCarSurcharge: 0,
    popular: true,
    features: [...exterieurBasisFeatures, ...interieurDeluxeFeatures],
  },
  {
    id: 'full-premium',
    name: 'Premium Pakket',
    description: `${exterieurBasisDescription} ${interieurPremiumDescription}`.trim(),
    basePrice: 250,
    largeCarSurcharge: 0,
    features: [...exterieurBasisFeatures, ...interieurPremiumFeatures],
  },
  {
    id: 'full-custom',
    name: 'Combinatie op maat',
    description:
      'Kies zelf welk exterieur- en interieurniveau u combineert (zoals elders op deze pagina). U kunt onderdelen uitvinken die u niet wilt. In het boekingsformulier ziet u een richtprijs; de definitieve prijs kan afwijken na zicht op de werken.',
    basePrice: 0,
    largeCarSurcharge: 0,
    features: [
      'Zelfde exterieur- en interieuropties als elders op deze pagina',
      'Onderdelen uitvinken die niet van toepassing zijn',
      'Richtprijs (indicatie) wordt in het boekingsformulier berekend',
    ],
  },
]

const polierenServices: Service[] = [
  {
    id: 'polijsten-light',
    name: 'Light Polish – Basis correctie',
    description: 'Lichte swirl marks, doffe glans, algemeen onderhoud. 1-staps polieren.',
    basePrice: 0,
    fromPrice: 300,
    largeCarSurcharge: 0,
    features: [
      'Resultaat: Merkbaar diepere glans',
      'Toeslag Sedan/Station +€50',
      'Toeslag Jeep/SUV +€90',
    ],
  },
  {
    id: 'polijsten-full',
    name: 'Full Polish – Intensive correctie',
    description: 'Merkbare tot diepe kras- en swirlschade. 2-staps of 3-staps (meerstaps) polieren.',
    basePrice: 0,
    fromPrice: 440,
    largeCarSurcharge: 0,
    features: [
      '2-staps: vanaf €440 · sterk verbeterde, egale glans',
      '3-staps (meerstaps): vanaf €600 · zo goed als perfecte lak',
      'Toeslag Sedan/Station +€60 (2-staps) of +€70 (3-staps)',
      'Toeslag Jeep/SUV +€105 (2-staps) of +€120 (3-staps)',
    ],
  },
]

const polierenIncluded = [
  'Grondige voorreiniging en decontaminatie van de lak',
  'Lakcorrectie met professionele polijstmachine (1 of meerdere stappen, afhankelijk van pakket)',
  'Bescherming van gevoelige onderdelen (rubbers, kunststof, randen)',
  'Nabehandeling met glansversterker',
  'Persoonlijk advies over onderhoud en eventuele vervolgstappen (bv. coating)',
]

const polierenLevels = ['1-staps', '2-staps', '3-staps (meerstaps)'] as const

const polierenComparison: { label: string; values: readonly [string, string, string]; emphasize?: boolean }[] = [
  {
    label: 'Geschikt voor',
    values: [
      'Lichte swirl marks, doffe glans, algemeen onderhoud',
      'Merkbare kras- en swirlschade, matte/verweerde lak',
      'Diepe kras- en swirlschade, maximale correctie',
    ],
  },
  {
    label: 'Resultaat',
    values: ['Merkbaar diepere glans', 'Sterk verbeterde, egale glans', 'Zo goed als perfecte lak'],
  },
  {
    label: 'Vanaf-prijs',
    values: ['€300', '€440', '€600'],
    emphasize: true,
  },
  {
    label: 'Toeslag Sedan/Station',
    values: ['+€50', '+€60', '+€70'],
    emphasize: true,
  },
  {
    label: 'Toeslag Jeep/SUV',
    values: ['+€90', '+€105', '+€120'],
    emphasize: true,
  },
]

const polierenFaq = [
  {
    question: 'Hoeveel tijd duurt polijsten?',
    answer:
      'Afhankelijk van het pakket: Light Polish (1-staps) neemt gemiddeld een halve dag, Full Polish (2-staps en 3-staps) kan een volledige dag in beslag nemen door de extra correctiestappen.',
  },
  {
    question: 'Is polijsten schadelijk voor mijn lak?',
    answer:
      'Neen, mits correct uitgevoerd. We werken met professionele polijstmachines en de juiste pads/polijstmiddelen per stap, zodat we enkel de beschadigde bovenlaag verwijderen — niet meer dan nodig.',
  },
  {
    question: 'Wat is het verschil tussen polijsten en een coating?',
    answer:
      'Polijsten verwijdert bestaande schade (krasjes, swirl marks, dofheid) en herstelt de glans. Een coating beschermt die glans nadien tegen nieuwe schade, UV en vervuiling — de twee vullen elkaar dus perfect aan.',
  },
  {
    question: 'Kan ik polijsten combineren met een coating?',
    answer:
      'Zeker, en dat raden we zelfs aan: polijsten vóór een coating zorgt voor het beste eindresultaat en de langste levensduur van de coating.',
  },
]

const coatingServices: Service[] = [
  {
    id: 'coating-basis',
    name: 'Coating Basis',
    description: 'Decontaminatie + lichte lakcorrectie – 2 jaar bescherming.',
    basePrice: 450,
    largeCarSurcharge: 0,
    features: [
      'Grondige decontaminatie vooraf',
      'Lichte lakcorrectie',
      'Professionele aanbreng van de coating',
      'Advies voor onderhoud nadien',
      '2 jaar bescherming',
    ],
  },
  {
    id: 'coating-deluxe',
    name: 'Coating Deluxe',
    description: 'Decontaminatie + uitgebreide lakcorrectie – 3 jaar bescherming, ruitencoating inbegrepen.',
    basePrice: 650,
    largeCarSurcharge: 0,
    popular: true,
    features: [
      'Grondige decontaminatie vooraf',
      'Uitgebreide lakcorrectie',
      'Professionele aanbreng van de coating',
      'Advies voor onderhoud nadien',
      '3 jaar bescherming',
      'Ruitencoating inbegrepen',
    ],
  },
  {
    id: 'coating-premium',
    name: 'Coating Premium',
    description: 'Decontaminatie + volledige lakcorrectie (meerdere stappen) – 4-5 jaar bescherming, ruitencoating + jaarlijkse gratis controle.',
    basePrice: 900,
    largeCarSurcharge: 0,
    features: [
      'Grondige decontaminatie vooraf',
      'Volledige lakcorrectie (meerdere stappen)',
      'Professionele aanbreng van de coating',
      'Advies voor onderhoud nadien',
      '4-5 jaar bescherming',
      'Ruitencoating inbegrepen',
      'Jaarlijkse gratis controle',
    ],
  },
]

const motoServices: Service[] = [
  { id: 'moto-detailing', name: 'Moto Detailing', description: 'Professionele reiniging en detailing voor moto\'s en motorfietsen. Binnenkort beschikbaar – wij breiden onze diensten uit zodat ook uw motor dezelfde zorg en glans krijgt als uw auto.', basePrice: 0, largeCarSurcharge: 0, features: ['Exterieur reiniging', 'Velgen en banden', 'Lak- en onderhoudsbehandeling', 'Details en optiek'], comingSoon: true },
]

const extrasServices: Service[] = extrasAsServices()

const VALID_CATEGORIES: ServiceCategory[] = ['interieur', 'exterieur', 'full', 'polieren', 'coating', 'moto', 'extras']

function categoryFromParam(param: string | null): ServiceCategory {
  return param && VALID_CATEGORIES.includes(param as ServiceCategory) ? param as ServiceCategory : 'exterieur'
}

function ServicesPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(() => categoryFromParam(categoryParam))

  useEffect(() => {
    setActiveCategory(categoryFromParam(searchParams.get('category')))
  }, [searchParams])

  const getCurrentServices = () => {
    switch (activeCategory) {
      case 'interieur': return interieurServices
      case 'exterieur': return exterieurServices
      case 'full': return fullServices
      case 'polieren': return polierenServices
      case 'coating': return coatingServices
      case 'moto': return motoServices
      case 'extras': return extrasServices
      default: return exterieurServices
    }
  }

  return (
    <div className="pt-20 pb-0 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">Onze Diensten</h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-3xl mx-auto mb-6">Car detailing aan huis in Vlaanderen – interieur, exterieur, polieren en volledige pakketten.</p>
          <TrackedBookLink href="/booking?from=services_top" location="services_top" className="inline-flex">
            <Button variant="primary" size="md" className="flex items-center gap-2 mx-auto">
              <FiCalendar className="w-5 h-5" />
              Direct boeken
            </Button>
          </TrackedBookLink>
        </motion.div>

        <div className="max-lg:sticky max-lg:top-[81px] max-lg:z-30 max-lg:bg-light max-lg:-mx-4 max-lg:px-4 max-lg:py-2 flex flex-wrap justify-center gap-3 mb-12">
          <button onClick={() => setActiveCategory('exterieur')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'exterieur' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            Exterieur
          </button>
          <button onClick={() => setActiveCategory('interieur')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'interieur' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            Interieur
          </button>
          <button onClick={() => setActiveCategory('full')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'full' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            <FiShield /> Volledig Pakket
          </button>
          <button onClick={() => setActiveCategory('polieren')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'polieren' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            Polieren
          </button>
          <button onClick={() => setActiveCategory('coating')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'coating' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            <FiShield /> Keramische Coating
          </button>
          <button onClick={() => setActiveCategory('moto')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'moto' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            Moto
          </button>
          <button onClick={() => setActiveCategory('extras')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ${activeCategory === 'extras' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            <FiPlusCircle /> Extra&apos;s
          </button>
        </div>

        {activeCategory === 'coating' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-lg text-primary-dark opacity-80 leading-relaxed">
              Een keramische coating beschermt je lak tegen krassen, UV en vervuiling, en zorgt voor een diepe glans die makkelijk schoon te houden is.
            </p>
          </motion.div>
        )}

        {activeCategory === 'polieren' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-lg text-primary-dark opacity-80 leading-relaxed">
              Kleine krasjes, swirl marks of een doffe glans na de wasstraat? Met polijsten halen we de originele diepte en glans terug uit je lak — zonder te verven, zonder compromissen. Ideaal als voorbereiding op een keramische coating, of gewoon om je auto er weer als nieuw te laten uitzien.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-stretch">
          {getCurrentServices().map((service, index) => (
            <PricingCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {activeCategory === 'coating' && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto mb-12 space-y-8">
            <div className="bg-white rounded-xl border border-primary-dark/10 p-6">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Wat is inbegrepen</h3>
              <ul className="space-y-2">
                {['Grondige decontaminatie vooraf', 'Lakcorrectie waar nodig', 'Professionele aanbreng van de coating', 'Advies voor onderhoud nadien'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-primary-dark">
                    <FiCheck className="text-accent-red flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-primary-dark/10 p-6">
              <h3 className="text-xl font-bold text-primary-dark mb-3">Extra lakcorrectie mogelijk</h3>
              <p className="text-primary-dark opacity-80 mb-4">
                Wil je een uitgebreidere lakcorrectie (bv. 2- of 3-staps polijsten) bij een lichter pakket? Dat kan tegen meerprijs:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex justify-between items-center bg-light rounded-lg px-4 py-3">
                  <span className="text-primary-dark font-medium">2-staps polijsten</span>
                  <span className="text-accent-red font-bold">+ €120</span>
                </div>
                <div className="flex justify-between items-center bg-light rounded-lg px-4 py-3">
                  <span className="text-primary-dark font-medium">3-staps polijsten</span>
                  <span className="text-accent-red font-bold">+ €220</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-primary-dark opacity-70 text-center">
              Coating gebeurt bij voorkeur op een overdekte locatie voor het beste resultaat. Contacteer ons voor de mogelijkheden.
            </p>

            <div className="bg-white rounded-xl border border-primary-dark/10 p-6">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Veelgestelde vragen</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-dark mb-1">Hoeveel kost een coating?</h4>
                  <p className="text-primary-dark opacity-80">Vanaf €450, afhankelijk van de staat van je lak en de gewenste bescherming.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark mb-1">Hoe lang duurt de behandeling?</h4>
                  <p className="text-primary-dark opacity-80">Reken op een hele dag, inclusief voorbereiding en lakcorrectie.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark mb-1">Is een coating beter dan wax?</h4>
                  <p className="text-primary-dark opacity-80">Wax ligt los op de lak en is na enkele weken tot maanden verdwenen. Een keramische coating bindt met de lak en beschermt veel langer, met een sterkere glans en betere bescherming tegen krassen en vervuiling.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeCategory === 'polieren' && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto mb-12 space-y-8">
            <div className="bg-white rounded-xl border border-primary-dark/10 p-6">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Wat is inbegrepen</h3>
              <ul className="space-y-2">
                {polierenIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-primary-dark">
                    <FiCheck className="text-accent-red flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-primary-dark/10 p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[40rem] text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-primary-dark/10">
                      <th scope="col" className="py-3 pr-4 font-semibold text-primary-dark align-bottom">Correctie</th>
                      {polierenLevels.map((level) => (
                        <th key={level} scope="col" className="py-3 px-3 font-semibold text-primary-dark align-bottom">{level}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {polierenComparison.map((row) => (
                      <tr key={row.label} className="border-b border-primary-dark/10 last:border-b-0">
                        <th scope="row" className="py-3 pr-4 font-semibold text-primary-dark align-top whitespace-nowrap">{row.label}</th>
                        {row.values.map((value, i) => (
                          <td
                            key={`${row.label}-${polierenLevels[i]}`}
                            className={`py-3 px-3 align-top ${row.emphasize ? 'font-bold text-accent-red whitespace-nowrap' : 'text-primary-dark opacity-80'}`}
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-lg text-primary-dark opacity-80 leading-relaxed">
              Wist je dat je je resultaat kan laten duren? Na een polijstbeurt is je lak op z&apos;n mooist — en dat is het perfecte moment om ze te beschermen met een keramische coating. Zo blijft die diepe glans jarenlang behouden in plaats van na een paar maanden weer te vervagen. Vraag ernaar bij je afspraak, of bekijk onze{' '}
              <Link href="/services?category=coating" className="text-accent-red font-semibold hover:underline">
                Keramische Coating pagina
              </Link>
              {' '}voor de mogelijkheden.
            </p>

            <div className="bg-white rounded-xl border border-primary-dark/10 p-6">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Veelgestelde vragen</h3>
              <div className="space-y-4">
                {polierenFaq.map((item) => (
                  <div key={item.question}>
                    <h4 className="font-semibold text-primary-dark mb-1">{item.question}</h4>
                    <p className="text-primary-dark opacity-80">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeCategory !== 'coating' && (
          <p className="text-center text-sm text-primary-dark opacity-70 max-w-2xl mx-auto mb-12">
            Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.
          </p>
        )}
      </div>

      <section className="py-20 bg-primary-dark">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">PROFESSIONELE AUTOREINIGING,<span className="block text-accent-red">KRASVRIJ & GRONDIG</span></h2>
            <p className="text-lg text-light opacity-90 mb-6">Wij maken gebruik van professionele producten en technieken. Iedere wagen wordt gereinigd met een contactloze voorwas, gevolgd door een veilige handwas volgens de 2-emmer methode.</p>
            <ul className="space-y-3 mb-6 text-light opacity-90">
              {['Contactloze voorwas voor veilige reiniging', '2-emmer methode – krasvrij en grondig', 'pH-neutrale shampoos voor optimale bescherming', 'Professionele producten en technieken'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-accent-red flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <TrackedBookLink href="/booking?from=services_mid" location="services_mid">
              <Button variant="primary" size="md" className="flex items-center gap-2 w-fit">
                <FiCalendar className="w-5 h-5" />
                Boek Nu
              </Button>
            </TrackedBookLink>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Klaar om te Boeken?"
        description="Kies hierboven een pakket of start meteen het boekingsformulier."
        primaryAction={{ label: 'Boek Nu', to: '/booking?from=services_cta', icon: 'calendar' }}
        secondaryAction={{ label: 'Contact', to: '/contact', icon: 'contact' }}
        trackLocation="services_cta"
        noTopMargin
      />

      {/* Sticky book CTA on mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden p-3 bg-primary-dark/95 border-t border-secondary-dark safe-area-pb">
        <TrackedBookLink href="/booking?from=services_sticky" location="services_sticky" className="block">
          <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
            <FiCalendar className="w-5 h-5" />
            Boek Nu
          </Button>
        </TrackedBookLink>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="pt-20 pb-0 bg-light min-h-screen flex items-center justify-center"><p className="text-primary-dark opacity-70">Laden...</p></div>}>
      <ServicesPageContent />
    </Suspense>
  )
}
