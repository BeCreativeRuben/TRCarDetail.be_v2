import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function Hero() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Fallback */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient background - always visible as background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-dark via-secondary-dark to-primary-dark" />
        {/* Video overlay - shows on top if available */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-dark bg-opacity-60 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-light mb-4 tracking-wider">
          CAR CLEANING & DETAILING
          <span className="block text-accent-red">VLAANDEREN</span>
        </h1>
        <p className="text-xl md:text-2xl text-light mb-8 max-w-2xl mx-auto">
          Professionele autoreiniging
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/booking">
            <Button variant="primary" size="lg">
              🚗 Boek Nu
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" size="lg">
              ✨ Onze Diensten
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-light rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-light rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
