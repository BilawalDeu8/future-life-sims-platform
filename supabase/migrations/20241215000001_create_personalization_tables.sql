
-- Create personalization profiles table
CREATE TABLE IF NOT EXISTS personalization_profiles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text UNIQUE NOT NULL,
    preferred_locations text[] DEFAULT '{}',
    career_interests text[] DEFAULT '{}',
    risk_tolerance text DEFAULT 'medium' CHECK (risk_tolerance IN ('low', 'medium', 'high')),
    work_life_balance_weight integer DEFAULT 50 CHECK (work_life_balance_weight >= 0 AND work_life_balance_weight <= 100),
    salary_weight integer DEFAULT 30 CHECK (salary_weight >= 0 AND salary_weight <= 100),
    growth_weight integer DEFAULT 15 CHECK (growth_weight >= 0 AND growth_weight <= 100),
    stability_weight integer DEFAULT 5 CHECK (stability_weight >= 0 AND stability_weight <= 100),
    engagement_level integer DEFAULT 0 CHECK (engagement_level >= 0 AND engagement_level <= 100),
    completed_scenarios text[] DEFAULT '{}',
    behavior_pattern jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create data sources table for API management
CREATE TABLE IF NOT EXISTS data_sources (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text UNIQUE NOT NULL,
    type text NOT NULL CHECK (type IN ('salary', 'cost_of_living', 'job_market', 'housing')),
    endpoint text NOT NULL,
    rate_limit_per_day integer DEFAULT 1000,
    last_fetched timestamp with time zone,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create cached data table for storing API responses
CREATE TABLE IF NOT EXISTS cached_data (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    data_type text NOT NULL,
    query_key text NOT NULL,
    data jsonb NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(data_type, query_key)
);

-- Create secrets table for API keys (if not exists)
CREATE TABLE IF NOT EXISTS secrets (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text UNIQUE NOT NULL,
    value text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_personalization_profiles_user_id ON personalization_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_cached_data_type_key ON cached_data(data_type, query_key);
CREATE INDEX IF NOT EXISTS idx_cached_data_expires ON cached_data(expires_at);

-- Insert default data sources
INSERT INTO data_sources (name, type, endpoint, rate_limit_per_day) VALUES
    ('Bureau of Labor Statistics', 'salary', 'https://api.bls.gov/publicAPI/v2/timeseries/data/', 500),
    ('Numbeo API', 'cost_of_living', 'https://www.numbeo.com/api/indices', 1000),
    ('Indeed Job Search API', 'job_market', 'https://api.indeed.com/ads/apisearch', 1000)
ON CONFLICT (name) DO NOTHING;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for personalization_profiles
CREATE TRIGGER update_personalization_profiles_updated_at 
    BEFORE UPDATE ON personalization_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE personalization_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cached_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
CREATE POLICY "Users can view their own personalization profile" ON personalization_profiles
    FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Service role can access cached data" ON cached_data
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access secrets" ON secrets
    FOR ALL USING (auth.role() = 'service_role');
