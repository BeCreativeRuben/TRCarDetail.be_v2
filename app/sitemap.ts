import type { MetadataRoute } from 'next'
import { SITE_URL, SITEMAP_PATHS } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
