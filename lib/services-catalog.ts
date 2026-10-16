import type { Service } from '@/lib/types'
import { extrasAsServices } from '@/lib/extras-catalog'

/** Enige bron voor interieur-/exterieurcatalogus (ook gebruikt door combinaties en “op maat”). */
export const interieurCatalog: Service[] = [
  {
    id: 'interieur-basis',
    name: 'Interieur Basis',
    description:
      'Bedoeld voor mensen die hun wagen goed hebben onderhouden en hun wagen eens willen laten opfrissen. LET OP: dit is geen dieptereiniging.',
    basePrice: 50,
    largeCarSurcharge: 0,
    features: [
      'Interieur stofzuigen',
      'Interieur afstoffen',
      'Grondig stofzuigen en interieur behandelen met microvezeldoeken en product',
    ],
  },
  {
    id: 'interieur-deluxe',
    name: 'Interieur Deluxe',
    description:
      'Uitgebreide interieurreiniging waarbij geen enkel detail wordt overgeslagen. Van zichtbare oppervlakken tot verborgen hoeken – alles wordt zorgvuldig gereinigd.',
    basePrice: 130,
    largeCarSurcharge: 0,
    popular: true,
    features: [
      'Interieur stofzuigen',
      'Interieur dieptereiniging',
      'Interieur grondig uitblazen',
      'Dieptereiniging dashboard, stuur, middenconsole',
      'Stof, leder en alcantara worden gereinigd en onderhouden',
      'Verfrissende geur',
    ],
  },
  {
    id: 'interieur-premium',
    name: 'Interieur Premium',
    description:
      'De meest complete interieurdieptereiniging. Pakt zelfs verwaarloosde interieurs aan met krachtige reinigingstechnieken en professionele machines.',
    basePrice: 220,
    largeCarSurcharge: 0,
    features: [
      'Interieur stofzuigen',
      'Interieur dieptereiniging',
      'Interieur grondig uitblazen',
      'Dieptereiniging dashboard, stuurwiel en middenconsole',
      'Reiniging en onderhoud stof, leder en alcantara',
      'Stoomreiniging voor optimale hygiëne',
      'Extractor voor zetels, tapijten en vloermatten',
      'Verfrissende geur',
    ],
  },
]

export const exterieurCatalog: Service[] = [
  {
    id: 'exterieur-basis',
    name: 'Exterieur Basis',
    description:
      'Houd je auto glanzend en in topvorm! Grondige wasbeurt, zorgvuldige reiniging van alle details en een stralende afwerking.',
    basePrice: 60,
    largeCarSurcharge: 0,
    popular: true,
    features: [
      'Dieptereiniging wielkasten, banden en velgen',
      'Pre-wash',
      'Gepaste shampoo voor de wagen',
      '2-emmer methode (krasvrij wassen)',
      'Deurlijsten + instaplijsten',
      'Ramen + spiegels',
      'Bandendressing',
    ],
  },
  {
    id: 'exterieur-deluxe',
    name: 'Exterieur Deluxe (Decontaminatie was)',
    description:
      "Voor auto's die een grondige opfrisbeurt verdienen! Verwijdert hardnekkig vuil, herstelt de glans en biedt een hoogwaardige beschermlaag.",
    basePrice: 90,
    largeCarSurcharge: 0,
    features: [
      'Dieptereiniging wielkasten, banden en velgen',
      'Pre-wash + gepaste shampoo voor de wagen',
      '2-emmer methode (krasvrij wassen)',
      'Deurlijsten + instaplijsten',
      'Ramen + spiegels',
      'Bandendressing',
      'Wax (2-3 maanden)',
      'Decontamineren van de lak',
      'Teer en vliegroest verwijderen',
      'Kleibehandeling',
    ],
  },
]

export function getServiceById(catalog: Service[], id: string): Service | undefined {
  return catalog.find((s) => s.id === id)
}

// ---------------------------------------------------------------------------
// Pakketten, polieren, coating, moto en extra's (verplaatst uit app/services/page.tsx
// zodat de dienstenpagina, JSON-LD en /llms.txt dezelfde bron gebruiken).
// ---------------------------------------------------------------------------

