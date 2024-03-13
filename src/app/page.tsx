"use client";
import React, { useState } from "react";
import "../styles/_main.scss";
import HomeSection from "@/components/HomeSection";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Dice from "@/components/Dice";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

  return (
    <main>
      <div className={`scrollable-child ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"} Sidebar
        </button>
        <HomeSection />
        <About />
        <Dice />
        <Blog />
        <Contact />
      </div>
      <div className={`fixed-child ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </main>
  );
}
