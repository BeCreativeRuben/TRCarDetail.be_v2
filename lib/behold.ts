/**
 * Instagram-feed via Behold (https://behold.so) JSON feed.
 *
 * Zet BEHOLD_FEED_URL (server-only) op de feed-URL uit het Behold-dashboard,
 * bv. https://feeds.behold.so/XXXXXXXXXXXXXXXXXXXX
 *
 * Ontbreekt de env var of faalt de fetch, dan geven we `null` terug en valt
 * SocialsSection terug op de vaste shortcodes (lib/socials.ts).
 *
 * Views: Behold telt elke request naar de feed-URL als 1 view (free plan: 1.200/maand).
 * Door server-side te fetchen met revalidate = 1 uur blijven we ruim onder de limiet
 * (max ~720 requests/maand), ongeacht hoeveel bezoekers de site heeft.
 */

export const BEHOLD_REVALIDATE_SECONDS = 3600
const DEFAULT_LIMIT = 3
const FETCH_TIMEOUT_MS = 5000

export type InstagramPost = {
  id: string
  permalink: string
  imageUrl: string
  width: number
  height: number
  alt: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  isReel: boolean
  timestamp: string
}

type BeholdSize = { mediaUrl?: string; width?: number; height?: number }
type BeholdPost = {
  id?: string
  permalink?: string
  mediaType?: string
  mediaUrl?: string
  thumbnailUrl?: string
  isReel?: boolean
  timestamp?: string
  altText?: string
  prunedCaption?: string
  caption?: string
  sizes?: { small?: BeholdSize; medium?: BeholdSize; large?: BeholdSize; full?: BeholdSize }
}

function toPost(p: BeholdPost): InstagramPost | null {
  if (!p?.id || !p.permalink) return null
  const size = p.sizes?.large ?? p.sizes?.medium ?? p.sizes?.full ?? p.sizes?.small
  // Behold-CDN-afbeeldingen (webp) hebben de voorkeur; mediaUrl van Instagram verloopt.
  const imageUrl = size?.mediaUrl ?? (p.mediaType === 'VIDEO' ? p.thumbnailUrl : p.mediaUrl)
  if (!imageUrl) return null
  const caption = (p.altText || p.prunedCaption || p.caption || '').trim()
  const mediaType =
    p.mediaType === 'VIDEO' || p.mediaType === 'CAROUSEL_ALBUM' ? p.mediaType : 'IMAGE'
  return {
    id: p.id,
    permalink: p.permalink,
    imageUrl,
    width: size?.width ?? 1000,
    height: size?.height ?? 1000,
    alt: caption ? caption.slice(0, 160) : 'Instagram-post van T&R Car Detail',
    mediaType,
    isReel: Boolean(p.isReel),
    timestamp: p.timestamp ?? '',
  }
}

/** Haalt de laatste Instagram-posts op via Behold. `null` = niet geconfigureerd of fout → fallback. */
export async function getInstagramPosts(limit = DEFAULT_LIMIT): Promise<InstagramPost[] | null> {
  const feedUrl = process.env.BEHOLD_FEED_URL?.trim()
  if (!feedUrl) return null

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: BEHOLD_REVALIDATE_SECONDS, tags: ['instagram-feed'] },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    if (!res.ok) {
      console.warn(`[behold] feed request failed: ${res.status}`)
      return null
    }
    const data: unknown = await res.json()
    // v2-feeds: { posts: [...] }; oudere v1-feeds: [...]
    const raw = Array.isArray(data)
      ? data
      : Array.isArray((data as { posts?: unknown })?.posts)
        ? (data as { posts: unknown[] }).posts
        : []
    const posts = (raw as BeholdPost[])
      .map(toPost)
      .filter((p): p is InstagramPost => p !== null)
      .slice(0, limit)
    return posts.length > 0 ? posts : null
  } catch (e) {
    console.warn('[behold] feed fetch error:', e instanceof Error ? e.message : e)
    return null
  }
}
