import React from "react";
import Image from "next/image";
import "../styles/_service.scss";

const Service = ({ darkMode }) => {
  const services = [
    {
      image: require("../../public/design.png"),
      title: "Beautiful Designs",
      description: "Creating elegant designs suited for your needs following core design theory.",
      tools: ["Photoshop", "Illustrator", "Figma", "Indesign"],
    },
    {
      image: require("../../public/code.png"),
      title: "Code your dream project",
      description: "Turning your website idea into reality with HTML, CSS, JavaScript, and React.",
      tools: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      image: require("../../public/consulting.png"),
      title: "Consulting",
      description: "Providing feedback and advice to enhance your projects with best practices and optimization.",
      tools: ["Project Evaluation", "Best Practices", "Optimization"],
    },
  ];

  return (
    <div>
      <h3 className={`services-heading ${darkMode ? "dark" : ""}`}>Services I offer</h3>
      <p className={`services-paragraph ${darkMode ? "dark" : ""}`}>
        As a freelance designer and developer, I&rsquo;ve partnered with agencies, startups, and collaborators to craft digital products for businesses and consumers.
      </p>
      <p className={`services-paragraph ${darkMode ? "dark" : ""}`}>
        I provide diverse services including branding, programming, and instruction.
      </p>
      <div className={`service-container ${darkMode ? "dark" : ""}`}>
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-content">
              <div className="image-container">
                <Image src={service.image} width={100} height={100} alt="" />
              </div>
              <h3 className="title">{service.title}</h3>
              <p className="description">{service.description}</p>
              <h4 className="subtitle">Tools I Use</h4>
              <ul className="tool-list">
                {service.tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
