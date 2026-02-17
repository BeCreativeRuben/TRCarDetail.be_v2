/**
 * Image URLs from Unsplash - free to use, matches car detailing vibe
 */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  homeAbout: '/images/home-about.webp',
  aboutStory: 'https://placehold.co/1200x384/1a1a1a/888?text=Car+detailing+workshop',
  serviceInterieur: '/images/service-interieur.webp',
  serviceExterieur: '/images/service-exterieur.webp',
  serviceFull: '/images/service-full.webp',
  servicePolieren: '/images/service-polieren.webp',
  newCarCoating: unsplash('1552519507-da3b142c6e3d', 900),
  ceramicCoating: unsplash('1492144534655-ae79c964c9d7', 900),
  qualityProducts: '/images/quality-products.webp',
  aandachtDetail: '/images/aandacht-detail.webp',
}
