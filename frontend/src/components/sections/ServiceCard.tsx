import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Service } from '../../types'

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
      className="group"
    >
      <Link to="/services" className="block">
        <div className="relative overflow-hidden rounded-lg bg-secondary-dark aspect-[3/4] cursor-pointer">
          {/* Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark via-primary-dark to-secondary-dark flex items-center justify-center">
            <div className="text-center text-light opacity-30">
              <svg
                className="w-24 h-24 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Bottom Section with Title and Description */}
          <div className="absolute bottom-0 left-0 right-0">
            {/* Gradient overlay for text readability */}
            <div className="bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent pt-12 pb-4 px-4">
              {/* Service Name - Always visible at bottom */}
              <h3 className="text-xl md:text-2xl font-bold text-light text-center mb-0 transition-all duration-300 group-hover:mb-3">
                {service.name}
              </h3>
              
              {/* Description - Appears on hover, slides up from under title */}
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
