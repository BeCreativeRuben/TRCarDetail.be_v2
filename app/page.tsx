import HomePage from '@/components/HomePage'
import JsonLd from '@/components/seo/JsonLd'
import { buildOfferCatalogJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata.home

export default function Page() {
  return (
    <>
      <JsonLd data={buildOfferCatalogJsonLd()} />
      <HomePage />
    </>
  )
}
