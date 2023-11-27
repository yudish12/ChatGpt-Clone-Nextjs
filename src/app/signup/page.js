"use client";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/signup",{
        method:"POST",
        body:JSON.stringify(credentials),
        headers:{
         'Content-Type': 'application/json',
        }
      })
      const {data,error} = await resp.json();
      console.log(data, error);
      if(data){
        toast.success("User Registered successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(()=>router.replace("/"),2000)
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
  };

  return (
    <main className="flex flex-col  md:flex-row h-[100vh] w-full">
      <aside style={{ flexBasis: "170%" }} className="p-6 bg-black h-full">
        <div className="flex items-center gap-2">
          <h1 className="text-[#d292ff] text-2xl font-bold">ChatGPT </h1>
          <span
            style={{ width: "20px", height: "20px" }}
            className="bg-[#d292ff] rounded-full"
          ></span>
        </div>
        <div className="pt-44">
          <h1 className="text-[#d292ff] font-bold text-5xl">
            Brainstorming Promts
          </h1>
          <h2 className="text-[#dbc6e9] font-bold text-xl mt-4">
            Why the linked list is empty
            <br /> after i reversed it?
          </h2>
        </div>
      </aside>
      <div className="w-full flex justify-start gap-24  py-12 flex-col  h-full bg-black">
        <h1 className="mx-auto text-3xl text-white font-bold ">Register Your Account</h1>
        <form
          onSubmit={createAccount}
          className="flex rounded-md flex-col gap-8 px-12 py-6"
        >
          <h1 className="text-white font-bold text-2xl">Account Signup</h1>
          <Input
            name="email"
            onChange={handleChange}
            placeholder="Enter you Email"
            type="email"
            className=""
          />
          <Input
            name="password"
            onChange={handleChange}
            placeholder="Enter you Password"
            type="password"
            className=""
          />
          <div className="flex flex-col">
            <Button variant="secondary">Register</Button>
            <Link
              href={"/login"}
              className="text-gray-400 cursor-pointer mx-auto"
            >
              Already have an Account?Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
