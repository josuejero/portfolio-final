"use client";

import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import DiceSection from "@/components/DiceSection";
import Sidebar from "@/components/sidebar";
import About from "@/components/about";
import Projects from "@/components/projects";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import styles from "@/app/page.module.scss";

const Home: NextPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.home}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${styles.mainContent} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <section id="home" className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <div className={styles.closeButtonParent}>
              <button className={styles.closeButton} onClick={toggleSidebar}>
                {isSidebarOpen ? 'Close' : 'Open'}
              </button>
            </div>
            <div className={styles.frameContainer}>
              <div className={styles.josuJernimoParent}>
                <h2 className={styles.josuJernimo}>Josué Jerónimo</h2>
                <div className={styles.softwareEngineer}>Software Engineer</div>
              </div>
              <div className={styles.socialButtons}>
                <Image
                  className={styles.socialIcon}
                  src="/github.svg"
                  alt="GitHub Logo"
                  width={40}
                  height={40}
                />
                <Image
                  className={styles.socialIcon}
                  src="/linkedin.svg"
                  alt="LinkedIn Logo"
                  width={40}
                  height={40}
                />
                <Image
                  className={styles.socialIcon}
                  src="/twitter.svg"
                  alt="Twitter Logo"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
          <DiceSection />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default Home;
