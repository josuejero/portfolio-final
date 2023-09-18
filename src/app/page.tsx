"use client";
import "../styles/_main.scss";
import HomeSection from "@/components/HomeSection";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Dice from "@/components/Dice";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    if (typeof window !== "undefined") {
      // Check if window object is defined (i.e., running in the browser)
      setIsSmallScreen(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <main>
      {isSmallScreen ? (
        <div className={`header ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close" : "Open"} Sidebar
          </button>
          <Sidebar />
        </div>
      ) : (
        <div className={`fixed-child ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Sidebar />
        </div>
      )}

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
    </main>
  );
}
