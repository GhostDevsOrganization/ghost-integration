import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://vtrpfjgwkzcjexmbkjfu.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cnBmamd3a3pjamV4bWJramZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjE2MTYsImV4cCI6MjA2NDUzNzYxNn0.0vlKNX-6UjZ6oIhckCbvDddPV_WRlH_ughdXEHnKzrw'

// Single client instance to prevent multiple GoTrueClient warnings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    },
    global: {
        headers: {
            'X-Client-Info': 'kasportal-web'
        }
    }
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
    return supabaseUrl !== 'https://your-project.supabase.co' &&
        supabaseAnonKey !== 'your-anon-key' &&
        supabaseUrl.includes('supabase.co')
}

// Helper function for graceful error handling
export const handleSupabaseError = (error) => {
    console.error('Supabase operation failed:', error)

    if (!isSupabaseConfigured()) {
        return {
            error: 'Database not configured. Using local storage fallback.',
            fallback: true
        }
    }

    return {
        error: error.message || 'Database operation failed',
        fallback: false
    }
}
