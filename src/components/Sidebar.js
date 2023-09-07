import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Image from "next/image";
import "../styles/_sidebar.scss";

const sections = [
  { id: "#HomeSection", label: "Home" },
  { id: "#AboutSection", label: "About" },
  { id: "#BlogSection", label: "Blog" },
  { id: "#ContactSection", label: "Contact" },
];

const Sidebar = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToSection = (id) => {
    // Implement your scrollToSection function here
  };

  return (
    <nav className="sidebar">
      <ul className="image">
        <li>
          <BsFillMoonStarsFill onClick={toggleDarkMode} className="dark-mode-icon" />
        </li>
        {sections.map((section) => (
          <li key={section.id}>
            <div className="nav-link" onClick={() => scrollToSection(section.id)}>
              <div className="image-container">
                <Image src={`/${section.label.toLowerCase()}.png`} width={25} height={25} alt="" />
                <span className="button-name">{section.label}</span>
              </div>
            </div>
          </li>
        ))}
        <li>
          <a className="resume-link" href="Resume.pdf" download="resume.pdf">
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
