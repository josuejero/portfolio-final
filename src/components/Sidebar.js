import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import "../styles/_header.scss";
import Home from "../../public/home.png";
import About from "../../public/about.png";
import Blog from "../../public/blog.png";
import Contact from "../../public/contact.png";
import Image from "next/image";

const Header = ({ darkMode, setDarkMode }) => (
  <nav className={`sidebar ${darkMode ? "dark" : ""}`}>
    <ul className="image">
      <li>
        <BsFillMoonStarsFill
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-icon"
        />
      </li>
      <li>
        <Image src={Home} layout="fixed" width={25} height={25} />
      </li>
      <li>
        <Image src={About} layout="fixed" width={25} height={25} />
      </li>
      <li>
        <Image src={Blog} layout="fixed" width={25} height={25} />
      </li>
      <li>
        <Image src={Contact} layout="fixed" width={25} height={25} />
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
