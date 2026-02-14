'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCalendar, FiList } from 'react-icons/fi'
import Button from '../ui/Button'

const HERO_VIDEO_SOURCES = [
  '/videos/hero-video.mp4',
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL,
  'https://assets.mixkit.co/videos/47588/47588-720.mp4'
].filter(Boolean) as string[]

export default function Hero() {
  const [videoError, setVideoError] = useState(false)
  const [sourceIndex, setSourceIndex] = useState(0)
  const currentSrc = HERO_VIDEO_SOURCES[sourceIndex]

  const handleVideoError = () => {
    if (sourceIndex < HERO_VIDEO_SOURCES.length - 1) {
      setSourceIndex((i) => i + 1)
    } else {
      setVideoError(true)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-dark via-secondary-dark to-primary-dark" />
        {!videoError && currentSrc && (
          <video
            key={currentSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onError={handleVideoError}
          >
            <source src={currentSrc} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-primary-dark bg-opacity-60 z-10" />

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
          Professionele autoreiniging aan huis
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <FiCalendar className="w-5 h-5" />
              Boek Nu
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <FiList className="w-5 h-5" />
              Onze Diensten
            </Button>
          </Link>
        </div>
      </motion.div>

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
