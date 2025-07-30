# 🎨 Render Deployment Guide

## Quick Deploy to Render

### Option 1: Deploy from GitHub (Recommended)

1. **Fork this repository** to your GitHub account
2. **Go to [Render](https://render.com)** and sign up/login
3. **Click "New +"** → "Web Service"
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name:** `email-tracking-mvp`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or choose paid for better performance)

6. **Add Environment Variables:**
   ```
   SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
   NODE_ENV=production
   PORT=10000
   ```

7. **Click "Create Web Service"**

### Option 2: Deploy from Local

1. **Install Render CLI:**
   ```bash
   npm install -g @render/cli
   ```

2. **Login to Render:**
   ```bash
   render login
   ```

3. **Create service:**
   ```bash
   render new web-service
   ```

4. **Follow the prompts** and set environment variables

## After Deployment

1. **Get your deployment URL** from Render dashboard
2. **Test the endpoints:**
   - Health: `https://your-app.onrender.com/health`
   - Dashboard: `https://your-app.onrender.com/`
   - Tracking pixel: `https://your-app.onrender.com/track/{emailId}`

## Custom Domain (Optional)

1. **Go to your Render service**
2. **Click "Settings"** → "Custom Domains"
3. **Add your custom domain**
4. **Update your tracking pixel URLs** to use the custom domain

## Important Notes

- **Free tier limitations:** Render free tier has cold starts and limited bandwidth
- **Auto-sleep:** Free services sleep after 15 minutes of inactivity
- **Upgrade:** Consider upgrading to paid plan for production use 