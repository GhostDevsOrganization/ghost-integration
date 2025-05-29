import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase URL
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role key for admin operations
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY || 'sbp_f4cb80770d248967cadf2a3cb2f8c15dfc03a509'
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
