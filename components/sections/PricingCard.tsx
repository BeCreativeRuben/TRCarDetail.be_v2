'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Service } from '@/lib/types'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { FiCalendar } from 'react-icons/fi'

interface PricingCardProps {
  service: Service
  index: number
}

export default function PricingCard({ service, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full flex"
    >
      <Card className={`overflow-hidden flex flex-col h-full min-h-full ${service.popular ? 'ring-2 ring-accent-red' : ''}`}>
        {service.popular && (
          <div className="bg-accent-red text-white text-center py-2 text-sm font-semibold mb-4 -mx-6 -mt-6">
            Meest Populair
          </div>
        )}
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-2xl font-bold text-primary-dark mb-2">{service.name}</h3>
          {service.basePrice > 0 ? (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-accent-red">€{service.basePrice}</span>
              {service.largeCarSurcharge > 0 && (
                <span className="text-primary-dark opacity-70">Grote wagen +€{service.largeCarSurcharge}</span>
              )}
            </div>
          ) : (
            <span className="text-lg text-primary-dark opacity-70">Prijzen op aanvraag</span>
          )}
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto mb-4">
          <p className="text-primary-dark opacity-80 mb-4">{service.description}</p>
          <div className="space-y-2">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-start text-sm text-primary-dark opacity-80">
              <span className="text-accent-red mr-2 mt-1">✓</span>
              <span>{feature}</span>
            </div>
          ))}
          </div>
        </div>
        <Link href={`/booking?service=${service.id}`} className="block mt-auto flex-shrink-0">
          <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
            <FiCalendar className="w-4 h-4" />
            Boek dit pakket
          </Button>
        </Link>
      </Card>
    </motion.div>
  )
}
