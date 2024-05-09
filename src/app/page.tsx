import Image from "next/image";
import styles from "./page.module.scss";
import type { NextPage } from "next";
import Dice from "@/components/dice";
import Sidebar from "@/components/sidebar";

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <Image
        className={styles.twitterIcon}
        src="/twitter.svg"
        alt="Twitter Logo"
        width={50} // Set appropriate width
        height={50} // Set appropriate height
        fill={false} // New prop to replace layout="fixed"
      />
      <Image
        className={styles.linkedinIcon}
        src="/linkedin.svg"
        alt="LinkedIn Logo"
        width={50} // Set appropriate width
        height={50} // Set appropriate height
        fill={false} // New prop to replace layout="fixed"
      />
      <Image
        className={styles.githubIcon}
        src="/github.svg" // Corrected path
        alt="GitHub Logo"
        width={50} // Set appropriate width
        height={50} // Set appropriate height
        fill={false} // New prop to replace layout="fixed"
      />
      <Dice />
      <Sidebar />
      <div className={styles.softwareEngineer}>Software Engineer</div>
      <h2 className={styles.josueJeronimo}>Josué Jerónimo</h2>
    </div>
  );
}

export default Home;
