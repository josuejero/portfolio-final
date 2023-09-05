import React from "react";
import Image from "next/image";
import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import deved from "../../public/dev-ed-wave.png";
import "../styles/_hero-section.scss";
import Die from '../components/Die'

const HeroSection = ({ darkMode }) => (
  <div className={`my-container ${darkMode ? "dark" : ""}`}>
    <h2 className={`my-heading-1 ${darkMode ? "dark" : ""}`}>Josue Jeronimo</h2>
    <h3 className={`my-heading-2 ${darkMode ? "dark" : ""}`}>Developer and designer.</h3>
    <p className={`my-paragraph ${darkMode ? "dark" : ""}`}>
      Freelancer providing services for programming and design content needs. Join me below and let&rsquo;s get started!
    </p>
    <div className={`my-social-icons ${darkMode ? "dark" : ""}`}>
      <AiFillTwitterCircle className="social-icon" />
      <AiFillLinkedin className="social-icon" />
      <AiFillYoutube className="social-icon" />
    </div>
    <Die/>
    <div className="my-image-wrapper">
      <div className="my-image-container">
        <Image src={deved} layout="fill" objectFit="cover" alt="" />
      </div>
    </div>
  </div>
);

export default HeroSection;
