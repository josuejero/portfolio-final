
"use client"
import React, { useState } from "react";
import Head from "next/head";
import "../styles/main.scss";

import Sidebar from "../components/Sidebar";
import HomeSection from "../components/HomeSection";
import About from "../components/About";
import Blog from "../components/Blog";
import Contact from "../components/Contact";

const sections = [
  { id: "HomeSection", component: HomeSection },
  { id: "AboutSection", component: About },
  { id: "BlogSection", component: Blog },
  { id: "ContactSection", component: Contact },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className={`dark ${darkMode ? "dark" : ""}`}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../favicon.ico" />
      </Head>
      <main className={`main ${darkMode ? "dark" : ""}`}>
        <div className={`fixed-child ${sidebarVisible ? "" : "hiding-class"}`}>
          <button className="toggle-button" onClick={toggleSidebar}>
            Toggle Sidebar
          </button>
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <div className={`scrollable-child ${sidebarVisible ? "" : "expanded"}`}>
          <button className="toggle-button" onClick={toggleSidebar}>
            Toggle Sidebar
          </button>
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              {React.createElement(section.component, { darkMode })}
              <a className="resume-button" href="/path/to/your/resume.pdf" download="resume.pdf">
                Resume
              </a>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
