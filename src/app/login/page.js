"use client"
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import connectSupabase from "../../lib/supabase";
import { toast } from "react-toastify";


const Login = () => {
    const [credentials,setCredentials] = useState({email:'',password:''});
    const router = useRouter();
    const handleChange = async(e)=>{
      
        setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const login = async(e)=>{
        e.preventDefault();
        try {
          const resp = await fetch("/api/login",{
            method:"POST",
            body:JSON.stringify(credentials),
            headers:{
             'Content-Type': 'application/json',
            }
          })
          const {data,error} = await resp.json();
         if(data){
          toast.success("User Logged in successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(()=>router.push("/"),2000)
        }else if(error){
          toast.error(error.message,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        }
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <main className="flex md:flex-row flex-col h-[100vh] w-full" >
      <aside style={{flexBasis:"170%"}} className="p-6 bg-black h-full" >
      <div className="flex items-center gap-2" >
        <h1 className="text-[#d292ff] text-2xl font-bold">
          ChatGPT {" "}
        </h1>
        <span style={{width:"20px", height:"20px"}} className="bg-[#d292ff] rounded-full"></span>
        </div>
        <div className="pt-44" >
          <h1 className="text-[#d292ff] font-bold text-5xl" >ChatGPT Clone Project</h1>
          <h2 className="text-[#dbc6e9] font-bold text-xl mt-4">To get AI based Solutions for your problems</h2>
        </div>
      </aside>
      <div className="w-full flex justify-start gap-24 px-12 md:px-20 py-12 flex-col  h-full bg-black" >
      <h1 className="mx-auto text-3xl text-white font-bold " >Get Started</h1>
        <form onSubmit={login} className="flex rounded-md flex-col gap-8 py-6">
            <h1 className="text-white font-bold text-2xl" >
                Account Login
            </h1>
            <Input name="email" onChange={handleChange} placeholder="Enter you Email" className="" />
            <Input name="password" onChange={handleChange} placeholder="Enter you Password" type="password" className="" />
            <div className="flex flex-col" >
            <Button variant="secondary" >
                Login
            </Button>
            <Link href={"/signup"} className="text-gray-400 cursor-pointer mx-auto" >Don't have an Account?Signup</Link>
            </div>
        </form>

      </div>
    </main>
  );
};

export default Login;