export const interieurServices: Service[] = interieurCatalog
export const exterieurServices: Service[] = exterieurCatalog

export const exterieurBasisFeatures =
  exterieurServices.find((s) => s.id === 'exterieur-basis')?.features ?? []
export const exterieurBasisDescription =
  exterieurServices.find((s) => s.id === 'exterieur-basis')?.description ?? ''
export const interieurBasisFeatures =
  interieurServices.find((s) => s.id === 'interieur-basis')?.features ?? []
export const interieurBasisDescription =
  interieurServices.find((s) => s.id === 'interieur-basis')?.description ?? ''
export const interieurDeluxeFeatures =
  interieurServices.find((s) => s.id === 'interieur-deluxe')?.features ?? []
export const interieurDeluxeDescription =
  interieurServices.find((s) => s.id === 'interieur-deluxe')?.description ?? ''
export const interieurPremiumFeatures =
  interieurServices.find((s) => s.id === 'interieur-premium')?.features ?? []
export const interieurPremiumDescription =
  interieurServices.find((s) => s.id === 'interieur-premium')?.description ?? ''

export const fullServices: Service[] = [
  {
    id: 'full-basis',
    name: 'Basis Pakket',
    description:
      `${exterieurBasisDescription} ${interieurBasisDescription}`.trim(),
    basePrice: 100,
    largeCarSurcharge: 0,
    features: [...exterieurBasisFeatures, ...interieurBasisFeatures],
  },
  {
    id: 'full-deluxe',
    name: 'Deluxe Pakket',
    description: `${exterieurBasisDescription} ${interieurDeluxeDescription}`.trim(),
    basePrice: 170,
    largeCarSurcharge: 0,
    popular: true,
    features: [...exterieurBasisFeatures, ...interieurDeluxeFeatures],
  },
  {
    id: 'full-premium',
    name: 'Premium Pakket',
    description: `${exterieurBasisDescription} ${interieurPremiumDescription}`.trim(),
    basePrice: 250,
    largeCarSurcharge: 0,
    features: [...exterieurBasisFeatures, ...interieurPremiumFeatures],
  },
  {
    id: 'full-custom',
    name: 'Combinatie op maat',
    description:
      'Kies zelf welk exterieur- en interieurniveau u combineert (zoals elders op deze pagina). U kunt onderdelen uitvinken die u niet wilt. In het boekingsformulier ziet u een richtprijs; de definitieve prijs kan afwijken na zicht op de werken.',
    basePrice: 0,
    largeCarSurcharge: 0,
    features: [
      'Zelfde exterieur- en interieuropties als elders op deze pagina',
      'Onderdelen uitvinken die niet van toepassing zijn',
      'Richtprijs (indicatie) wordt in het boekingsformulier berekend',
    ],
  },
]

export const polierenIncluded = [
  'Grondige voorreiniging en decontaminatie van de lak',
  'Lakcorrectie met professionele polijstmachine (1 of meerdere stappen, afhankelijk van pakket)',
  'Bescherming van gevoelige onderdelen (rubbers, kunststof, randen)',
  'Nabehandeling met glansversterker',
  'Persoonlijk advies over onderhoud en eventuele vervolgstappen (bv. coating)',
]

export const polierenLevels = ['1-staps', '2-staps', '3-staps (meerstaps)'] as const
export const polierenLevelServiceIds = ['polijsten-light', 'polijsten-full', 'polijsten-full'] as const

export const polierenComparison: { label: string; values: readonly [string, string, string]; emphasize?: boolean }[] = [
  {
    label: 'Geschikt voor',
    values: [
      'Lichte swirl marks, doffe glans, algemeen onderhoud',
      'Merkbare kras- en swirlschade, matte/verweerde lak',
      'Diepe kras- en swirlschade, maximale correctie',
    ],
  },
  {
    label: 'Resultaat',
    values: ['Merkbaar diepere glans', 'Sterk verbeterde, egale glans', 'Zo goed als perfecte lak'],
  },
  {
    label: 'Vanaf-prijs',
    values: ['€300', '€440', '€600'],
    emphasize: true,
  },
  {
    label: 'Toeslag Sedan/Station',
    values: ['+€50', '+€60', '+€70'],
    emphasize: true,
  },
  {
    label: 'Toeslag Jeep/SUV',
    values: ['+€90', '+€105', '+€120'],
    emphasize: true,
  },
]

