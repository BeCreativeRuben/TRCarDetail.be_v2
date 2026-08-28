'use client'

import Link from 'next/link'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import { Service } from '@/lib/types'
import ServiceCard from './ServiceCard'
import Button from '../ui/Button'
import TrackedBookLink from '../analytics/TrackedBookLink'

const services: Service[] = [
  { id: 'interieur-basis', name: 'Interieur', description: 'Basis, Deluxe en Premium interieurreiniging', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'exterieur-basis', name: 'Exterieur', description: 'Basis en Deluxe exterieurreiniging', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'full-basis', name: 'Volledig Pakket', description: 'Basis-, Deluxe- en Premium-pakket, plus combinaties op maat (richtprijs in boeking)', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'extra-overzicht', name: 'Extra\'s', description: 'Wax, bodemreiniging, glascoating, hondenharen, motorruimte', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'polijsten-light', name: 'Polieren', description: 'Light Polish en Full Polish – lakcorrectie en glansherstel', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'coating-basis', name: 'Keramische Coating', description: 'Langdurige bescherming en diepe glans – professioneel aangebracht aan huis', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'moto-detailing', name: 'Moto', description: 'Binnenkort: professionele moto- en motordetailing', basePrice: 0, largeCarSurcharge: 0, features: [], comingSoon: true },
]

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">Onze Diensten</h2>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">
            Kies een pakket en boek direct online — car detailing aan huis in Vlaanderen.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <TrackedBookLink href="/booking?from=home_services" location="home_services">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <FiCalendar className="w-5 h-5" />
              Direct boeken
            </Button>
          </TrackedBookLink>
          <Link href="/services">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              Bekijk Alle Diensten
              <FiArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
