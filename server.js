const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Supabase client with service role key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env file.');
  console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test Supabase connection on startup
async function testSupabaseConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    const { data, error } = await supabase
      .from('email_tracking')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      console.error('Please check your Supabase URL and service role key.');
      process.exit(1);
    }
    
    console.log('✅ Supabase connection successful');
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
    process.exit(1);
  }
}

// Tracking pixel endpoint
app.get('/track/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();

    console.log(`📧 Email opened: ${emailId} at ${timestamp}`);

    // Log the email open to Supabase
    const { data, error } = await supabase
      .from('email_tracking')
      .insert([
        {
          email_id: emailId,
          opened_at: timestamp,
          user_agent: userAgent,
          ip_address: ipAddress
        }
      ]);

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).send('Tracking failed');
    }

    console.log('✅ Email open tracked successfully');

    // Return a 1x1 transparent GIF pixel
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': pixel.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(pixel);

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).send('Internal server error');
  }
});

// API endpoint to get tracking data
app.get('/api/tracking', async (req, res) => {
  try {
    console.log('📊 Fetching tracking data from Supabase...');
    
    const { data, error } = await supabase
      .from('email_tracking')
      .select('*')
      .order('opened_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch tracking data',
        details: error.message 
      });
    }

    console.log(`✅ Retrieved ${data?.length || 0} tracking records`);
    res.json(data || []);
  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    supabase_url: supabaseUrl ? 'Configured' : 'Missing',
    supabase_key: supabaseServiceKey ? 'Configured' : 'Missing'
  });
});

// Debug endpoint to test Supabase connection
app.get('/debug/supabase', async (req, res) => {
  try {
    console.log('🔍 Testing Supabase connection...');
    const { data, error } = await supabase
      .from('email_tracking')
      .select('count')
      .limit(1);
    
    if (error) {
      return res.json({
        status: 'error',
        message: error.message,
        details: error
      });
    }
    
    res.json({
      status: 'success',
      message: 'Supabase connection working',
      data: data
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
      details: error
    });
  }
});

// Database setup endpoint
app.get('/debug/setup-db', async (req, res) => {
  try {
    console.log('🔧 Setting up database table...');
    
    // First, try to create the table using raw SQL
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS email_tracking (
          id BIGSERIAL PRIMARY KEY,
          email_id TEXT NOT NULL,
          opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          user_agent TEXT,
          ip_address INET,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_email_tracking_email_id ON email_tracking(email_id);
        CREATE INDEX IF NOT EXISTS idx_email_tracking_opened_at ON email_tracking(opened_at);
        CREATE INDEX IF NOT EXISTS idx_email_tracking_created_at ON email_tracking(created_at);
      `
    });
    
    if (createError) {
      console.log('⚠️ Could not create table via RPC, trying direct insert...');
    }
    
    // Test inserting a record
    const { data, error } = await supabase
      .from('email_tracking')
      .insert([
        {
          email_id: 'test-setup-' + Date.now(),
          opened_at: new Date().toISOString(),
          user_agent: 'Setup Test',
          ip_address: '127.0.0.1'
        }
      ])
      .select();
    
    if (error) {
      return res.json({
        status: 'error',
        message: 'Database setup failed',
        details: error,
        suggestion: 'Please run the SQL setup script in your Supabase dashboard'
      });
    }
    
    // Clean up test record
    if (data && data.length > 0) {
      await supabase
        .from('email_tracking')
        .delete()
        .eq('email_id', data[0].email_id);
    }
    
    res.json({
      status: 'success',
      message: 'Database setup successful',
      table_created: true,
      test_insert: 'passed'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
      details: error
    });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Email tracking server running on port ${PORT}`);
  console.log(`📊 Dashboard available at: http://localhost:${PORT}`);
  console.log(`📧 Tracking pixel endpoint: http://localhost:${PORT}/track/{emailId}`);
  
  // Test Supabase connection after server starts
  await testSupabaseConnection();
}); 