import Hero from '../components/sections/Hero'
import ServicesPreview from '../components/sections/ServicesPreview'
import { images } from '../utils/images'
import QualitySection from '../components/sections/QualitySection'
import SocialsSection from '../components/sections/SocialsSection'
import Testimonials from '../components/sections/Testimonials'
import { Link } from 'react-router-dom'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '../components/ui/Button'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* About Section */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                T&R Car Detailing
              </h2>
              <p className="text-lg text-primary-dark opacity-80 leading-relaxed">
                Bij T&R Car Detailing streven we ernaar om elke auto terug te brengen naar showroomkwaliteit. 
                Met jarenlange ervaring en een passie voor perfectie, bieden we professionele autoreiniging 
                diensten die uw voertuig de aandacht geven die het verdient. Onze ambitie is om de standaard 
                te zetten voor kwaliteit en service in de car detailing industrie.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 lg:h-96 bg-secondary-dark rounded-lg overflow-hidden"
            >
              <img
                src={images.homeAbout}
                alt="Professionele auto detailing"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <ServicesPreview />

      <QualitySection />

      <SocialsSection />

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-red to-accent-dark-red">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Klaar om uw Auto te Laten Detailen?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Neem contact op of boek direct een afspraak
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  <FiCalendar className="w-5 h-5" />
                  Boek Nu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-accent-red flex items-center gap-2">
                  <FiMail className="w-5 h-5" />
                  Contact
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