export const polierenFaq = [
  {
    question: 'Hoeveel tijd duurt polijsten?',
    answer:
      'Afhankelijk van het pakket: Light Polish (1-staps) neemt gemiddeld een halve dag, Full Polish (2-staps en 3-staps) kan een volledige dag in beslag nemen door de extra correctiestappen.',
  },
  {
    question: 'Is polijsten schadelijk voor mijn lak?',
    answer:
      'Neen, mits correct uitgevoerd. We werken met professionele polijstmachines en de juiste pads/polijstmiddelen per stap, zodat we enkel de beschadigde bovenlaag verwijderen, niet meer dan nodig.',
  },
  {
    question: 'Wat is het verschil tussen polijsten en een coating?',
    answer:
      'Polijsten verwijdert bestaande schade (krasjes, swirl marks, dofheid) en herstelt de glans. Een coating beschermt die glans nadien tegen nieuwe schade, UV en vervuiling. De twee vullen elkaar dus perfect aan.',
  },
  {
    question: 'Kan ik polijsten combineren met een coating?',
    answer:
      'Zeker, en dat raden we zelfs aan: polijsten vóór een coating zorgt voor het beste eindresultaat en de langste levensduur van de coating.',
  },
]

export const coatingServices: Service[] = [
  {
    id: 'coating-basis',
    name: 'Coating Basis',
    description: 'Decontaminatie + lichte lakcorrectie – 2 jaar bescherming.',
    basePrice: 450,
    largeCarSurcharge: 0,
    features: [
      'Grondige decontaminatie vooraf',
      'Lichte lakcorrectie',
      'Professionele aanbreng van de coating',
      'Advies voor onderhoud nadien',
      '2 jaar bescherming',
    ],
  },
  {
    id: 'coating-deluxe',
    name: 'Coating Deluxe',
    description: 'Decontaminatie + uitgebreide lakcorrectie – 3 jaar bescherming, ruitencoating inbegrepen.',
    basePrice: 650,
    largeCarSurcharge: 0,
    popular: true,
    features: [
      'Grondige decontaminatie vooraf',
      'Uitgebreide lakcorrectie',
      'Professionele aanbreng van de coating',
      'Advies voor onderhoud nadien',
      '3 jaar bescherming',
      'Ruitencoating inbegrepen',
    ],
  },
  {
    id: 'coating-premium',
    name: 'Coating Premium',
    description: 'Decontaminatie + volledige lakcorrectie (meerdere stappen) – 4-5 jaar bescherming, ruitencoating + jaarlijkse gratis controle.',
    basePrice: 900,
    largeCarSurcharge: 0,
    features: [
      'Grondige decontaminatie vooraf',
      'Volledige lakcorrectie (meerdere stappen)',
      'Professionele aanbreng van de coating',
      'Advies voor onderhoud nadien',
      '4-5 jaar bescherming',
      'Ruitencoating inbegrepen',
      'Jaarlijkse gratis controle',
    ],
  },
]

export const motoServices: Service[] = [
  { id: 'moto-detailing', name: 'Moto Detailing', description: 'Professionele reiniging en detailing voor moto\'s en motorfietsen. Binnenkort beschikbaar – wij breiden onze diensten uit zodat ook uw motor dezelfde zorg en glans krijgt als uw auto.', basePrice: 0, largeCarSurcharge: 0, features: ['Exterieur reiniging', 'Velgen en banden', 'Lak- en onderhoudsbehandeling', 'Details en optiek'], comingSoon: true },
]

export const extrasServices: Service[] = extrasAsServices()

/** Vanaf-prijzen polijsten (1-, 2-, 3-staps) als getallen, afgeleid uit de vergelijkingstabel. */
export const polierenFromPrices: number[] = (
  polierenComparison.find((row) => row.label === 'Vanaf-prijs')?.values ?? []
).map((v) => Number(v.replace(/[^0-9]/g, '')))
