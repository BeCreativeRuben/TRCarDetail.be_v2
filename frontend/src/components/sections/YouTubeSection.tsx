import { motion } from 'framer-motion'
import { FiYoutube } from 'react-icons/fi'
import Button from '../ui/Button'

export default function YouTubeSection() {
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              ABONNEER JE OP ONS
              <span className="block text-accent-red">YOUTUBE KANAAL!</span>
            </h2>
            <p className="text-lg text-primary-dark opacity-80 mb-6">
              Abonneer je op ons YouTube kanaal en blijf up-to-date met onze laatste projecten, acties en zoveel meer! 
              Met meer dan 480.000 abonnees en 400+ video's zijn we één van de grootste YouTube kanalen binnen de detailing wereld! 
              We uploaden wekelijks nieuwe video's van onze auto detailing behandelingen.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md">
                Abonneren
              </Button>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary-dark rounded-lg p-8 text-center"
          >
            <FiYoutube className="w-24 h-24 mx-auto mb-6 text-accent-red" />
            <div className="mb-4">
              <p className="text-light opacity-70 text-sm mb-2">YouTube Subscribers</p>
              <p className="text-5xl font-bold text-light">461,123</p>
            </div>
            <p className="text-light opacity-80 text-sm">
              De beste kwaliteit, de beste merken.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
