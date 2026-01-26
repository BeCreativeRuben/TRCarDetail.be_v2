export interface Booking {
  id?: number
  customerName: string
  email: string
  phone: string
  serviceType: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  vehicleSize: 'standard' | 'large'
  preferredDate: string
  preferredTime: string
  specialRequests?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: string
}

export interface BookingCreate {
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
}
