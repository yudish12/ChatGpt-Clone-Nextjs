"use client";
import React, { useState } from 'react'
import { AsideBar } from '../components/Asidebar'
import MainChatContainer from '../components/MainChatContainer'

const MainScreen = () => {
    const [selectedChat,setSelectedChat] = useState(null);
    const [isSidebarOpen,setIsSideBarOpen] = useState(false);
  return (
    <>
        <AsideBar selectedChat={selectedChat} isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} setSelectedChat={setSelectedChat} />
        <MainChatContainer setSelectedChat={setSelectedChat} setIsSideBarOpen={setIsSideBarOpen} selectedChat={selectedChat} />
    </>
  )
}

export default MainScreen