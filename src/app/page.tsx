"use client"
import "../styles/_main.scss"
import HomeSection from '@/components/HomeSection'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Dice from '@/components/Dice'
import Sidebar from '@/components/Sidebar'
import { useState } from "react"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <main>
      <div className={`fixed-child ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <button className="toggle-button" onClick={toggleSidebar}>{isSidebarOpen ? "Close" : "Open"} Sidebar</button>
        <Sidebar/>
      </div>
      <div className="scrollable-child">
      <button className="toggle-button" onClick={toggleSidebar}>{isSidebarOpen ? "Close" : "Open"} Sidebar</button>
        <HomeSection/>
        <About/>
        <Dice/>
        <Blog/>
        <Contact/>
      </div>
    </main>
  )
}
