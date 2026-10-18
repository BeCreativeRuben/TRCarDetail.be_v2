import { WEEKDAY_OPENING_HOURS, WEEKEND_OPENING_HOURS } from '@/lib/booking-slots'
import { LARGE_CAR_SURCHARGE_EUR } from '@/lib/cars'
import { TRAVEL_CONFIG } from '@/lib/distance'
import { EXTRAS_CATALOG } from '@/lib/extras-catalog'
import {
  coatingServices,
  exterieurCatalog,
  fullServices,
  interieurCatalog,
  polierenFromPrices,
} from '@/lib/services-catalog'
import type { Service } from '@/lib/types'

/**
 * Veelgestelde vragen (FAQ-pagina + FAQPage JSON-LD + /llms.txt).
 * Prijzen, uren en vergoedingen komen uit dezelfde bronnen als het boekingsformulier,
 * zodat de antwoorden automatisch meeschuiven als een prijs wijzigt.
 */

const eur = (n: number) => `€${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')}`
const priceList = (services: Service[]) =>
  services
    .filter((s) => s.basePrice > 0)
    .map((s) => `${s.name} ${eur(s.basePrice)}`)
    .join(', ')
const minPrice = (services: Service[]) => Math.min(...services.filter((s) => s.basePrice > 0).map((s) => s.basePrice))

const interieurBasis = interieurCatalog.find((s) => s.id === 'interieur-basis')
const exterieurBasis = exterieurCatalog.find((s) => s.id === 'exterieur-basis')
const interieurPremium = interieurCatalog.find((s) => s.id === 'interieur-premium')
const exterieurDeluxe = exterieurCatalog.find((s) => s.id === 'exterieur-deluxe')
const pricePerKm = TRAVEL_CONFIG.pricePerKmEuro.toFixed(2).replace('.', ',')

