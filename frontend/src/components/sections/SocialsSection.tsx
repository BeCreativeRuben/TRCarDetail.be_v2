import { motion } from 'framer-motion'
import { FiInstagram } from 'react-icons/fi'
import Button from '../ui/Button'

// Update these with your Instagram handle and post shortcodes.
// To get a post shortcode: open any Instagram post, copy the URL.
// Example: https://www.instagram.com/p/ABC123xyz/ → shortcode is "ABC123xyz"
const INSTAGRAM_HANDLE = 'trcardetail'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
const INSTAGRAM_POST_SHORTCODES = [
  'C1ABC123', // Replace with your latest post shortcode
  'C2DEF456', // Replace with your 2nd latest post shortcode
  'C3GHI789', // Replace with your 3rd latest post shortcode
]

export default function SocialsSection() {
  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              VOLG ONS OP
              <span className="block text-accent-red">INSTAGRAM</span>
            </h2>
            <p className="text-lg text-primary-dark opacity-80 mb-6">
              Blijf op de hoogte van onze laatste projecten, voor & na foto's en exclusieve acties. 
              Volg ons op Instagram voor een kijkje achter de schermen bij T&R Car Detailing.
            </p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="flex items-center gap-2 w-fit">
                <FiInstagram className="w-5 h-5" />
                Volg ons op Instagram
              </Button>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary-dark rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[280px]"
          >
            <FiInstagram className="w-24 h-24 mb-6 text-accent-red" />
            <p className="text-light opacity-80 text-sm mb-4">
              @{INSTAGRAM_HANDLE}
            </p>
            <p className="text-light opacity-70 text-sm">
              Ontdek onze laatste werkzaamheden en resultaten
            </p>
          </motion.div>
        </div>

        {/* Instagram Post Embeds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-primary-dark mb-8 text-center">
            Laatste posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSTAGRAM_POST_SHORTCODES.map((shortcode, index) => (
              <motion.div
                key={shortcode}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <div className="w-full min-h-[480px] sm:min-h-[540px]">
                  <iframe
                    src={`https://www.instagram.com/p/${shortcode}/embed`}
                    className="w-full h-full min-h-[480px] sm:min-h-[540px] border-0"
                    allowFullScreen
                    loading="lazy"
                    title={`Instagram post ${index + 1}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
