'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Service } from '@/lib/types'
import PricingCard from '@/components/sections/PricingCard'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import { FiCalendar, FiHome, FiShield, FiCheck } from 'react-icons/fi'

type ServiceCategory = 'interieur' | 'exterieur' | 'full' | 'polieren'

const interieurServices: Service[] = [
  { id: 'interieur-basis', name: 'Interieur Basis', description: 'Bedoeld voor mensen die hun wagen goed hebben onderhouden en hun wagen eens willen laten opfrissen. LET OP: dit is geen dieptereiniging.', basePrice: 50, largeCarSurcharge: 0, features: ['Interieur stofzuigen', 'Interieur afstoffen', 'Grondig stofzuigen en interieur behandelen met microvezeldoeken en product'] },
  { id: 'interieur-deluxe', name: 'Interieur Deluxe', description: 'Uitgebreide interieurreiniging waarbij geen enkel detail wordt overgeslagen. Van zichtbare oppervlakken tot verborgen hoeken – alles wordt zorgvuldig gereinigd.', basePrice: 130, largeCarSurcharge: 0, popular: true, features: ['Interieur stofzuigen', 'Interieur dieptereiniging', 'Interieur grondig uitblazen', 'Dieptereiniging dashboard, stuur, middenconsole', 'Stof, leder en alcantara worden gereinigd en onderhouden', 'Verfrissende geur'] },
  { id: 'interieur-premium', name: 'Interieur Premium', description: 'De meest complete interieurdieptereiniging. Pakt zelfs verwaarloosde interieurs aan met krachtige reinigingstechnieken en professionele machines.', basePrice: 220, largeCarSurcharge: 0, features: ['Interieur stofzuigen', 'Interieur dieptereiniging', 'Interieur grondig uitblazen', 'Dieptereiniging dashboard, stuurwiel en middenconsole', 'Reiniging en onderhoud stof, leder en alcantara', 'Stoomreiniging voor optimale hygiëne', 'Extractor voor zetels, tapijten en vloermatten', 'Verfrissende geur'] },
]

const exterieurServices: Service[] = [
  { id: 'exterieur-basis', name: 'Exterieur Basis', description: 'Houd je auto glanzend en in topvorm! Grondige wasbeurt, zorgvuldige reiniging van alle details en een stralende afwerking.', basePrice: 60, largeCarSurcharge: 0, features: ['Dieptereiniging velgen', 'Dieptereiniging wielkasten', 'Pre-wash', 'Gepaste shampoo voor de wagen', '2-emmer methode (krasvrij wassen)', 'Deurlijsten + instaplijsten', 'Ramen + spiegels', 'Bandendressing', 'Wax (2-3 maanden)'] },
  { id: 'exterieur-deluxe', name: 'Exterieur Deluxe (Decontaminatie was)', description: 'Voor auto\'s die een grondige opfrisbeurt verdienen! Verwijdert hardnekkig vuil, herstelt de glans en biedt een hoogwaardige beschermlaag.', basePrice: 90, largeCarSurcharge: 0, popular: true, features: ['Dieptereiniging velgen + wielkasten', 'Pre-wash + gepaste shampoo voor de wagen', '2-emmer methode (krasvrij wassen)', 'Deurlijsten + instaplijsten', 'Ramen + spiegels', 'Bandendressing', 'Wax (2-3 maanden)', 'Decontamineren van de lak', 'Teer en vliegroest verwijderen', 'Kleibehandeling'] },
]

const fullServices: Service[] = [
  { id: 'full-basis', name: 'Exterieur Basis + Interieur Basis', description: 'Laat je auto van binnen en buiten weer helemaal stralen! Perfect voor een snelle opfrisbeurt en goed onderhouden voertuigen. Enkel mogelijk als de wagen zich in goede staat bevindt; anders raden we ons deluxe of premium pakket aan.', basePrice: 100, largeCarSurcharge: 0, features: ['Dieptereiniging velgen + wielkasten', 'Pre-wash + gepaste shampoo voor de wagen', '2-emmer methode (krasvrij wassen)', 'Deurlijsten + instaplijsten', 'Ramen + spiegels', 'Bandendressing', 'Wax (2-3 maanden)', 'Interieur stofzuigen', 'Interieur afstoffen'] },
]

const polierenServices: Service[] = [
  { id: 'polijsten-light', name: 'Light Polish – Basis correctie', description: 'Verwijdert lichte krassen, swirl marks en doffe plekken. Herstelt glans en kleurdiepte. Ideaal voor goed onderhouden auto\'s met minimale lakbeschadiging. 1-staps polieren.', basePrice: 0, largeCarSurcharge: 0, features: ['Verwijdert lichte krassen, swirl marks en doffe plekken', 'Herstelt glans en kleurdiepte', 'Ideaal voor goed onderhouden auto\'s met minimale lakbeschadiging', '1-staps polieren', 'Prijs op aanvraag · Sedan/Station +€60 · Jeep/SUV +€100'] },
  { id: 'polijsten-full', name: 'Full Polish – Intensive correctie', description: 'Verwijdert hardnekkige krassen, diepe swirls en oxidatie. Herstelt maximale glans en diepte. Alle gevoelige onderdelen worden professioneel afgeschermd. Meerstaps polieren.', basePrice: 0, largeCarSurcharge: 0, features: ['Verwijdert hardnekkige krassen, diepe swirls en oxidatie', 'Herstelt maximale glans en diepte in de lak', 'Gevoelige onderdelen professioneel afgeschermd', 'Geschikt voor duidelijke lakbeschadiging of doffe plekken', 'Meerstaps polieren', 'Prijs op aanvraag · Sedan/Station +€60 · Jeep/SUV +€120'] },
]

const VALID_CATEGORIES: ServiceCategory[] = ['interieur', 'exterieur', 'full', 'polieren']

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
      default: return fullServices
    }
  }

  return (
    <div className="pt-20 pb-0 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">Onze Diensten</h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-3xl mx-auto">Professionele auto detailing diensten op maat.</p>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-stretch">
          {getCurrentServices().map((service, index) => (
            <PricingCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <p className="text-center text-sm text-primary-dark opacity-70 max-w-2xl mx-auto mb-12">
          Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.
        </p>
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
            <Link href="/booking">
              <Button variant="primary" size="md" className="flex items-center gap-2 w-fit">
                <FiCalendar className="w-5 h-5" />
                Boek Nu
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTASection title="Klaar om te Boeken?" description="Kies uw pakket en reserveer direct online." secondaryAction={{ label: 'Contact', to: '/contact', icon: 'contact' }} noTopMargin />
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
