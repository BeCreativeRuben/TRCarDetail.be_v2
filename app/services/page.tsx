'use client'

import { useState, useEffect, Suspense } from 'react'
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
    description:
      'Verwijdert lichte krassen, swirl marks en doffe plekken. Herstelt glans en kleurdiepte. Ideaal voor goed onderhouden auto\'s met minimale lakbeschadiging. 1-staps polieren.',
    basePrice: 0,
    largeCarSurcharge: 0,
    features: [
      'Verwijdert lichte krassen, swirl marks en doffe plekken',
      'Herstelt glans en kleurdiepte',
      'Ideaal voor goed onderhouden auto\'s met minimale lakbeschadiging',
      '1-staps polieren',
      'Prijs op aanvraag',
      'Sedan/Station +€60',
      'Jeep/SUV +€100',
    ],
  },
  {
    id: 'polijsten-full',
    name: 'Full Polish – Intensive correctie',
    description:
      'Verwijdert hardnekkige krassen, diepe swirls en oxidatie. Herstelt maximale glans en diepte. Alle gevoelige onderdelen worden professioneel afgeschermd. Meerstaps polieren.',
    basePrice: 0,
    largeCarSurcharge: 0,
    features: [
      'Verwijdert hardnekkige krassen, diepe swirls en oxidatie',
      'Herstelt maximale glans en diepte in de lak',
      'Gevoelige onderdelen professioneel afgeschermd',
      'Geschikt voor duidelijke lakbeschadiging of doffe plekken',
      'Meerstaps polieren',
      'Prijs op aanvraag',
      'Sedan/Station +€60',
      'Jeep/SUV +€120',
    ],
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
