const fs = require('fs');
const path = require('path');

console.log('🔧 Email Tracking MVP Setup\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('✅ .env file found');
} else {
    console.log('❌ .env file not found');
    console.log('\n📝 Creating .env file with your Supabase credentials...');
    
    const envContent = `# Supabase Configuration
SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q

# Server Configuration
PORT=3000
NODE_ENV=development
`;
    
    try {
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully');
    } catch (error) {
        console.error('❌ Failed to create .env file:', error.message);
        console.log('\n📝 Please create a .env file manually with the following content:');
        console.log(envContent);
    }
}

console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('3. Test the connection: node test-tracking.js');
console.log('4. Access dashboard at: http://localhost:3000');
console.log('\n🔗 Debug endpoints:');
console.log('- Health check: http://localhost:3000/health');
console.log('- Supabase test: http://localhost:3000/debug/supabase');
console.log('- API data: http://localhost:3000/api/tracking'); 