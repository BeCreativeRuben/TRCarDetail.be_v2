import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new Database(path.join(__dirname, '../../database.sqlite'))

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    serviceType TEXT NOT NULL,
    vehicleMake TEXT NOT NULL,
    vehicleModel TEXT NOT NULL,
    vehicleYear TEXT NOT NULL,
    vehicleSize TEXT NOT NULL,
    preferredDate TEXT NOT NULL,
    preferredTime TEXT NOT NULL,
    specialRequests TEXT,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

export default db
