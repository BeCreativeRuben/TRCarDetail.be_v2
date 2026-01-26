import { Router } from 'express'
import db from '../db/database.js'
import { ContactSubmission } from '../models/Contact.js'
import { sendContactNotification } from '../services/email.js'

const router = Router()

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contactData: ContactSubmission = req.body

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Insert contact submission into database
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (name, email, phone, message, status)
      VALUES (?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      contactData.name,
      contactData.email,
      contactData.phone || null,
      contactData.message,
      'new'
    )

    const submissionId = result.lastInsertRowid

    // Send notification email (async, don't wait)
    sendContactNotification({
      ...contactData,
      id: submissionId
    }).catch(console.error)

    res.status(201).json({
      id: submissionId,
      message: 'Contact submission created successfully'
    })
  } catch (error) {
    console.error('Error creating contact submission:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all contact submissions (admin endpoint - should have auth in production)
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM contact_submissions ORDER BY createdAt DESC')
    const submissions = stmt.all()
    res.json(submissions)
  } catch (error) {
    console.error('Error getting contact submissions:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
