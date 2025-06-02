import { supabase, handleSupabaseError } from './supabaseClient' // adjust the import path as needed

export const fetchEmails = async () => {
    const { data, error } = await supabase
        .from('emails')
        .select('*')

    if (error) {
        const handled = handleSupabaseError(error)
        console.error(handled.error)
        return null
    }

    return data
}