import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Service } from '../types'
import PricingCard from '../components/sections/PricingCard'
import Button from '../components/ui/Button'
import { motion } from 'framer-motion'
import { FiCalendar, FiHome, FiShield } from 'react-icons/fi'

type ServiceCategory = 'interieur' | 'exterieur' | 'full'

const interieurServices: Service[] = [
  {
    id: 'interieur-basic',
    name: 'Interieur Basic',
    description: 'Basis interieurreiniging voor regelmatig onderhoud',
    basePrice: 95,
    largeCarSurcharge: 15,
    features: [
      'Interieur stofzuigen',
      'Interieur afstoffen',
      'Reinigen ramen en spiegels',
      'Dashboard reiniging',
      'Basis interieur verzorging'
    ]
  },
  {
    id: 'interieur-deepclean',
    name: 'Interieur DeepClean',
    description: 'Grondige dieptereiniging van het interieur',
    basePrice: 175,
    largeCarSurcharge: 25,
    popular: true,
    features: [
      'Alle basis interieur features',
      'Dieptereiniging van bekleding',
      'Reinigen van alle oppervlakken',
      'Lederverzorging (indien van toepassing)',
      'Geurbehandeling',
      'Professionele interieur detail behandeling'
    ]
  }
]

const exterieurServices: Service[] = [
  {
    id: 'exterieur-basic',
    name: 'Exterieur Basic',
    description: 'Basis exterieurreiniging met professionele producten',
    basePrice: 95,
    largeCarSurcharge: 15,
    features: [
      'Krasvrije wasbeurt (2 emmer methode)',
      'Reinigen deurstijlen en instaplijsten',
      'Reinigen velgen, banden en wielkasten',
      'Drogen met warme lucht en zachte microvezel',
      'Spraywax of sealant',
      'Bandendressing'
    ]
  },
  {
    id: 'exterieur-premium',
    name: 'Exterieur Premium',
    description: 'Dieptereiniging met teer- en vliegroest verwijdering',
    basePrice: 125,
    largeCarSurcharge: 25,
    features: [
      'Alle basis exterieur features',
      'Teer en vliegroest verwijderen',
      'Kleibehandeling*',
      'Extra lakbescherming',
      'Professionele exterieur detail behandeling'
    ]
  }
]

const fullServices: Service[] = [
  {
    id: 'full-basic',
    name: 'Full Package Basic',
    description: 'Complete reiniging inclusief basis interieur en exterieur',
    basePrice: 175,
    largeCarSurcharge: 25,
    popular: true,
    features: [
      'Alle exterieur basic features',
      'Alle interieur basic features',
      'Complete auto reiniging',
      'Professionele afwerking'
    ]
  },
  {
    id: 'full-premium',
    name: 'Full Package Premium',
    description: 'Complete dieptereiniging interieur en exterieur',
    basePrice: 275,
    largeCarSurcharge: 40,
    features: [
      'Alle exterieur premium features',
      'Alle interieur deepclean features',
      'Complete auto dieptereiniging',
      'Maximale verzorging en bescherming',
      'Professionele premium behandeling'
    ]
  }
]

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('interieur')

  const getCurrentServices = () => {
    switch (activeCategory) {
      case 'interieur':
        return interieurServices
      case 'exterieur':
        return exterieurServices
      case 'full':
        return fullServices
      default:
        return interieurServices
    }
  }

  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
            Onze Diensten
          </h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-3xl mx-auto">
            Professionele auto detailing diensten op maat. Kies uit onze verschillende pakketten of laat een programma op maat samenstellen.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('interieur')}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2
              ${activeCategory === 'interieur'
                ? 'bg-accent-red text-white'
                : 'bg-primary-dark text-light hover:bg-secondary-dark'
              }
            `}
          >
            <FiHome />
            Interieur
          </button>
          <button
            onClick={() => setActiveCategory('exterieur')}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2
              ${activeCategory === 'exterieur'
                ? 'bg-accent-red text-white'
                : 'bg-primary-dark text-light hover:bg-secondary-dark'
              }
            `}
          >
            <FiHome />
            Exterieur
          </button>
          <button
            onClick={() => setActiveCategory('full')}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2
              ${activeCategory === 'full'
                ? 'bg-accent-red text-white'
                : 'bg-primary-dark text-light hover:bg-secondary-dark'
              }
            `}
          >
            <FiShield />
            Volledig Pakket
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {getCurrentServices().map((service, index) => (
            <PricingCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary-dark rounded-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-light mb-6">
            Professionele autoreiniging
          </h2>
          <p className="text-light opacity-90 mb-4">
            Wij maken gebruik van professionele producten en technieken om jouw wagen met de juiste zorg te reinigen. 
            Iedere wagen wordt gereinigd met een contactloze voorwas, gevolgd door een veilige handwas volgens de 
            '2-emmer methode'. Dit is een techniek die wordt gebruikt om jouw auto krasvrij en grondig schoon te maken. 
            Bij deze methode worden twee emmers gebruikt: één voor shampoowater (pH-neutraal) en één voor het spoelen 
            van onze washandschoen. Dit helpt om te voorkomen dat vuil tijdens het wassen opnieuw op de lak terechtkomt.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-accent-dark-red bg-opacity-10 border border-accent-red border-opacity-30 rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-accent-red mb-3">DISCLAIMER</h3>
          <p className="text-primary-dark text-sm opacity-90">
            Bovenstaande prijzen zijn inclusief 21% BTW, indicatief en kunnen variëren afhankelijk van de grootte, 
            de staat, vervuiling en complexiteit van de wagen. Oversize wagens zoals busjes en trucks enkel op aanvraag. 
            Elke wagen op zich is uniek en heeft nood aan een andere aanpak of langere tijdsduur. Voor een exacte prijsopgave 
            neem je best contact op of bezoek je vrijblijvend onze winkel.
          </p>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/booking">
            <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
              <FiCalendar className="w-5 h-5" />
              Boek Nu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
