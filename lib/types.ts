export interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  /** Starting price shown as "Vanaf €X" when the booked total stays on request. */
  fromPrice?: number
  largeCarSurcharge: number
  features: string[]
  popular?: boolean
  comingSoon?: boolean
  /** Seizoensactie: tekst in de badge bovenaan de kaart (bv. "Winteractie t/m 28 februari"). */
  seasonalBadge?: string
  /**
   * PLACEHOLDER zolang T&R de prijs nog niet doorgaf: wordt i.p.v. een bedrag getoond.
   * Verwijderen en basePrice invullen zodra de prijs bekend is.
   */
  pricePlaceholder?: string
}

export interface Booking {
  id?: string
  customerName: string
  email: string
  phone: string
  serviceType: string
  vehicleInfo: {
    make: string
    model: string
    year: string
    size: 'standard' | 'large'
  }
  preferredDate: string
  preferredTime: string
  /** Adres voor aan huis (gebruikt voor kilometervergoeding) */
  address?: string
  /** Afstand in km (vanuit Heidebloemstraat 66, Sint-Niklaas) */
  travelDistanceKm?: number
  /** Kilometervergoeding in EUR (gratis ≤15 km, daarna €0,40/km extra) */
  travelFeeEuro?: number
  /** Totaal richtprijs (indicatie) voor e-mails */
  totalExclBtw?: number
  /** Optionele extra’s (catalogus) */
  selectedExtras?: { id: string; name: string; priceExclBtwEuro: number; priceNote?: string }[]
  specialRequests?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: string
}

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  phone: string
  message: string
  createdAt?: string
  status?: 'new' | 'read' | 'replied'
}

export interface TimeSlot {
  time: string
  available: boolean
}
