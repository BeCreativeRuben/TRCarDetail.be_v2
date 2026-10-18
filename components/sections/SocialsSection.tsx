'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiInstagram, FiPlay, FiLayers } from 'react-icons/fi'
import Button from '../ui/Button'
import { instagram } from '@/lib/socials'
import type { InstagramPost } from '@/lib/behold'
import { CONSENT_CHANGE_EVENT, readConsent } from '@/lib/consent'

type Props = {
  /** Live posts uit de Behold-feed; null/leeg → vaste shortcodes (iframe-embeds). */
  posts?: InstagramPost[] | null
}

export default function SocialsSection({ posts = null }: Props) {
  const shortcodes = instagram.postShortcodes
  const livePosts = posts && posts.length > 0 ? posts : null
  const [marketing, setMarketing] = useState(false)
  useEffect(() => {
    const sync = () => setMarketing(Boolean(readConsent()?.marketing))
    sync()
    window.addEventListener(CONSENT_CHANGE_EVENT, sync)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync)
  }, [])

  return (
    <section id="realisaties" className="py-20 bg-light scroll-mt-20">
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
              Blijf op de hoogte van onze laatste projecten, voor & na foto&apos;s en exclusieve acties.
            </p>
            <a href={instagram.url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="flex items-center gap-2 w-fit">
                <FiInstagram className="w-5 h-5" />
                Volg ons op Instagram
              </Button>
            </a>
          </motion.div>
          <motion.a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary-dark rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[280px] hover:opacity-95 transition-opacity block"
          >
            <FiInstagram className="w-24 h-24 mb-6 text-accent-red" />
            <p className="text-light opacity-80 text-sm mb-4">@{instagram.handle}</p>
            <p className="text-light opacity-70 text-sm">Ontdek onze laatste werkzaamheden en resultaten</p>
          </motion.a>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold text-primary-dark mb-8 text-center">Laatste posts</h3>
          {livePosts ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {livePosts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-primary-dark shadow-lg"
                  aria-label={`Bekijk post op Instagram: ${post.alt}`}
                >
                  {/* Behold levert al geoptimaliseerde webp's via CDN → geen Next-image-optimalisatie nodig */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.alt}
                    width={post.width}
                    height={post.height}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {(post.mediaType === 'VIDEO' || post.mediaType === 'CAROUSEL_ALBUM') && (
                    <span className="absolute top-3 right-3 rounded-full bg-primary-dark/70 p-2 text-light">
                      {post.mediaType === 'VIDEO' ? <FiPlay className="w-4 h-4" /> : <FiLayers className="w-4 h-4" />}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-primary-dark/0 transition-colors group-hover:bg-primary-dark/50">
                    <FiInstagram className="w-10 h-10 text-light opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketing
                ? shortcodes.map((shortcode, index) => (
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
                  ))
                : shortcodes.map((shortcode) => (
                    <a
                      key={shortcode}
                      href={`https://www.instagram.com/p/${shortcode}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-44 items-center justify-center rounded-lg bg-primary-dark p-6 text-center text-light"
                    >
                      <span>
                        <FiInstagram className="mx-auto mb-3 h-8 w-8 text-accent-red" aria-hidden />
                        Bekijk deze post op Instagram
                      </span>
                    </a>
                  ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
