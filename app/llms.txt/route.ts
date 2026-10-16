import { WEEKDAY_OPENING_HOURS, WEEKEND_OPENING_HOURS } from '@/lib/booking-slots'
import { ENTERPRISE_NUMBER, VAT_EXEMPT_SHORT } from '@/lib/business'
import { LARGE_CAR_SURCHARGE_EUR } from '@/lib/cars'
import { TRAVEL_CONFIG } from '@/lib/distance'
import { EXTRAS_CATALOG } from '@/lib/extras-catalog'
import { FAQ_ITEMS } from '@/lib/faq-data'
import { BUSINESS, SITE_URL } from '@/lib/seo'
import {
  coatingServices,
  exterieurCatalog,
  fullServices,
  interieurCatalog,
  polierenComparison,
  polierenLevels,
} from '@/lib/services-catalog'
import type { Service } from '@/lib/types'

/**
 * /llms.txt — feitelijke samenvatting voor AI-zoekmachines (ChatGPT, Perplexity, Grok, Google AI Overviews …).
 * Wordt bij de build gegenereerd uit dezelfde bronnen als de site (prijzen, uren, FAQ), dus blijft synchroon.
 */
export const dynamic = 'force-static'

const eur = (n: number) => `€${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')}`

function serviceLines(services: Service[]): string {
  return services
    .filter((s) => s.basePrice > 0 && !s.comingSoon)
    .map((s) => {
      const features = s.features.length ? ` Inbegrepen: ${s.features.join('; ')}.` : ''
      return `- **${s.name}** — ${eur(s.basePrice)}. ${s.description}${features}`
    })
    .join('\n')
}

function buildLlmsTxt(): string {
  const a = BUSINESS.address
  const polieren = polierenLevels
    .map((level, i) => {
      const cell = (label: string) => polierenComparison.find((r) => r.label === label)?.values[i] ?? ''
      return `- **Polijsten ${level}** — vanaf ${cell('Vanaf-prijs')} (toeslag sedan/station ${cell('Toeslag Sedan/Station')}, jeep/SUV ${cell('Toeslag Jeep/SUV')}). Geschikt voor: ${cell('Geschikt voor')}. Resultaat: ${cell('Resultaat')}.`
    })
    .join('\n')
  const extras = EXTRAS_CATALOG.map(
    (e) => `- **${e.name}** — ${e.priceNote ? `${e.priceNote} ` : ''}${eur(e.priceExclBtwEuro)}. ${e.description}`,
  ).join('\n')
  const faq = FAQ_ITEMS.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')

  return `# ${BUSINESS.name}

> ${BUSINESS.name} is een mobiel car-detailingbedrijf uit Sint-Niklaas (Oost-Vlaanderen, België). We reinigen auto's aan huis in Vlaanderen (voor bedrijven ook op de eigen parking of werflocatie): interieur, exterieur, volledige pakketten, polijsten (lakcorrectie), keramische coating en vlootdetailing voor bedrijven. Boeken kan online via ${SITE_URL}/booking.

## Kerngegevens
- Naam: ${BUSINESS.name} (${BUSINESS.tagline})
- Type: mobiele car detailing / autoreiniging aan huis
- Thuisbasis: ${a.streetAddress}, ${a.postalCode} ${a.addressLocality}, België
- Werkgebied: Vlaanderen (vanuit Sint-Niklaas). Binnen ${TRAVEL_CONFIG.freeRadiusKm} km gratis verplaatsing, daarbuiten €${TRAVEL_CONFIG.pricePerKmEuro.toFixed(2).replace('.', ',')} per extra km (automatisch berekend in het boekingsformulier).
- Telefoon: ${BUSINESS.phoneDisplay}
- E-mail: ${BUSINESS.email}
- Website: ${SITE_URL}
- Instagram: ${BUSINESS.instagramUrl}
- Ondernemingsnummer: ${ENTERPRISE_NUMBER}
- Btw: ${VAT_EXEMPT_SHORT} — de getoonde prijzen zijn het bedrag dat de klant betaalt.
- Afspraken (starttijden): weekdagen ${WEEKDAY_OPENING_HOURS.opens}–${WEEKDAY_OPENING_HOURS.closes}, weekend ${WEEKEND_OPENING_HOURS.opens}–${WEEKEND_OPENING_HOURS.closes}. Uitsluitend op afspraak.
- Water en elektriciteit: bij diensten aan huis gebruiken we het water en de elektriciteit van de klant.
- Grote wagens (SUV, bus, bestelwagen …): toeslag ${eur(LARGE_CAR_SURCHARGE_EUR)} (niet bij polijsten; daar gelden aparte toeslagen per wagentype).
- Prijzen zijn indicatief en kunnen variëren naargelang grootte, staat en complexiteit van het voertuig.

## Prijzen particulieren

### Interieur
${serviceLines(interieurCatalog)}

### Exterieur
${serviceLines(exterieurCatalog)}

### Volledig pakket (exterieur + interieur)
${serviceLines(fullServices)}

### Polijsten (lakcorrectie)
${polieren}

### Keramische coating
${serviceLines(coatingServices)}

### Extra's
${extras}

## Zakelijk
Vlootdetailing voor bedrijven op de eigen parking of werflocatie in Vlaanderen: batch-planning, één aanspreekpunt, prijs op maat. Offerte aanvragen: ${SITE_URL}/zakelijk/offerte

## Belangrijke pagina's
- [Diensten en prijzen](${SITE_URL}/services)
- [Online boeken](${SITE_URL}/booking)
- [Veelgestelde vragen](${SITE_URL}/faq)
- [Over ons](${SITE_URL}/about)
- [Contact](${SITE_URL}/contact)
- [Zakelijk / vlootdetailing](${SITE_URL}/zakelijk)

## Veelgestelde vragen
${faq}
`
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
