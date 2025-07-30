#!/bin/bash

echo "🚀 Email Tracking MVP Deployment Script"
echo "======================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Creating .env file with your Supabase credentials..."
    
    cat > .env << EOF
# Supabase Configuration
SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q

# Server Configuration
PORT=3000
NODE_ENV=production
EOF
    
    echo "✅ .env file created successfully"
else
    echo "✅ .env file found"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup database
echo "🔧 Setting up database..."
npm run setup-db

# Test the system
echo "🧪 Testing the system..."
npm test

echo ""
echo "🎉 Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Choose your deployment platform:"
echo "   - Railway: See deploy-railway.md"
echo "   - Render: See deploy-render.md"
echo "   - Vercel: See deploy-vercel.md"
echo ""
echo "2. Deploy your application"
echo ""
echo "3. Get your tracking pixel URL:"
echo "   https://your-deployed-domain.com/track/{emailId}"
echo ""
echo "4. See tracking-pixel-guide.md for detailed usage instructions"
echo ""
echo "🔗 Quick test: npm run dev" 