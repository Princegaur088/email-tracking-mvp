# 🪟 Windows Git Setup + GitHub + Vercel Guide

## Step 1: Install Git on Windows

### Option 1: Download Git for Windows (Recommended)

1. **Go to [Git for Windows](https://git-scm.com/download/win)**
2. **Download the latest version** for Windows
3. **Run the installer** and follow these settings:
   - **Select Components:** Keep all default options
   - **Default editor:** Choose your preferred editor (VS Code recommended)
   - **PATH environment:** Select "Git from the command line and also from 3rd-party software"
   - **HTTPS transport backend:** Use the native Windows Secure Channel library
   - **Line ending conversions:** Checkout Windows-style, commit Unix-style line endings
   - **Terminal emulator:** Use Windows' default console window
   - **Default behavior of git pull:** Default (fast-forward or merge)
   - **Credential helper:** Git Credential Manager
   - **Extra options:** Enable file system caching
   - **Experimental features:** Leave unchecked

4. **Restart your PowerShell/Command Prompt** after installation

### Option 2: Install via Chocolatey (if you have it)

```powershell
# Open PowerShell as Administrator and run:
choco install git
```

### Option 3: Install via Winget (Windows 10/11)

```powershell
# Open PowerShell and run:
winget install --id Git.Git -e --source winget
```

## Step 2: Verify Git Installation

After installing Git, restart your PowerShell and run:

```powershell
git --version
```

You should see something like: `git version 2.40.0.windows.1`

## Step 3: Configure Git (First Time Setup)

```powershell
# Set your name and email (replace with your actual details)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Set default branch name
git config --global init.defaultBranch main
```

## Step 4: Now Upload to GitHub

### 4.1 Initialize Git Repository

```powershell
# Navigate to your project directory
cd "C:\Users\princ\Downloads\New folder (2)"

# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Email tracking MVP"
```

### 4.2 Create GitHub Repository

1. **Go to [GitHub](https://github.com)** and sign in
2. **Click "+" → "New repository"**
3. **Fill in:**
   - **Repository name:** `email-tracking-mvp`
   - **Description:** `Email open tracking MVP with Node.js, Supabase, and n8n`
   - **Visibility:** Public or Private
   - **DO NOT** check "Add a README file"
4. **Click "Create repository"**

### 4.3 Push to GitHub

After creating the repository, GitHub will show you commands. Run these:

```powershell
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/email-tracking-mvp.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

### 5.1 Connect Vercel to GitHub

1. **Go to [Vercel](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Click "Import Git Repository"
   - Find and select your `email-tracking-mvp` repository
   - Click "Import"

### 5.2 Configure Vercel Project

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

## Step 6: After Deployment

### 6.1 Get Your Vercel URL

After deployment, Vercel will give you a URL like:
```
https://email-tracking-mvp-xxxxx.vercel.app
```

### 6.2 Your Tracking Pixel URL

Your tracking pixel will be:
```
https://your-app.vercel.app/track/{emailId}
```

## 🎯 Quick Commands Summary (After Git Installation)

```powershell
# 1. Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Initialize and push to GitHub
cd "C:\Users\princ\Downloads\New folder (2)"
git init
git add .
git commit -m "Initial commit: Email tracking MVP"
git remote add origin https://github.com/YOUR_USERNAME/email-tracking-mvp.git
git branch -M main
git push -u origin main

# 3. Deploy to Vercel (via web interface)
# - Go to vercel.com
# - Import your GitHub repository
# - Add environment variables
# - Deploy!

# 4. Test your deployment
Invoke-WebRequest -Uri "https://your-app.vercel.app/health"
```

## 🔄 Future Updates

When you make changes:
```powershell
git add .
git commit -m "Update: description of changes"
git push
# Vercel will automatically redeploy!
```

## 🎉 Success!

Once deployed:
- ✅ **Git is installed and configured**
- ✅ **Your code is on GitHub**
- ✅ **Your app is live on Vercel**
- ✅ **Automatic deployments on every push**
- ✅ **Your tracking pixel is ready to use**

Your email tracking system is now fully deployed and ready for production! 🚀 