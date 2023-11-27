import { createClient } from '@supabase/supabase-js'

export default function connectSupabase(){
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return supabase;
}



