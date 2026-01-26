import { motion } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import Button from '../ui/Button'

export default function Webshop() {
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
              <FiShoppingBag className="w-32 h-32 mx-auto mb-4" />
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
              AUTO DETAILING WINKEL & WEBSHOP
            </h2>
            <p className="text-lg text-light opacity-90 mb-6">
              Ontdek ons uitgebreid assortiment aan auto poetsproducten van bekende topmerken! 
              In onze fysieke winkel en online kan je terecht voor de aankoop van de beste car detailing producten, 
              accessoires en machines zoals hogedrukreinigers en polijstmachines.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md">
                Bezoek Onze Webshop
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
