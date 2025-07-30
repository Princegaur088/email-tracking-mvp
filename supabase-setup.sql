-- Email Tracking Table Setup for Supabase
-- Run this SQL in your Supabase SQL editor

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

-- Optional: Create a view for aggregated statistics
CREATE OR REPLACE VIEW email_tracking_stats AS
SELECT 
    COUNT(*) as total_opens,
    COUNT(DISTINCT email_id) as unique_emails,
    COUNT(*) FILTER (WHERE opened_at >= CURRENT_DATE) as today_opens,
    COUNT(*) FILTER (WHERE opened_at >= CURRENT_DATE - INTERVAL '7 days') as week_opens,
    AVG(daily_opens) as avg_daily_opens
FROM (
    SELECT 
        email_id,
        opened_at,
        COUNT(*) OVER (PARTITION BY DATE(opened_at)) as daily_opens
    FROM email_tracking
) subquery;

-- Optional: Create a function to get recent tracking data
CREATE OR REPLACE FUNCTION get_recent_tracking_data(limit_count INTEGER DEFAULT 100)
RETURNS TABLE (
    email_id TEXT,
    opened_at TIMESTAMPTZ,
    user_agent TEXT,
    ip_address INET
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        et.email_id,
        et.opened_at,
        et.user_agent,
        et.ip_address
    FROM email_tracking et
    ORDER BY et.opened_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql; 