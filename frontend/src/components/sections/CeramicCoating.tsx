import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function CeramicCoating() {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
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
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <p>Afbeelding placeholder</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              CARPRO CQUARTZ
              <span className="block text-accent-red">FINEST RESERVE</span>
            </h2>
            <p className="text-lg text-light opacity-90 mb-6">
              T&R Car Detail is een gecertificeerd installateur van CARPRO C.Quartz Finest Reserve. 
              Wij hebben de exclusiviteit jouw wagen te beschermen met de beste keramische coating op de huidige markt! 
              Deze glascoating heeft een levensduur van 2 tot 3 jaar, zorgt voor een extreme glans en is enorm vuil- en waterafstotend!
            </p>
            <Link to="/services">
              <Button variant="primary" size="md">
                Bekijk Behandelingen
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
