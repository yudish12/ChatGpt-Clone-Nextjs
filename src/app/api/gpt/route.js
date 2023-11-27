import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        const {prompt,selectedChat} = await request.json()
        const cookieStore = cookies()    
        const supabase = createServerComponentClient({ cookies: () => cookieStore })

        const {data:userData,error} = await supabase.auth.getUser();

        if(error){
            return NextResponse.error(error);
        }
        
        
        let chatid;
        
        if(!selectedChat){
            const { data, error } = await supabase
                .from('Chats')
                .insert([
                    { userid: userData.user.id},
                ]).select()
            
                chatid = data[0].id;
        }else{
            const getChat = await supabase.from('Chats').select('*').eq('userid',userData.user.id).eq('id',selectedChat);
            
            if(getChat.error){
                return NextResponse.error("Bad Request")
            }
            
            chatid=getChat.data[0].id
            
        }
        


        //get history of chat
        const {data:chathistory,error:err} = await supabase.from('Prompts').select('roles,prompt').eq('userid',userData.user.id).eq('chatid',chatid).order('created_at', { ascending: true });

        let history = [];



        //now hit gpt route with chathistory and prompt
        if(chathistory) history = chathistory.map((e)=>({role:e.roles,message:e.prompt}))
        
        const obj = {
            chat_history:history,
            message:prompt
        }


        const resp = await fetch('https://api.cohere.ai/v1/chat',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`
            },
            body:JSON.stringify(obj)
        })

        const res = await resp.json();

        //chatid,prompt (text in case of CHATBOT role),userid,roles
        const {data:promptData,error:promptError} = await supabase.from('Prompts').insert([{
            prompt:prompt,
            userid:userData.user.id,
            chatid:chatid,
            roles:"USER"
        },
        {
            prompt:res.text,
            userid:userData.user.id,
            chatid:chatid,
            roles:"CHATBOT"
        }
    ]).select()
        if(promptError){
            return NextResponse.error(promptError)
        }

        return NextResponse.json(promptData);


    } catch (error) {
        console.log(error)
        NextResponse.error(error)
    }
}