export type FaqItem = { question: string; answer: string }

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Wat kost car detailing aan huis bij T&R Car Detail?',
    answer:
      `Interieur: ${priceList(interieurCatalog)}. ` +
      `Exterieur: ${priceList(exterieurCatalog)}. ` +
      `Volledig pakket (interieur + exterieur): ${priceList(fullServices)}. ` +
      `Polijsten (lakcorrectie) vanaf ${eur(polierenFromPrices[0])}, keramische coating vanaf ${eur(minPrice(coatingServices))}. ` +
      `Extra's vanaf ${eur(Math.min(...EXTRAS_CATALOG.map((e) => e.priceExclBtwEuro)))}. ` +
      'Daar kan een kilometervergoeding en een toeslag voor grote wagens bijkomen. Prijzen zijn indicatief en kunnen variëren naargelang grootte, staat en complexiteit van uw voertuig.',
  },
  {
    question: 'Wat is inbegrepen in een interieur- of exterieurbeurt?',
    answer:
      `${interieurBasis?.name} (${eur(interieurBasis?.basePrice ?? 0)}): ${interieurBasis?.features.join(', ').toLowerCase()} — dit is geen dieptereiniging. ` +
      `${interieurPremium?.name} (${eur(interieurPremium?.basePrice ?? 0)}) is de meest complete dieptereiniging, met o.a. stoomreiniging en extractor voor zetels, tapijten en vloermatten. ` +
      `${exterieurBasis?.name} (${eur(exterieurBasis?.basePrice ?? 0)}): ${exterieurBasis?.features.join(', ').toLowerCase()}. ` +
      `${exterieurDeluxe?.name} (${eur(exterieurDeluxe?.basePrice ?? 0)}) voegt daar wax (2-3 maanden), decontaminatie van de lak, teer- en vliegroestverwijdering en een kleibehandeling aan toe. ` +
      'Op de dienstenpagina staat per pakket de volledige lijst.',
  },
  {
    question: 'Hoe lang duurt een wasbeurt?',
    answer:
      'Een premium handwash duurt gemiddeld 2-3 uur, afhankelijk van de grootte en staat van uw voertuig. Een complete behandeling met interieur kan 4-6 uur duren.',
  },
  {
    question: 'Hoe lang duurt polijsten of een keramische coating?',
    answer:
      'Light Polish (1-staps) neemt gemiddeld een halve dag. Full Polish (2-staps en 3-staps) kan een volledige dag in beslag nemen door de extra correctiestappen. Voor een keramische coating rekent u op een hele dag, inclusief voorbereiding en lakcorrectie.',
  },
  {
    question: 'Hebben jullie water en elektriciteit nodig?',
    answer:
      'Ja. Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren. Een keramische coating gebeurt bij voorkeur op een overdekte locatie; contacteer ons voor de mogelijkheden.',
  },
  {
    question: 'Moet ik een afspraak maken?',
    answer:
      'Ja, we werken uitsluitend op afspraak om u de beste service te kunnen bieden. U kunt online een afspraak boeken of contact met ons opnemen.',
  },
  {
    question: 'Hoe verloopt een afspraak?',
    answer:
      'U kiest online uw pakket en vult het boekingsformulier in met uw voorkeursdatum en -uur. Wij nemen contact op om datum en tijd definitief vast te leggen. Op de afgesproken dag komen we naar uw locatie; u hoeft nergens naartoe.',
  },
  {
    question: 'Op welke dagen en uren kunnen jullie langskomen?',
    answer:
      `Op weekdagen kunt u een starttijd kiezen tussen ${WEEKDAY_OPENING_HOURS.opens} en ${WEEKDAY_OPENING_HOURS.closes}, in het weekend tussen ${WEEKEND_OPENING_HOURS.opens} en ${WEEKEND_OPENING_HOURS.closes}. ` +
      'In het boekingsformulier ziet u welke tijdstippen beschikbaar zijn.',
  },
  {
    question: 'Rijden jullie door heel Vlaanderen?',
    answer:
      `Ja, wij bieden car detailing aan huis in Vlaanderen. Onze thuisbasis is Sint-Niklaas (Oost-Vlaanderen). Binnen ${TRAVEL_CONFIG.freeRadiusKm} km is de kilometervergoeding gratis; daarbuiten rekenen we €${pricePerKm} per extra km. Het boekingsformulier berekent die vergoeding automatisch op basis van uw adres.`,
  },
  {
    question: 'Kunnen jullie ook busjes en grote voertuigen behandelen?',
    answer:
      `Ja, we behandelen ook busjes en grote voertuigen. Voor grote wagens (SUV, bus, bestelwagen …) geldt een toeslag van ${eur(LARGE_CAR_SURCHARGE_EUR)}; het boekingsformulier herkent die automatisch op basis van merk en model. Voor polijsten gelden aparte toeslagen per wagentype. Voor oversize voertuigen vragen we u contact met ons op te nemen voor een prijsopgave op maat.`,
  },
  {
    question: 'Wat is het verschil tussen een gewone wasbeurt en een premium handwash?',
    answer:
      'Een premium handwash gebruikt de 2-emmer methode om krassen te voorkomen, professionele producten, en extra aandacht voor details zoals deurstijlen, wielkasten en bandendressing.',
  },
  {
    question: 'Hoe vaak moet ik mijn auto laten detailen?',
    answer:
      "Dit hangt af van uw gebruik en omgeving. Voor de meeste auto's raden we aan om elke 3-6 maanden een grondige reiniging te laten uitvoeren.",
  },
  {
    question: 'Wat als mijn auto in slechte staat is?',
    answer:
      "Geen probleem! We behandelen auto's in alle condities. Voor auto's die extra aandacht nodig hebben, kunnen we een programma op maat samenstellen.",
  },
  {
    question: 'Zijn de prijzen inclusief BTW?',
    answer:
      'Wij zijn vrijgesteld van btw (artikel 44). De getoonde prijzen zijn het bedrag dat u betaalt; er komt geen btw bij. Kleine onderneming onderworpen aan de vrijstellingsregeling van belasting — btw niet toepasselijk. Prijzen zijn indicatief en kunnen variëren naargelang grootte, staat en complexiteit van uw voertuig.',
  },
  {
    question: 'Doen jullie ook bedrijfswagens en vloten?',
    answer:
      'Ja. Voor bedrijven reinigen we bedrijfswagens en volledige vloten op uw parking of werflocatie in Vlaanderen, met batch-planning en één aanspreekpunt. De prijs is op maat: vraag een offerte aan via de pagina Zakelijk.',
  },
]
