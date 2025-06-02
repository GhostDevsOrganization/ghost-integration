import { createClient } from '@supabase/supabase-js';
import BetaTestForm from './BetaTestForm';

// Replace with your actual Supabase URL
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key for admin operations
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY || 'your-service-key';
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const InterdimensionalPortal = ({ showBetaForm, setShowBetaForm }) => {
    // ...your existing portal logic...

    return (
        <div>
            {/* Your portal content */}
            <button onClick={() => setShowBetaForm(true)}>Alpha / Beta Link</button>

            {showBetaForm && (
                <BetaTestForm
                    isVisible={showBetaForm}
                    onClose={() => setShowBetaForm(false)}
                />
            )}
        </div>
    );
};

export default InterdimensionalPortal;
