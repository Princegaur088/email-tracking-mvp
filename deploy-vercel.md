# ⚡ Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Fork this repository** to your GitHub account
2. **Go to [Vercel](https://vercel.com)** and sign up/login
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**
   - **Framework Preset:** `Node.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm install`
   - **Output Directory:** `public`
   - **Install Command:** `npm install`
   - **Development Command:** `npm run dev`

6. **Add Environment Variables:**
   ```
   SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
   NODE_ENV=production
   PORT=3000
   ```

7. **Click "Deploy"**

### Option 2: Deploy from Local

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables:**
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

## After Deployment

1. **Get your deployment URL** from Vercel dashboard
2. **Test the endpoints:**
   - Health: `https://your-app.vercel.app/health`
   - Dashboard: `https://your-app.vercel.app/`
   - Tracking pixel: `https://your-app.vercel.app/track/{emailId}`

## Custom Domain (Optional)

1. **Go to your Vercel project**
2. **Click "Settings"** → "Domains"
3. **Add your custom domain**
4. **Update your tracking pixel URLs** to use the custom domain

## Important Notes

- **Serverless Functions:** Vercel uses serverless functions, which may have cold starts
- **Edge Functions:** Consider using Edge Functions for better performance
- **Free Tier:** Vercel has generous free tier limits
- **Auto-scaling:** Vercel automatically scales based on traffic 