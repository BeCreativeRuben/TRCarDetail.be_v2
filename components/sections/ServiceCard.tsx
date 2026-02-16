'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Service } from '@/lib/types'
import { images } from '@/lib/images'

type ServiceCategory = 'interieur' | 'exterieur' | 'full' | 'polieren'

function getCategoryFromServiceId(id: string): ServiceCategory {
  if (id.startsWith('interieur')) return 'interieur'
  if (id.startsWith('exterieur')) return 'exterieur'
  if (id.startsWith('polijsten')) return 'polieren'
  return 'full'
}

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const img = service.id.startsWith('interieur') ? images.serviceInterieur : service.id.startsWith('exterieur') ? images.serviceExterieur : images.serviceFull
  const category = getCategoryFromServiceId(service.id)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/services?category=${category}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-secondary-dark aspect-[3/4] cursor-pointer">
          <img
            src={img}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent pt-12 pb-4 px-4">
              <h3 className="text-xl md:text-2xl font-bold text-light text-center mb-0 transition-all duration-300 group-hover:mb-3">
                {service.name}
              </h3>
              <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-300 ease-in-out">
                <p className="text-sm text-light text-center leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
