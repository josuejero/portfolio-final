import type { NextPage } from "next";
import Link from 'next/link';
import styles from "@/app/styles/Sidebar.module.scss";

const Sidebar: NextPage = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <Link href="#home" passHref>
          <div className={styles.buttonWrapper}>Home</div>
        </Link>
        <Link href="#about" passHref>
          <div className={styles.buttonWrapper}>About</div>
        </Link>
        <Link href="#projects" passHref>
          <div className={styles.buttonWrapper}>Projects</div>
        </Link>
        <Link href="#blog" passHref>
          <div className={styles.buttonWrapper}>Blog</div>
        </Link>
        <Link href="#contact" passHref>
          <div className={styles.buttonWrapper}>Contact</div>
        </Link>
      </div>
      <Link href="/resume.pdf" passHref>
        <div className={styles.resumeButtonWrapper}>Resume</div>
      </Link>
    </div>
  );
};

export default Sidebar;
