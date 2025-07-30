# 🚂 Railway Deployment Guide

## Quick Deploy to Railway

### Option 1: Deploy from GitHub (Recommended)

1. **Fork this repository** to your GitHub account
2. **Go to [Railway](https://railway.app)** and sign up/login
3. **Click "New Project"** → "Deploy from GitHub repo"
4. **Select your forked repository**
5. **Add Environment Variables:**
   ```
   SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
   NODE_ENV=production
   PORT=3000
   ```
6. **Deploy!** Railway will automatically build and deploy your app

### Option 2: Deploy from Local

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   railway init
   ```

4. **Set environment variables:**
   ```bash
   railway variables set SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
   railway variables set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
   railway variables set NODE_ENV=production
   railway variables set PORT=3000
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

## After Deployment

1. **Get your deployment URL** from Railway dashboard
2. **Test the endpoints:**
   - Health: `https://your-app.railway.app/health`
   - Dashboard: `https://your-app.railway.app/`
   - Tracking pixel: `https://your-app.railway.app/track/{emailId}`

## Custom Domain (Optional)

1. **Go to your Railway project**
2. **Click "Settings"** → "Domains"
3. **Add your custom domain**
4. **Update your tracking pixel URLs** to use the custom domain 