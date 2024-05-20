import type { NextPage } from "next";
import styles from "@/app/styles/Sidebar.module.scss";

const Sidebar: NextPage = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <div className={styles.buttonWrapper}>Home</div>
        <div className={styles.buttonWrapper}>About</div>
        <div className={styles.buttonWrapper}>Projects</div>
        <div className={styles.buttonWrapper}>Blog</div>
        <div className={styles.buttonWrapper}>Contact</div>
      </div>
      <div className={styles.resumeButtonWrapper}>Resume</div>
    </div>
  );
};

export default Sidebar;
