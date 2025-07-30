# 🚀 GitHub + Vercel Deployment Guide

## Step 1: Prepare Your Project for GitHub

### 1.1 Create a .gitignore file
First, let's create a `.gitignore` file to exclude sensitive files:

```bash
# Create .gitignore file
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF
```

### 1.2 Initialize Git Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Email tracking MVP"
```

## Step 2: Upload to GitHub

### 2.1 Create GitHub Repository
1. **Go to [GitHub](https://github.com)** and sign in
2. **Click the "+" icon** in the top right → "New repository"
3. **Fill in repository details:**
   - **Repository name:** `email-tracking-mvp`
   - **Description:** `Email open tracking MVP with Node.js, Supabase, and n8n`
   - **Visibility:** Choose Public or Private
   - **DO NOT** check "Add a README file" (we already have one)
4. **Click "Create repository"**

### 2.2 Push to GitHub
After creating the repository, GitHub will show you commands. Run these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/email-tracking-mvp.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub
1. **Go to [Vercel](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Click "Import Git Repository"
   - Find and select your `email-tracking-mvp` repository
   - Click "Import"

### 3.2 Configure Vercel Project
1. **Project Settings:**
   - **Framework Preset:** `Node.js`
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm install`
   - **Output Directory:** `public`
   - **Install Command:** `npm install`
   - **Development Command:** `npm run dev`

2. **Environment Variables:**
   Click "Environment Variables" and add:
   ```
   SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
   NODE_ENV=production
   PORT=3000
   ```

3. **Click "Deploy"**

## Step 4: After Deployment

### 4.1 Get Your Vercel URL
After deployment, Vercel will give you a URL like:
```
https://email-tracking-mvp-xxxxx.vercel.app
```

### 4.2 Test Your Deployment
1. **Health Check:** `https://your-app.vercel.app/health`
2. **Dashboard:** `https://your-app.vercel.app/`
3. **Tracking Pixel:** `https://your-app.vercel.app/track/{emailId}`

### 4.3 Your Tracking Pixel URL
Your tracking pixel will be:
```
https://your-app.vercel.app/track/{emailId}
```

## Step 5: Update n8n Workflow

Update your n8n workflow with the new Vercel URL:

```html
<img src="https://your-app.vercel.app/track/{{ $('Generate Email ID').item.json.email_id }}" 
     width="1" height="1" 
     style="display: none;" 
     alt="" />
```

## Step 6: Custom Domain (Optional)

1. **Go to your Vercel project dashboard**
2. **Click "Settings"** → "Domains"
3. **Add your custom domain**
4. **Update tracking pixel URLs** to use your custom domain

## 🔄 Future Updates

When you make changes to your code:

```bash
# Make changes to your code
# Then commit and push to GitHub
git add .
git commit -m "Update: description of changes"
git push

# Vercel will automatically redeploy!
```

## 🎯 Quick Commands Summary

```bash
# 1. Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: Email tracking MVP"
git remote add origin https://github.com/YOUR_USERNAME/email-tracking-mvp.git
git branch -M main
git push -u origin main

# 2. Deploy to Vercel (via web interface)
# - Go to vercel.com
# - Import your GitHub repository
# - Add environment variables
# - Deploy!

# 3. Test your deployment
curl https://your-app.vercel.app/health
```

## 🎉 Success!

Once deployed:
- ✅ **Your code is on GitHub**
- ✅ **Your app is live on Vercel**
- ✅ **Automatic deployments on every push**
- ✅ **Your tracking pixel is ready to use**

Your email tracking system is now fully deployed and ready for production! 🚀 