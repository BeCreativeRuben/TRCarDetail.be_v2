import Hero from '../components/sections/Hero'
import ServicesPreview from '../components/sections/ServicesPreview'
import Webshop from '../components/sections/Webshop'
import YouTubeSection from '../components/sections/YouTubeSection'
import Testimonials from '../components/sections/Testimonials'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Hero />
      
      <ServicesPreview />

      <Webshop />

      <YouTubeSection />

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
              Klaar om uw Auto te Laten Detailing?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Neem contact op of boek direct een afspraak
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="secondary" size="lg">
                  🚗 Boek Nu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-accent-red">
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
