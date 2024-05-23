import type { NextPage } from "next";
import Image from "next/image";
import DiceSection from "@/components/DiceSection";
import Sidebar from "@/components/sidebar";
import About from "@/components/about";
import Blog from "@/components/blog";
import styles from "@/app/page.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.mainContent}>
        <main className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <div className={styles.closeButtonParent}>
              <button className={styles.closeButton}>Close</button>
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
        </main>
        <About />
        <Blog />
        {/* Future full-window components can be added here */}
        <div className={styles.section}>
          <h1>Future Component 1</h1>
        </div>
        <div className={styles.section}>
          <h1>Future Component 2</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;