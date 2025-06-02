import { supabase } from './config/supabase 2.js';

async function testConnection() {
    // Try fetching a row from the "beta_testers" table.
    const { data, error } = await supabase
        .from('beta_testers')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error connecting to Supabase:', error);
    } else {
        console.log('Successfully connected:', data);
    }
}

testConnection();