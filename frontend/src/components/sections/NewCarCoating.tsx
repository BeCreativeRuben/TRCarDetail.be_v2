import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { images } from '../../utils/images'

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
            className="relative h-96 bg-secondary-dark rounded-lg overflow-hidden"
          >
            <img
              src={images.newCarCoating}
              alt="Keramische coating op nieuwe auto"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
