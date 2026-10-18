import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/brand/PageHero'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden | T&R Car Detail',
  description: 'Deze pagina bestaat niet. Ga terug naar de homepage van T&R Car Detail of neem contact op.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="bg-light min-h-screen pb-20">
      <PageHero eyebrow="404" title="Pagina niet gevonden" withRedPaper={false}>
        <p className="text-lg text-light/85 max-w-xl mx-auto">
          Deze pagina bestaat niet of is verplaatst.
        </p>
      </PageHero>
      <div className="container-custom flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">
          <Button variant="primary" size="lg">Naar home</Button>
        </Link>
        <Link href="/contact" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">
          <Button variant="outline" size="lg">Contact</Button>
        </Link>
      </div>
    </div>
  )
}
