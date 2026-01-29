/**
 * Image URLs from Unsplash - free to use, matches car detailing vibe
 * Photos: https://unsplash.com (attribution appreciated)
 */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  // Home - About section: professional car detailing, clean car
  homeAbout: unsplash('1656077940782-11c47aaefd0c', 900),

  // About page - Story: car wash/detailing
  aboutStory: unsplash('1656077885491-3922185f3932', 900),

  // Service cards (Interieur, Exterieur, Volledig)
  serviceInterieur: unsplash('1656077885491-3922185f3932', 600),
  // Exterieur: car exterior being cleaned (luxury car - clean exterior)
  serviceExterieur: unsplash('1549317661-b741d42a82f3', 600),
  serviceFull: unsplash('1682858110563-3f609263d418', 600),

  // New Car Coating - shiny luxury car
  newCarCoating: unsplash('1549317661-b741d42a82f3', 900),

  // Ceramic Coating - car polish/detailing
  ceramicCoating: unsplash('1492144534655-ae79c964c9d7', 900),

  // Quality section - professional car care products
  qualityProducts: unsplash('1558618666-fcd25c85cd64', 900),
}
