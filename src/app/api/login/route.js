import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(request) {
    const {email,password} = await request.json()
    const cookieStore = cookies()
    const url = request.nextUrl.clone()
    url.pathname = '/'
    
    const supabase = createServerComponentClient({ cookies: () => cookieStore })


    const {data,error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    

    if(error){
        return NextResponse.json({
            data:null,
            error:error
        })
    }

    return NextResponse.json({
        data:data,
        error:null
    })
  }