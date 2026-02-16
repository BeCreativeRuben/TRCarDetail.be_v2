/**
 * Image URLs from Unsplash - free to use, matches car detailing vibe
 */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  homeAbout: unsplash('1656077940782-11c47aaefd0c', 900),
  aboutStory: unsplash('1552519507-da3b142c6e3d', 900),
  serviceInterieur: unsplash('1552519507-da3b142c6e3d', 600),
  serviceExterieur: unsplash('1552519507-da3b142c6e3d', 600),
  serviceFull: unsplash('1682858110563-3f609263d418', 600),
  newCarCoating: unsplash('1552519507-da3b142c6e3d', 900),
  ceramicCoating: unsplash('1492144534655-ae79c964c9d7', 900),
  qualityProducts: unsplash('1558618666-fcd25c85cd64', 900),
}
