export interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  largeCarSurcharge: number
  features: string[]
  popular?: boolean
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
