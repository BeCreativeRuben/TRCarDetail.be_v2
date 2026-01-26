import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Service } from '../../types'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover className="h-full flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-primary-dark mb-3">{service.name}</h3>
          <p className="text-primary-dark mb-4 opacity-80">{service.description}</p>
          {service.basePrice > 0 && (
            <div className="mb-4">
              <span className="text-3xl font-bold text-accent-red">€{service.basePrice}</span>
              {service.largeCarSurcharge > 0 && (
                <span className="text-primary-dark ml-2 opacity-70">Grote wagen +€{service.largeCarSurcharge}</span>
              )}
            </div>
          )}
          {service.basePrice === 0 && (
            <div className="mb-4">
              <span className="text-lg text-primary-dark opacity-70">Vanaf €95</span>
            </div>
          )}
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-primary-dark opacity-80">
                <span className="text-accent-red mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/services">
          <Button variant="outline" size="sm" className="w-full">
            Meer Info
          </Button>
        </Link>
      </Card>
    </motion.div>
  )
}
