import { Router } from 'express'
import db from '../db/database.js'
import { BookingCreate } from '../models/Booking.js'
import { sendBookingConfirmation } from '../services/email.js'

const router = Router()

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const bookingData: BookingCreate = req.body

    // Validate required fields
    if (!bookingData.customerName || !bookingData.email || !bookingData.phone ||
        !bookingData.serviceType || !bookingData.preferredDate || !bookingData.preferredTime ||
        !bookingData.vehicleInfo) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Insert booking into database
    const stmt = db.prepare(`
      INSERT INTO bookings (
        customerName, email, phone, serviceType,
        vehicleMake, vehicleModel, vehicleYear, vehicleSize,
        preferredDate, preferredTime, specialRequests, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      bookingData.customerName,
      bookingData.email,
      bookingData.phone,
      bookingData.serviceType,
      bookingData.vehicleInfo.make,
      bookingData.vehicleInfo.model,
      bookingData.vehicleInfo.year,
      bookingData.vehicleInfo.size,
      bookingData.preferredDate,
      bookingData.preferredTime,
      bookingData.specialRequests || null,
      'pending'
    )

    const bookingId = result.lastInsertRowid

    // Send confirmation email (async, don't wait)
    sendBookingConfirmation({
      ...bookingData,
      id: bookingId
    }).catch(console.error)

    res.status(201).json({
      id: bookingId,
      message: 'Booking created successfully'
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get availability for a date
router.get('/availability', (req, res) => {
  try {
    const { date } = req.query

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date parameter required' })
    }

    // Get all bookings for the date
    const stmt = db.prepare(`
      SELECT preferredTime FROM bookings
      WHERE preferredDate = ? AND status IN ('pending', 'confirmed')
    `)

    const bookings = stmt.all(date) as { preferredTime: string }[]
    const bookedTimes = new Set(bookings.map(b => b.preferredTime))

    // Available time slots
    const allSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00'
    ]

    const available = allSlots.map(time => ({
      time,
      available: !bookedTimes.has(time)
    }))

    res.json({ date, slots: available })
  } catch (error) {
    console.error('Error getting availability:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all bookings (admin endpoint - should have auth in production)
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC')
    const bookings = stmt.all()
    res.json(bookings)
  } catch (error) {
    console.error('Error getting bookings:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
