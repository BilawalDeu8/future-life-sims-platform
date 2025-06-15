
import { createClient } from '@supabase/supabase-js'

// These will be provided by the Supabase integration in Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
  throw new Error('Supabase URL is not configured. Please set up your Supabase environment variables.')
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
  throw new Error('Supabase anon key is not configured. Please set up your Supabase environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
