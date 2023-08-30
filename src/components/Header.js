import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import "../styles/_header.scss";
import Home from "../../public/home.png"
import About from "../../public/about.png"
import Blog from "../../public/blog.png"
import Contact from "../../public/contact.png"
import Image from "next/image";

const Header = ({ darkMode, setDarkMode }) => (
  <nav className={`sidebar ${darkMode ? "dark" : ""}`}>
    {/* <h1 className="logo">developed-by-josue</h1> */}
    <ul className="image">
      <li>
        <BsFillMoonStarsFill
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-icon"
        />
      </li>
      <li>
        <Image src={Home}/>
      </li>
      <li>
        <Image src={About}/>
      </li>
      <li>
        <Image src={Blog}/>
      </li>
      <li>
        <Image src={Contact}/>
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
