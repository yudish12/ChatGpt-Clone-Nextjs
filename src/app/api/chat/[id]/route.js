import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request, { params }) {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const id = params.id;
    console.log(id);

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({
        status: "failed",
        data: error,
      });
    }

    let { data: Prompts, error:e } = await supabase.from("Prompts").select("*").eq('chatid',id).eq('userid',data.user.id);
    
    if(e){
        return NextResponse.error();
    }

    return NextResponse.json({
        status:"success",
        data:Prompts
    })

  } catch (error) {
    console.log(error)
    return NextResponse.error();
  }
}
