import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bookingsRouter from './routes/bookings.js'
import contactRouter from './routes/contact.js'
import servicesRouter from './routes/services.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/bookings', bookingsRouter)
app.use('/api/contact', contactRouter)
app.use('/api/services', servicesRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'T&R Car Detail API is running' })
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})
