# T&R Car Detail - Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on http://localhost:5000

## Environment Variables

Create a `.env` file in the `backend` directory (copy from `.env.example`):

```env
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@trcardetail.be
```

**Note:** Email functionality will work only when SMTP credentials are configured. Without them, bookings and contact submissions will still be saved to the database, but no emails will be sent.

## Database

The database (SQLite) will be automatically created in `backend/database.sqlite` on first run.

## Adding Content

### Video
Replace the video placeholder in `frontend/src/components/sections/Hero.tsx` with your actual hero video. Place the video file in `frontend/public/videos/hero-video.mp4`.

### Images
Add images to `frontend/public/images/` and update the placeholder references in components.

### Contact Information
Update contact details in:
- `frontend/src/components/layout/Footer.tsx`
- `frontend/src/pages/Contact.tsx`
- `frontend/src/pages/About.tsx`

## Features

✅ Responsive design
✅ Booking system with calendar
✅ Contact form
✅ Service pages with pricing
✅ FAQ section
✅ Email notifications (when configured)
✅ SQLite database for bookings and contacts
✅ Modern animations with Framer Motion

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm run build
npm start
```

## Project Structure

- `frontend/` - React + TypeScript + Vite application
- `backend/` - Express + TypeScript API server
- Database is stored in `backend/database.sqlite`
