"use client"
import React, { useState } from "react";
import Head from "next/head";
import "../styles/main.scss";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Service from "@/components/Service";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`dark ${darkMode ? "dark" : ""}`}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../favicon.ico" />
      </Head>
      <main className={`main ${darkMode ? "dark" : ""}`}>
        <div className="fixed-child">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>



        <div className="scrollable-child">
          <section className="section-1">
            <HeroSection darkMode={darkMode} />
          </section>
          <section>
            <Service darkMode={darkMode} />
          </section>
          <section className="section-2">
            <Portfolio darkMode={darkMode}/>
          </section>
        </div>
        
        
      </main>
    </div>
  );
}