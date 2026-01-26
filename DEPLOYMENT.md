# Deployment Guide

## Vercel Deployment

This project is configured for deployment on Vercel. The frontend will be automatically deployed when you connect your GitHub repository.

### Setup Steps

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/trcardetail.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the frontend configuration
   - Set the **Root Directory** to `frontend`
   - Set **Build Command** to `npm run build`
   - Set **Output Directory** to `dist`
   - Set **Install Command** to `npm install`

3. **Environment Variables (if needed):**
   - Add any required environment variables in Vercel dashboard
   - For backend API, you may need to deploy the backend separately or use Vercel serverless functions

### Frontend Configuration

The frontend is configured to run on Vercel with:
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Backend Deployment

The backend can be deployed separately:
- Deploy to a service like Railway, Render, or Heroku
- Or convert API routes to Vercel serverless functions
- Update the API URL in the frontend if backend is deployed separately
