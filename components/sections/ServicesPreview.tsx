import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { Service } from '@/lib/types'
import ServiceCard from './ServiceCard'
import Button from '../ui/Button'

const services: Service[] = [
  { id: 'interieur-basis', name: 'Interieur', description: 'Basis, Deluxe en Premium interieurreiniging', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'exterieur-basis', name: 'Exterieur', description: 'Basis en Deluxe exterieurreiniging', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'full-basis', name: 'Volledig Pakket', description: 'Exterieur + interieur basis in één', basePrice: 0, largeCarSurcharge: 0, features: [] },
]

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">Onze Diensten</h2>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">Professionele autoreiniging met de beste producten en technieken</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/services">
            <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
              Bekijk Alle Diensten
              <FiArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
