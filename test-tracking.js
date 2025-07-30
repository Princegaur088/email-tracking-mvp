const fetch = require('node-fetch');

// Test configuration
const SERVER_URL = 'http://localhost:3000';
const TEST_EMAIL_ID = 'test-email-' + Date.now();

async function testTracking() {
    console.log('🧪 Testing Email Tracking System...\n');

    // Test 1: Health Check
    console.log('1. Testing health check...');
    try {
        const healthResponse = await fetch(`${SERVER_URL}/health`);
        const healthData = await healthResponse.json();
        
        if (healthResponse.ok && healthData.status === 'OK') {
            console.log('✅ Health check passed');
        } else {
            console.log('❌ Health check failed');
            return;
        }
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
        return;
    }

    // Test 2: Tracking Pixel
    console.log('\n2. Testing tracking pixel...');
    try {
        const trackingResponse = await fetch(`${SERVER_URL}/track/${TEST_EMAIL_ID}`);
        
        if (trackingResponse.ok) {
            console.log('✅ Tracking pixel request successful');
            console.log('   Content-Type:', trackingResponse.headers.get('content-type'));
            console.log('   Status:', trackingResponse.status);
        } else {
            console.log('❌ Tracking pixel request failed');
            return;
        }
    } catch (error) {
        console.log('❌ Tracking pixel test failed:', error.message);
        return;
    }

    // Test 3: Supabase Debug
    console.log('\n3. Testing Supabase connection...');
    try {
        const debugResponse = await fetch(`${SERVER_URL}/debug/supabase`);
        const debugData = await debugResponse.json();
        
        if (debugResponse.ok && debugData.status === 'success') {
            console.log('✅ Supabase connection successful');
        } else {
            console.log('❌ Supabase connection failed');
            console.log('   Error:', debugData.message);
            console.log('   Details:', debugData.details);
            return;
        }
    } catch (error) {
        console.log('❌ Supabase debug test failed:', error.message);
        return;
    }

    // Test 4: API Data Retrieval
    console.log('\n4. Testing API data retrieval...');
    try {
        const apiResponse = await fetch(`${SERVER_URL}/api/tracking`);
        const apiData = await apiResponse.json();
        
        if (apiResponse.ok) {
            console.log('✅ API data retrieval successful');
            console.log('   Records found:', apiData.length);
            
            // Check if our test email is in the data
            const testRecord = apiData.find(record => record.email_id === TEST_EMAIL_ID);
            if (testRecord) {
                console.log('✅ Test email found in tracking data');
                console.log('   Opened at:', testRecord.opened_at);
            } else {
                console.log('⚠️  Test email not found in tracking data (may take a moment to appear)');
            }
        } else {
            console.log('❌ API data retrieval failed');
            console.log('   Error:', apiData.error);
            console.log('   Details:', apiData.details);
            return;
        }
    } catch (error) {
        console.log('❌ API test failed:', error.message);
        return;
    }

    // Test 5: Dashboard Access
    console.log('\n5. Testing dashboard access...');
    try {
        const dashboardResponse = await fetch(`${SERVER_URL}/`);
        
        if (dashboardResponse.ok) {
            console.log('✅ Dashboard accessible');
            console.log('   Status:', dashboardResponse.status);
        } else {
            console.log('❌ Dashboard access failed');
        }
    } catch (error) {
        console.log('❌ Dashboard test failed:', error.message);
    }

    console.log('\n🎉 Testing completed!');
    console.log('\n📊 Dashboard URL:', SERVER_URL);
    console.log('📧 Test Email ID:', TEST_EMAIL_ID);
    console.log('\n💡 To test with n8n:');
    console.log('   1. Import the n8n-workflow.json file');
    console.log('   2. Configure your email credentials');
    console.log('   3. Send a test email via the webhook');
    console.log('   4. Check the dashboard for tracking data');
}

// Run the test
testTracking().catch(console.error); 