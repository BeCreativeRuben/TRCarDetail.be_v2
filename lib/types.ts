export interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  largeCarSurcharge: number
  features: string[]
  popular?: boolean
  comingSoon?: boolean
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
