'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Service } from '@/lib/types'
import PricingCard from '@/components/sections/PricingCard'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import { FiCalendar, FiHome, FiShield, FiCheck } from 'react-icons/fi'

type ServiceCategory = 'interieur' | 'exterieur' | 'full'

const interieurServices: Service[] = [
  { id: 'interieur-basic', name: 'Interieur Basic', description: 'Basis interieurreiniging voor regelmatig onderhoud', basePrice: 95, largeCarSurcharge: 15, features: ['Interieur stofzuigen', 'Interieur afstoffen', 'Reinigen ramen en spiegels', 'Dashboard reiniging', 'Basis interieur verzorging'] },
  { id: 'interieur-deepclean', name: 'Interieur DeepClean', description: 'Grondige dieptereiniging van het interieur', basePrice: 175, largeCarSurcharge: 25, popular: true, features: ['Alle basis interieur features', 'Dieptereiniging van bekleding', 'Reinigen van alle oppervlakken', 'Lederverzorging (indien van toepassing)', 'Geurbehandeling', 'Professionele interieur detail behandeling'] },
]

const exterieurServices: Service[] = [
  { id: 'exterieur-basic', name: 'Exterieur Basic', description: 'Basis exterieurreiniging met professionele producten', basePrice: 95, largeCarSurcharge: 15, features: ['Krasvrije wasbeurt (2 emmer methode)', 'Reinigen deurstijlen en instaplijsten', 'Reinigen velgen, banden en wielkasten', 'Drogen met warme lucht en zachte microvezel', 'Spraywax of sealant', 'Bandendressing'] },
  { id: 'exterieur-premium', name: 'Exterieur Premium', description: 'Dieptereiniging met teer- en vliegroest verwijdering', basePrice: 125, largeCarSurcharge: 25, features: ['Alle basis exterieur features', 'Teer en vliegroest verwijderen', 'Kleibehandeling*', 'Extra lakbescherming', 'Professionele exterieur detail behandeling'] },
]

const fullServices: Service[] = [
  { id: 'full-basic', name: 'Full Package Basic', description: 'Complete reiniging inclusief basis interieur en exterieur', basePrice: 175, largeCarSurcharge: 25, popular: true, features: ['Alle exterieur basic features', 'Alle interieur basic features', 'Complete auto reiniging', 'Professionele afwerking'] },
  { id: 'full-premium', name: 'Full Package Premium', description: 'Complete dieptereiniging interieur en exterieur', basePrice: 275, largeCarSurcharge: 40, features: ['Alle exterieur premium features', 'Alle interieur deepclean features', 'Complete auto dieptereiniging', 'Maximale verzorging en bescherming', 'Professionele premium behandeling'] },
]

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('full')

  const getCurrentServices = () => {
    switch (activeCategory) {
      case 'interieur': return interieurServices
      case 'exterieur': return exterieurServices
      case 'full': return fullServices
      default: return interieurServices
    }
  }

  return (
    <div className="pt-20 pb-0 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">Onze Diensten</h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-3xl mx-auto">Professionele auto detailing diensten op maat.</p>
        </motion.div>

        <div className="flex flex-col items-center gap-4 mb-12">
          <button onClick={() => setActiveCategory('full')} className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${activeCategory === 'full' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
            <FiShield /> Volledig Pakket
          </button>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setActiveCategory('interieur')} className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${activeCategory === 'interieur' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
              <FiHome /> Interieur
            </button>
            <button onClick={() => setActiveCategory('exterieur')} className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${activeCategory === 'exterieur' ? 'bg-accent-red text-white' : 'bg-primary-dark text-light hover:bg-secondary-dark'}`}>
              <FiHome /> Exterieur
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {getCurrentServices().map((service, index) => (
            <PricingCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-accent-dark-red bg-opacity-10 border border-accent-red border-opacity-30 rounded-lg p-6 mb-12">
          <h3 className="text-xl font-bold text-accent-red mb-3">DISCLAIMER</h3>
          <p className="text-primary-dark text-sm opacity-90">
            Bovenstaande prijzen zijn inclusief 21% BTW, indicatief en kunnen variëren. Oversize wagens zoals busjes en trucks enkel op aanvraag.
          </p>
        </motion.div>
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
