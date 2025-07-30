# 📧 Email Open Tracking MVP

A complete email open tracking system using a 1x1 tracking pixel served from a Node.js server with Supabase database integration and n8n workflow automation.

## 🚀 Features

- **1x1 Tracking Pixel**: Invisible pixel that tracks email opens
- **Node.js Server**: Custom server to serve the tracking pixel
- **Supabase Integration**: Real-time database for storing tracking data
- **Dashboard**: Web interface to view tracking analytics
- **n8n Integration**: Workflow automation for sending tracked emails
- **Automatic Tracking**: No webhooks needed - tracking happens on pixel load

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- n8n instance (optional, for email automation)
- Git (for deployment)

## 🛠️ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Database Setup

Run the database setup script:

```bash
npm run setup-db
```

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Dashboard

Visit `http://localhost:3000` to view the tracking dashboard.

## 🔗 API Endpoints

- **Health Check**: `GET /health`
- **Tracking Pixel**: `GET /track/:emailId`
- **Tracking Data**: `GET /api/tracking`
- **Debug Supabase**: `GET /debug/supabase`
- **Setup Database**: `GET /debug/setup-db`

## 📧 Using the Tracking Pixel

### In HTML Emails

```html
<img src="https://your-domain.com/track/recipient@example.com" 
     width="1" height="1" 
     style="display: none;" 
     alt="" />
```

### In n8n Workflow

```html
<img src="https://your-domain.com/track/{{ $('Generate Email ID').item.json.email_id }}" 
     width="1" height="1" 
     style="display: none;" 
     alt="" />
```

## 🚀 Deployment

### Deploy to Vercel

1. **Fork this repository** to your GitHub account
2. **Go to [Vercel](https://vercel.com)** and sign up/login
3. **Click "New Project"** → Import your GitHub repository
4. **Add Environment Variables:**
   ```
   SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
   NODE_ENV=production
   PORT=3000
   ```
5. **Click "Deploy"**

### Deploy to Railway

1. **Fork this repository** to your GitHub account
2. **Go to [Railway](https://railway.app)** and sign up/login
3. **Click "New Project"** → "Deploy from GitHub repo"
4. **Select your forked repository**
5. **Add Environment Variables** (same as Vercel)
6. **Deploy!**

### Deploy to Render

1. **Fork this repository** to your GitHub account
2. **Go to [Render](https://render.com)** and sign up/login
3. **Click "New +"** → "Web Service"
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name:** `email-tracking-mvp`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Add Environment Variables** (same as Vercel)
7. **Click "Create Web Service"**

## 🧪 Testing

Run the test script to verify everything is working:

```bash
npm test
```

## 📁 Project Structure

```
email-tracking-mvp/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore file
├── public/
│   └── index.html        # Dashboard interface
├── supabase-setup.sql    # Database schema
├── setup.js              # Environment setup script
├── setup-database.js     # Database setup script
├── test-tracking.js      # Test script
├── n8n-workflow.json     # n8n workflow configuration
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── deploy.sh             # Deployment script
└── README.md             # This file
```

## 🔧 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run setup` - Run the environment setup script
- `npm run setup-db` - Set up the Supabase database
- `npm test` - Run the test script
- `npm run deploy` - Run the deployment script

## 🎯 How It Works

1. **Email Sent**: n8n sends an email with an embedded tracking pixel
2. **Email Opened**: When the recipient opens the email, the pixel loads
3. **Tracking Request**: The pixel makes a request to `/track/{emailId}`
4. **Database Log**: The server logs the email ID and timestamp to Supabase
5. **Dashboard View**: View tracking data in real-time via the web dashboard

## 🔒 Security

- **Row Level Security (RLS)** enabled on Supabase
- **Service Role Key** used for server-side operations
- **Environment Variables** for sensitive configuration
- **Input Validation** on all endpoints

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to fetch" error**: Check Supabase URL and service role key
2. **"Column not found" error**: Run `npm run setup-db` to create the database
3. **Tracking not working**: Ensure the pixel URL is accessible and HTTPS is used

### Debug Endpoints

- `/health` - Check server status
- `/debug/supabase` - Test Supabase connection
- `/debug/setup-db` - Attempt database setup

## 📈 Advanced Usage

### Custom Email IDs

You can use any unique identifier for tracking:

```html
<!-- Using email address -->
<img src="https://your-domain.com/track/user@example.com" />

<!-- Using campaign + user -->
<img src="https://your-domain.com/track/campaign123_user@example.com" />

<!-- Using timestamp -->
<img src="https://your-domain.com/track/1706659200_user@example.com" />
```

### Multiple Tracking Pixels

Add multiple pixels for different purposes:

```html
<!-- Open tracking -->
<img src="https://your-domain.com/track/open_{{ email_id }}" />

<!-- Link click tracking -->
<img src="https://your-domain.com/track/click_{{ email_id }}" />
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Run the test script: `npm test`
3. Check the debug endpoints
4. Verify your Supabase configuration

## 🎉 Success!

Once deployed, your tracking pixel will be available at:
```
https://your-deployed-domain.com/track/{emailId}
```

Your email tracking system is now ready for production use! 🚀 