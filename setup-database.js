const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🔧 Setting up Email Tracking Database...\n');

  try {
    // Step 1: Test connection
    console.log('1. Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('email_tracking')
      .select('count')
      .limit(1);
    
    if (testError && testError.code === 'PGRST204') {
      console.log('❌ Table does not exist. Creating it...');
    } else if (testError) {
      console.log('❌ Connection error:', testError.message);
      return;
    } else {
      console.log('✅ Table already exists');
    }

    // Step 2: Create table using raw SQL
    console.log('\n2. Creating email_tracking table...');
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
      `
    });

    if (createError) {
      console.log('⚠️ Could not create table via RPC. Please run the SQL manually.');
      console.log('\n📝 Copy and paste this SQL into your Supabase SQL Editor:');
      console.log(`
-- Drop the table if it exists (for clean setup)
DROP TABLE IF EXISTS email_tracking CASCADE;

-- Create the email_tracking table
CREATE TABLE email_tracking (
    id BIGSERIAL PRIMARY KEY,
    email_id TEXT NOT NULL,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_tracking_email_id ON email_tracking(email_id);
CREATE INDEX IF NOT EXISTS idx_email_tracking_opened_at ON email_tracking(opened_at);
CREATE INDEX IF NOT EXISTS idx_email_tracking_created_at ON email_tracking(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE email_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert data
CREATE POLICY "Service role can insert tracking data" ON email_tracking
    FOR INSERT TO service_role
    WITH CHECK (true);

-- Create policy to allow service role to select data
CREATE POLICY "Service role can select tracking data" ON email_tracking
    FOR SELECT TO service_role
    USING (true);
      `);
      return;
    }

    // Step 3: Create indexes
    console.log('3. Creating indexes...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_email_tracking_email_id ON email_tracking(email_id);
        CREATE INDEX IF NOT EXISTS idx_email_tracking_opened_at ON email_tracking(opened_at);
        CREATE INDEX IF NOT EXISTS idx_email_tracking_created_at ON email_tracking(created_at);
      `
    });

    // Step 4: Enable RLS and create policies
    console.log('4. Setting up Row Level Security...');
    await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE email_tracking ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Service role can insert tracking data" ON email_tracking;
        CREATE POLICY "Service role can insert tracking data" ON email_tracking
            FOR INSERT TO service_role
            WITH CHECK (true);
        
        DROP POLICY IF EXISTS "Service role can select tracking data" ON email_tracking;
        CREATE POLICY "Service role can select tracking data" ON email_tracking
            FOR SELECT TO service_role
            USING (true);
      `
    });

    // Step 5: Test insert
    console.log('5. Testing insert operation...');
    const testEmailId = 'test-setup-' + Date.now();
    const { data: insertData, error: insertError } = await supabase
      .from('email_tracking')
      .insert([
        {
          email_id: testEmailId,
          opened_at: new Date().toISOString(),
          user_agent: 'Setup Test',
          ip_address: '127.0.0.1'
        }
      ])
      .select();

    if (insertError) {
      console.log('❌ Insert test failed:', insertError.message);
      return;
    }

    console.log('✅ Insert test successful');

    // Step 6: Test select
    console.log('6. Testing select operation...');
    const { data: selectData, error: selectError } = await supabase
      .from('email_tracking')
      .select('*')
      .eq('email_id', testEmailId);

    if (selectError) {
      console.log('❌ Select test failed:', selectError.message);
      return;
    }

    console.log('✅ Select test successful');

    // Step 7: Clean up test data
    console.log('7. Cleaning up test data...');
    await supabase
      .from('email_tracking')
      .delete()
      .eq('email_id', testEmailId);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Test the system: npm test');
    console.log('3. Access dashboard: http://localhost:3000');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 Manual setup required:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the SQL from supabase-setup.sql');
  }
}

setupDatabase(); 