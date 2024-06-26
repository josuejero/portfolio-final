import type { NextPage } from "next";
import { Link as ScrollLink } from 'react-scroll';
import styles from "@/app/styles/Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: NextPage<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.menu}>
        <ScrollLink to="home" smooth={true} duration={500} onClick={() => {toggleSidebar(); window.location.hash = 'home';}}>
          <div className={styles.buttonWrapper}>Home</div>
        </ScrollLink>
        <ScrollLink to="about" smooth={true} duration={500} onClick={() => {toggleSidebar(); window.location.hash = 'about';}}>
          <div className={styles.buttonWrapper}>About</div>
        </ScrollLink>
        <ScrollLink to="projects" smooth={true} duration={500} onClick={() => {toggleSidebar(); window.location.hash = 'projects';}}>
          <div className={styles.buttonWrapper}>Projects</div>
        </ScrollLink>
        <ScrollLink to="blog" smooth={true} duration={500} onClick={() => {toggleSidebar(); window.location.hash = 'blog';}}>
          <div className={styles.buttonWrapper}>Blog</div>
        </ScrollLink>
        <ScrollLink to="contact" smooth={true} duration={500} onClick={() => {toggleSidebar(); window.location.hash = 'contact';}}>
          <div className={styles.buttonWrapper}>Contact</div>
        </ScrollLink>
      </div>
      <a href="/resume.pdf" className={styles.resumeButtonWrapper}>Resume</a>
    </div>
  );
};

export default Sidebar;
