'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiCalendar, FiList } from 'react-icons/fi'
import Button from '../ui/Button'
import TrackedBookLink from '../analytics/TrackedBookLink'
import Logo from '../brand/Logo'
import ServiceIcons from '../brand/ServiceIcons'
import Texture from '../brand/Texture'
import TornEdge from '../brand/TornEdge'

const HERO_VIDEO_SOURCES = [
  '/videos/hero-video.mp4',
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL,
  'https://assets.mixkit.co/videos/47588/47588-720.mp4'
].filter(Boolean) as string[]

const HERO_POSTER = '/images/hero-poster.webp'

/**
 * Hero in de stijl van Tristans T&R-banner: donkere gekreukte textuur, groot logo,
 * video in een gekanteld kader met gescheurd rood papier, service-iconen op een rode band.
 * Geen fade-in op de tekst (sneller LCP); de video laadt alleen metadata vooraf.
 */
export default function Hero() {
  const [videoError, setVideoError] = useState(false)
  const [sourceIndex, setSourceIndex] = useState(0)
  const currentSrc = HERO_VIDEO_SOURCES[sourceIndex]
  // Video pas laden na de page load (poster toont meteen hetzelfde beeld) → snellere LCP/minder bandbreedte op mobiel.
  const [loadVideo, setLoadVideo] = useState(false)
  useEffect(() => {
    const start = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
      if (ric) ric(() => setLoadVideo(true), { timeout: 2500 })
      else setTimeout(() => setLoadVideo(true), 1200)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [])

  const handleVideoError = () => {
    if (sourceIndex < HERO_VIDEO_SOURCES.length - 1) {
      setSourceIndex((i) => i + 1)
    } else {
      setVideoError(true)
    }
  }

  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <Texture priority />
      <div className="relative z-10 container-custom pt-12 pb-20 lg:pt-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div className="text-center lg:text-left">
          <Logo className="h-20 md:h-28 w-auto mx-auto lg:mx-0 mb-8" />
          <p className="text-accent-red font-brand font-bold uppercase tracking-[0.25em] text-xs md:text-sm mb-3">Precisiedetailing voor sportieve &amp; exclusieve wagens</p>
          <h1 className="text-light mb-5">Car cleaning &amp; detailing <span className="text-accent-red">Vlaanderen</span></h1>
          <p className="text-lg text-light/85 max-w-xl mx-auto lg:mx-0 mb-8">Professionele auto detailing voor een perfect resultaat. Mobiel aan huis vanuit Sint-Niklaas · Oost-Vlaanderen &amp; heel Vlaanderen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <TrackedBookLink href="/booking?from=hero" location="hero" className="inline-flex">
              <Button variant="primary" size="lg" className="pointer-events-none flex items-center gap-2 w-full sm:w-auto">
                <FiCalendar className="w-5 h-5" />
                Boek Nu
              </Button>
            </TrackedBookLink>
            <Link href="/services" className="inline-flex">
              <Button variant="outline" size="lg" className="pointer-events-none flex items-center gap-2 w-full sm:w-auto text-white border-white/80 hover:border-accent-red">
                <FiList className="w-5 h-5" />
                Bekijk pakketten
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- decoratief papier, geen LCP */}
          <img src="/brand/paper-red.png" alt="" width={879} height={624} loading="lazy" decoding="async" aria-hidden className="pointer-events-none absolute right-0 sm:-right-6 -bottom-8 w-[80%] h-auto rotate-6" />
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.6)] -rotate-2 bg-secondary-dark">
            <picture>
              <source media="(max-width: 768px)" srcSet="/images/hero-poster-mobile.avif" type="image/avif" />
              <source media="(max-width: 768px)" srcSet="/images/hero-poster-mobile.webp" type="image/webp" />
              <source srcSet="/images/hero-poster.avif" type="image/avif" />
              {/* Mobiele en desktopposter zijn al AVIF/WebP op de juiste maat. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero-poster.webp" alt="" aria-hidden width={1100} height={880} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            </picture>
            {loadVideo && !videoError && currentSrc && (
              <video
                key={currentSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={HERO_POSTER}
                className="absolute inset-0 w-full h-full object-cover"
                onError={handleVideoError}
                aria-hidden
              >
                <source src={currentSrc} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-brand">
              <span className="text-xs uppercase tracking-[0.25em]">Sint-Niklaas · Vlaanderen</span>
              <a href="tel:+32499128500" className="text-sm font-bold hover:text-accent-red">+32 499 12 85 00</a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-accent-red">
        <TornEdge position="top" color="#FF2E00" />
        <div className="container-custom py-6">
          <ServiceIcons className="max-w-3xl mx-auto [&_img]:brightness-0 [&_img]:invert [&_a>span:last-child]:!text-primary-dark [&_a:hover>span:last-child]:!text-primary-dark" />
        </div>
      </div>
    </section>
  )
}
