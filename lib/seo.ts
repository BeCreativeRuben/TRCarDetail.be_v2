import type { Metadata } from 'next'
import { GOOGLE_MAPS_REVIEW_URL } from '@/lib/socials'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trcardetail.be').replace(/\/$/, '')

export const SITE_NAME = 'T&R Car Detail'

export const BUSINESS = {
  name: SITE_NAME,
  tagline: 'Professionele autoreiniging aan huis',
  phone: '+32499128500',
  phoneDisplay: '+32 499 12 85 00',
  email: 'info@trcardetail.be',
  address: {
    streetAddress: 'Heidebloemstraat 66 Bus 11',
    addressLocality: 'Sint-Niklaas',
    postalCode: '9100',
    addressRegion: 'Oost-Vlaanderen',
    addressCountry: 'BE',
  },
  geo: {
    latitude: 51.1657,
    longitude: 4.1397,
  },
  areaServed: [
    'Vlaanderen',
    'Oost-Vlaanderen',
    'Sint-Niklaas',
    'Gent',
    'Antwerpen',
    'Mechelen',
    'Leuven',
    'Brugge',
    'Aalst',
    'Dendermonde',
  ],
  googleMapsReviewUrl: GOOGLE_MAPS_REVIEW_URL,
} as const

const DEFAULT_KEYWORDS = [
  'car detailing Vlaanderen',
  'auto detailing Vlaanderen',
  'car detailing aan huis',
  'autoreiniging Vlaanderen',
  'mobiele car detailing',
  'auto detailing Sint-Niklaas',
  'car detailing Oost-Vlaanderen',
  'interieur reiniging auto',
  'exterieur reiniging auto',
  'T&R Car Detail',
]

type PageMetaInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...DEFAULT_KEYWORDS],
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'nl_BE',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/logo.jpg`,
          width: 1200,
          height: 1200,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}/logo.jpg`],
    },
  }
}

export const pageMetadata = {
  home: createPageMetadata({
    title: 'Car Detailing Vlaanderen – Autoreiniging aan Huis',
    description:
      'Boek car detailing aan huis in Vlaanderen. T&R Car Detail vanuit Sint-Niklaas: interieur, exterieur en volledige pakketten. Online afspraak in een paar stappen.',
    path: '/',
    keywords: ['car cleaning Vlaanderen', 'detailing aan huis België', 'car detailing boeken'],
  }),
  about: createPageMetadata({
    title: 'Over Ons – Car Detailing Team in Vlaanderen',
    description:
      'Leer T&R Car Detail kennen: ervaren team voor auto detailing in Vlaanderen. Showroomkwaliteit, aan huis, vanuit Sint-Niklaas.',
    path: '/about',
  }),
  services: createPageMetadata({
    title: 'Diensten – Auto Detailing & Car Cleaning Vlaanderen',
    description:
      'Bekijk pakketten en boek direct online. Interieur, exterieur, polieren en extra\'s — car detailing aan huis in Vlaanderen.',
    path: '/services',
    keywords: ['auto detailing pakketten', 'interieur detailing', 'exterieur detailing', 'car detailing boeken'],
  }),
  booking: createPageMetadata({
    title: 'Boek Uw Afspraak – Car Detailing aan Huis Vlaanderen',
    description:
      'Boek hier uw car detailing aan huis in Vlaanderen. Kies pakket, datum en tijd — wij komen naar u toe vanuit Sint-Niklaas (Oost-Vlaanderen).',
    path: '/booking',
    keywords: ['car detailing boeken', 'afspraak autoreiniging', 'car detailing Vlaanderen boeken'],
  }),
  contact: createPageMetadata({
    title: 'Contact – Car Detailing Sint-Niklaas & Vlaanderen',
    description:
      'Neem contact op met T&R Car Detail. Heidebloemstraat 66, 9100 Sint-Niklaas. Car detailing aan huis in Vlaanderen – bel, mail of boek online.',
    path: '/contact',
    keywords: ['car detailing Sint-Niklaas contact'],
  }),
  faq: createPageMetadata({
    title: 'Veelgestelde Vragen – Car Detailing Vlaanderen',
    description:
      'Antwoorden over prijzen, duur, afspraken en werkwijze van onze car detailing diensten aan huis in Vlaanderen.',
    path: '/faq',
  }),
  privacy: createPageMetadata({
    title: 'Privacyvoorwaarden',
    description:
      'Privacy en cookiegebruik op de website van T&R Car Detail. We gebruiken Google Analytics voor anonieme statistieken.',
    path: '/privacy',
    noIndex: true,
  }),
  zakelijk: createPageMetadata({
    title: 'Zakelijk – Vlootdetailing Vlaanderen',
    description:
      'Car detailing voor bedrijven en fleets in Vlaanderen. Op uw parking of werflocatie: minder stilstand, herhaalbare kwaliteit, één aanspreekpunt. Vraag een offerte.',
    path: '/zakelijk',
    keywords: [
      'vloot detailing',
      'fleet car detailing Vlaanderen',
      'bedrijfswagens reinigen',
      'zakelijk car detailing',
      'fleet detailing Sint-Niklaas',
    ],
  }),
  zakelijkAanbod: createPageMetadata({
    title: 'Aanbod Zakelijk – Fleet Detailing',
    description:
      'Wat T&R Car Detail biedt voor bedrijfswagens: interieur, exterieur en periodiek onderhoud van uw vloot — op locatie in Vlaanderen. Offerte op maat.',
    path: '/zakelijk/aanbod',
    keywords: ['fleet detailing aanbod', 'bedrijfswagen detailing', 'periodieke autoreiniging vloot'],
  }),
  zakelijkOfferte: createPageMetadata({
    title: 'Offerte Vlootdetailing – Zakelijk',
    description:
      'Vraag een offerte voor car detailing van uw bedrijfswagenvloot. Vermeld vlootomvang en locatie — wij nemen contact op vanuit Sint-Niklaas.',
    path: '/zakelijk/offerte',
    keywords: ['offerte fleet detailing', 'vloot reinigen offerte'],
  }),
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description:
      'Professionele car detailing en autoreiniging aan huis in Vlaanderen. Interieur, exterieur, polieren en volledige pakketten.',
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    image: `${SITE_URL}/logo.jpg`,
    logo: `${SITE_URL}/logo.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      postalCode: BUSINESS.address.postalCode,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    serviceType: [
      'Car detailing',
      'Auto detailing',
      'Interieur reiniging',
      'Exterieur reiniging',
      'Autoreiniging aan huis',
      'Mobiele car detailing',
    ],
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '18:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    sameAs: [BUSINESS.googleMapsReviewUrl],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/booking`,
        inLanguage: 'nl-BE',
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      result: {
        '@type': 'Reservation',
        name: 'Car detailing afspraak',
      },
    },
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'nl-BE',
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

export function buildFaqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildB2bServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vlootdetailing voor bedrijven',
    description:
      'Professionele car detailing voor bedrijfswagens en fleets op locatie in Vlaanderen. Batch-planning, facturatie en vaste kwaliteit.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: BUSINESS.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    url: `${SITE_URL}/zakelijk`,
    serviceType: ['Fleet car detailing', 'Vlootdetailing', 'Bedrijfswagen reiniging'],
  }
}

export const SITEMAP_PATHS = [
  { path: '/booking', priority: 1, changeFrequency: 'weekly' as const },
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/zakelijk', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/zakelijk/aanbod', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/zakelijk/offerte', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
]
