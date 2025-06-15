
import { createClient } from '@supabase/supabase-js'

// These will be provided by the Supabase integration in Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Provide fallback values for development/testing
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-key'

// Use fallback values if environment variables are not set
const finalUrl = supabaseUrl || fallbackUrl
const finalKey = supabaseAnonKey || fallbackKey

// Create the supabase client with fallback handling
export const supabase = createClient(finalUrl, finalKey)

// Export a function to check if supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== fallbackUrl && 
           supabaseAnonKey !== fallbackKey)
}
