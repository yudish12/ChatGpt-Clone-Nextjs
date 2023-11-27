import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(request) {
  const requestUrl = new URL(request.url)
  
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  await supabase.auth.signOut()

  return NextResponse.json({status:"success"});
}