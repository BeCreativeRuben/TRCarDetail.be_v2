import { Router } from 'express'
import { ContactSubmission } from '../models/Contact.js'
import { sendContactNotification } from '../services/email.js'

const router = Router()

// Submit contact form (no persistence – e.g. forward via email / external system)
router.post('/', async (req, res) => {
  try {
    const contactData: ContactSubmission = req.body

    if (!contactData.name || !contactData.email || !contactData.message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    sendContactNotification(contactData).catch(console.error)

    res.status(201).json({
      message: 'Contact submission received successfully'
    })
  } catch (error) {
    console.error('Error processing contact submission:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// No stored submissions – return empty (kept for API compatibility)
router.get('/', (req, res) => {
  res.json([])
})

export default router
