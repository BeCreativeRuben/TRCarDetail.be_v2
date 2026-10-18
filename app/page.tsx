import HomePage from '@/components/HomePage'
import JsonLd from '@/components/seo/JsonLd'
import { buildOfferCatalogJsonLd, pageMetadata } from '@/lib/seo'
import { getInstagramPosts } from '@/lib/behold'

export const metadata = pageMetadata.home

export default async function Page() {
  // Behold JSON-feed (server-side, ISR 1u). null → vaste fallback-posts.
  const instagramPosts = await getInstagramPosts()

  return (
    <>
      <JsonLd data={buildOfferCatalogJsonLd()} />
      <HomePage instagramPosts={instagramPosts} />
    </>
  )
}
