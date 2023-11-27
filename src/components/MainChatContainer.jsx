"use client";
import React, { useEffect, useState,useRef } from "react";
import { chatHistory, cn } from "../lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Input } from "./ui/input";
import { Forward, PanelLeftIcon, SidebarOpen } from "lucide-react";
import { ToggleBtn } from "./DarkModeToggle";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


const MainChatContainer = ({selectedChat,setIsSideBarOpen,setSelectedChat}) => {
  const router = useRouter();
  const logout = async()=>{
    try {
      const resp = await fetch('/api/logout',{
        method:"POST"
      });
      console.log(resp)
      const res = await resp.json();
      if(resp.status===200){
        router.push("/login")
      }

    } catch (error) {
      console.log(error)
    }
  }
  const [chatHistory,setChatHistory] = useState(null)
  const [loading,setLoading] = useState(false);

  const chatHistoryRef = useRef(null);

  const handleClick = async()=>{
    console.log(chatHistory)
    if(chatHistory ) setChatHistory((prev)=>[...prev,{prompt:prompt,roles:"USER",id:Math.floor(Math.random())}])
    else setChatHistory([{prompt:prompt,roles:"USER",id:Math.floor(Math.random())}]) 
    setLoading(true);
    try {
        const obj = {
          prompt:prompt,
          selectedChat:selectedChat,
        }
        const resp = await fetch('/api/gpt',{
          method:"POST",
          body:JSON.stringify(obj),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        const res = await resp.json();
        setSelectedChat(res[0].chatid)
        if(chatHistory) setChatHistory((prev)=>[...prev,res[1]]);
        else setChatHistory([res[1]])
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
  }

  const getAnswer = async (e)=>{
    console.log(e)
    
    if(e.key==="Enter"){
      console.log(chatHistory)
      if(chatHistory ) setChatHistory((prev)=>[...prev,{prompt:prompt,roles:"USER",id:Math.floor(Math.random())}])
      else setChatHistory([{prompt:prompt,roles:"USER",id:Math.floor(Math.random())}]) 
      setLoading(true);
      try {
        const obj = {
          prompt:prompt,
          selectedChat:selectedChat,
        }
        const resp = await fetch('/api/gpt',{
          method:"POST",
          body:JSON.stringify(obj),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        const res = await resp.json();
        console.log(res)
        setSelectedChat(res[0].chatid)
        
        if(chatHistory) setChatHistory((prev)=>[...prev,res[1]]);
        else setChatHistory([res[1]])
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    // Scroll to the bottom of the chat history div
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);


  useEffect(()=>{
    
    const getPrompts = async(id)=>{
      console.log(id)
      try {
        const resp = await fetch(`/api/chat/${id}`);
        const res = await resp.json();
        console.log(res)

        
        setChatHistory(res.data)
        
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
      finally{
        setLoading(false);
      }
    }

    if(selectedChat) {
      setLoading(true)
      getPrompts(selectedChat)
    }else{
      setChatHistory(null)
    }
    },[selectedChat])

  const { theme } = useTheme();
  const [prompt,setPrompt] = useState('');
  return (
    <section
      className={cn(
        `h-full w-full ${
          theme === "light" ? "bg-gray-300" : "bg-slate-800"
        } py-4 px-2`
      )}
    >
      <div className="flex items-center justify-between gap-4" >
        <h3 className="scroll-m-20 text-xl flex items-center gap-6 font-semibold tracking-tight">
      <SidebarOpen onClick={()=>setIsSideBarOpen(true)} className="md:hidden hover:scale-125 transition-all ease-in-out cursor-pointer" />
          ChatGPT-3.5
        </h3>
        <div className="btns flex items-center gap-4">
        <Button onClick={logout} >Signout</Button>
        <ToggleBtn />
        </div>
      </div>
      <div className={cn(`flex flex-col ${!selectedChat?"pt-32":"pt-12"} justify-between md:h-[95%] h-[80%] `)}>
        
        {!selectedChat?(<div className="mx-auto" >
          <Image
            className="mx-auto"
            src={"/gpt2.svg"}
            alt="gpt2"
            width={60}
            height={60}
          />
          <h3 className="mx-auto scroll-m-20 text-2xl font-semibold tracking-tight">
            How can I help you today?
          </h3>
        </div>):(<div ref={chatHistoryRef} className="flex flex-col gap-4 px-32 mt-4 h-full overflow-y-scroll pb-4" >
          {chatHistory?.map((e)=>(
              <div key={e.id} className="flex items-center gap-4 ">
                {e.roles==="USER"?<Image className="bg-white rounded-full" src={"/user-345.svg"} alt="userimg" width={30} height={30} />:(
                  <Image style={{background:"white"}} className="rounded-full" src={"/gpt.svg"} alt="gptimg" width={30} height={30} />
                  )}
                <div>
                  <h1 className="text-lg font-semibold" >{e.roles==="USER"?"You":"ChatGPT"}</h1>
                  <p>{e.prompt}</p>
                </div>
              </div>
          ))}

        </div>)}
        
        <div className="w-[80%] flex relative items-center mx-auto">
        {loading?<Input
            placeholder="Getting Response"
            disabled={true}
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyPress={getAnswer}
            value={prompt}
            className={cn(
              `${theme !== "light" ? "bg-[#020817]  border-white p-6" : "bg-white p-6"}`
            )}
          />:<Input
            placeholder="Message ChatGPT"
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyPress={getAnswer}
            value={prompt}
            className={cn(
              `${theme !== "light" ? "bg-[#020817]  border-white p-6" : "bg-white p-6"}`
            )}
          />}
          
          <Forward onClick={handleClick} style={!prompt?{color:"gray",width:"30px"}:{width:"30px",height:"30px"}} className="absolute cursor-pointer hover: right-2 my-auto" />
        </div>
      </div>
    </section>
  );
};

export default MainChatContainer;
