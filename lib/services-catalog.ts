import type { Service } from '@/lib/types'

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
      'Dieptereiniging velgen',
      'Dieptereiniging wielkasten',
      'Pre-wash',
      'Gepaste shampoo voor de wagen',
      '2-emmer methode (krasvrij wassen)',
      'Deurlijsten + instaplijsten',
      'Ramen + spiegels',
      'Bandendressing',
      'Wax (2-3 maanden)',
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
      'Dieptereiniging velgen + wielkasten',
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
