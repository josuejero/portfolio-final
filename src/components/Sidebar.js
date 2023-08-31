import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import "../styles/_header.scss";
import Image from "next/image";

const sections = [
  { id: "#HomeSection", label: "Home" },
  { id: "#AboutSection", label: "About" },
  { id: "#BlogSection", label: "Blog" },
  { id: "#ContactSection", label: "Contact" },
];

const Sidebar = ({ darkMode, setDarkMode }) => (
  <nav className={`sidebar ${darkMode ? "dark" : ""}`}>
    <ul className="image">
      <li>
        <BsFillMoonStarsFill
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-icon"
        />
      </li>
      {sections.map((section) => (
        <li key={section.id}>
          <button
            className="nav-link"
            onClick={() => scrollToSection(section.id)}
          >
            <Image
              src={`/${section.label.toLowerCase()}.png`}
              layout="fixed"
              width={25}
              height={25}
              alt=""
            />
            <span className="button-name">{section.label}</span>
          </button>
        </li>
      ))}
      <li>
        <a className="resume-link" href="#">
          Resume
        </a>
      </li>
    </ul>
  </nav>
);

// Function to scroll to a section with a given ID
const scrollToSection = (sectionId) => {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default Sidebar;
