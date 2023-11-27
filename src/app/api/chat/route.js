import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase.auth.getUser();

    if(error){
        return NextResponse.json({
            status:"failed",
            data:error
        })
    }
    
    let { data: Chats, error:e } = await supabase
  .from('Chats')
  .select('*,Prompts(prompt)')
  .eq('userid',data.user.id)
  .order('created_at',{ascending:false});
  

    return NextResponse.json({
        status:"success",
        data:Chats
    })
  } catch (error) {
    console.log(error)
    return NextResponse.error(error)
  }
}



export async function DELETE(request){
    try {
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('chatid')
        console.log(id)

        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        const {data:userData,errpr:e} = await supabase.auth.getUser();

        const {data,error} = await supabase.from('Chats').delete().eq('id', id).eq('userid',userData.user.id);

        if(error){
            return NextResponse.json({
                status:"failed",
                data:error
            })
        }

        return NextResponse.json({
            status:"success",
            data:data
        })

    } catch (error) {
        console.log(error)
        return NextResponse.error(error)
    }
}