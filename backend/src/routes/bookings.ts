import { Router } from 'express'
import { BookingCreate } from '../models/Booking.js'
import { sendBookingConfirmation } from '../services/email.js'

const router = Router()

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00'
]

// Create a new booking (no persistence – e.g. forward to external system later)
router.post('/', async (req, res) => {
  try {
    const bookingData: BookingCreate = req.body

    if (!bookingData.customerName || !bookingData.email || !bookingData.phone ||
        !bookingData.serviceType || !bookingData.preferredDate || !bookingData.preferredTime ||
        !bookingData.vehicleInfo) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    sendBookingConfirmation(bookingData).catch(console.error)

    res.status(201).json({
      message: 'Booking received successfully'
    })
  } catch (error) {
    console.error('Error processing booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Availability: all slots reported as available (no DB to check)
router.get('/availability', (req, res) => {
  try {
    const { date } = req.query

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date parameter required' })
    }

    const slots = TIME_SLOTS.map(time => ({ time, available: true }))
    res.json({ date, slots })
  } catch (error) {
    console.error('Error getting availability:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// No stored bookings – return empty (kept for API compatibility)
router.get('/', (req, res) => {
  res.json([])
})

export default router
