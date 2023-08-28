import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import "../styles/_header.scss";

const Header = ({ darkMode, setDarkMode }) => (
  <nav className={`sidebar ${darkMode ? "dark" : ""}`}>
    <h1 className="logo">developed-by-josue</h1>
    <ul className="image">
      <li>
        <BsFillMoonStarsFill
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-icon"
        />
      </li>
      <li>
        <a className="resume-link" href="#">
          Resume
        </a>
      </li>
    </ul>
  </nav>
);

export default Header;
