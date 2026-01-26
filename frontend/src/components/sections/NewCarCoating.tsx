import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function NewCarCoating() {
  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
              NIEUWE AUTO
              <span className="block text-accent-red">COATEN</span>
            </h2>
            <p className="text-lg text-primary-dark opacity-80 mb-6">
              Bescherm je nieuwe auto met een keramische coating en geniet van een ongekend gemak in onderhoud, 
              enorme glans en jarenlange bescherming! Met een ceramic coating behoudt je jouw auto in absolute topstaat!
            </p>
            <Link to="/services">
              <Button variant="primary" size="md">
                Bekijk Behandelingen
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 bg-secondary-dark rounded-lg flex items-center justify-center"
          >
            <div className="text-center text-light opacity-50">
              <svg
                className="w-32 h-32 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <p>Afbeelding placeholder</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
