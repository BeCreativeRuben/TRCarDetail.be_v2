import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { images } from '../../utils/images'

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
            className="relative h-96 bg-secondary-dark rounded-lg overflow-hidden"
          >
            <img
              src={images.ceramicCoating}
              alt="CARPRO CQuartz keramische coating"
              className="w-full h-full object-cover"
            />
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
