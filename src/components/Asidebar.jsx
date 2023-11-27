"use client";
import Image from "next/image";
import * as React from "react";
import { useTheme } from "next-themes";
import moment from "moment";
import {toast} from 'react-toastify'

import { Cross, DeleteIcon, FilePlus2, SidebarClose } from "lucide-react";

export function AsideBar({ setSelectedChat,selectedChat,isSidebarOpen,setIsSideBarOpen }) {
  const [chats, setChats] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { theme } = useTheme();
  React.useEffect(() => {
    const getChats = async () => {
      try {
        const resp = await fetch("/api/chat");
        const res = await resp.json();
        console.log(res)
        const chatsRefactored = res?.data?.map((e) => {
          const t = moment(e.created_at).fromNow();
          console.log(t);
          e.created_at = t;
          return e;
        });
        console.log(chatsRefactored);
        setChats(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }finally{
        setLoading(false)
      }
    };
    getChats();
  }, [selectedChat]);

  const deleteChat = async (id) => {
    try {
      const resp = await fetch(`/api/chat?chatid=${id}`, {
        method: "DELETE",
      });
      const res = await resp.json()
      console.log(res)
      if (resp.status === 200) {
        setChats((prev)=>prev.filter((e)=>e.id!==id))
        toast.success("Chat Deleted Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  console.log(theme)

  return (

    <>
    <section id={isSidebarOpen?"responsive-show":"responsive-noshow"} className={`flex ${theme==="dark"?"bg-slate-950":"bg-white"}  z-30 absolute flex-col h-full w-1/2 py-6 px-4`}>
      <div className="header flex justify-between">
        <div className="flex gap-1 flex-col lg:flex-row justify-center items-center">
          <Image
            src={"/gpt.svg"}
            alt="gpt"
            width={25}
            className="bg-white rounded-full"
            height={20}
          />
          
          <h3 className="scroll-m-20 text-sm lg:text-md font-semibold tracking-tight">
            Chats
          </h3>
        </div>
        <div className="cursor-pointer  p-1 flex justify-center gap-3 items-center">
          <FilePlus2 className="hover:scale-125 transition-all ease-in-out" onClick={()=>setSelectedChat(null)} style={{ width: "20px" }} />
          <SidebarClose className="hover:scale-125 transition-all ease-in-out" onClick={()=>setIsSideBarOpen(false)} />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {chats?.length > 0 &&
            chats?.map((e) => (
              <div className="rounded-md px-2 pt-1 mt-6">
                <div
                  className="flex items-center justify-between "
                >
                  <span className=" cursor-pointer" onClick={() => setSelectedChat(e.id)} >{e?.Prompts[0]?.prompt}</span>
                  <DeleteIcon 
                    onClick={() => deleteChat(e.id)}
                    style={{ width: "25px",color:"red" }}
                    className="hover:bg-white z-30 ml-4 rounded-sm cursor-pointer"
                  />
                </div>
                <span className="text-xs font-light opacity-40">
                  {e.created_at}
                </span>
              </div>
            ))}
        </>
      )}
    </section>
    <section className="md:flex hidden flex-col h-full basis-1/5 py-6 px-4">
      <div className="header flex justify-between">
        <div className="flex gap-1 flex-col lg:flex-row justify-center items-center">
          <Image
            src={"/gpt.svg"}
            alt="gpt"
            width={25}
            className="bg-white rounded-full"
            height={20}
          />
          <h3 className="scroll-m-20 text-sm lg:text-md font-semibold tracking-tight">
            Chats
          </h3>
        </div>
        <div className="cursor-pointer p-1 flex justify-center items-center">
          <FilePlus2 className="hover:scale-125 transition-all ease-in-out" onClick={()=>setSelectedChat(null)} style={{ width: "20px" }} />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {chats?.length > 0 &&
            chats?.map((e) => (
              <div className="rounded-md px-2 pt-1 mt-6">
                <div
                  className="flex   items-center justify-between "
                >
                  <span className="cursor-pointer text-md font-light md:text-lg md:font-semibold" onClick={() => setSelectedChat(e.id)} >{e?.Prompts[0]?.prompt}</span>
                  <DeleteIcon 
                    onClick={() => deleteChat(e.id)}
                    style={{ width: "25px",color:"red" }}
                    className="hover:bg-white z-30 rounded-sm cursor-pointer"
                  />
                </div>
                <span className="text-xs font-light opacity-40">
                  {e.created_at}
                </span>
              </div>
            ))}
        </>
      )}
    </section>
    </>
  );
}
