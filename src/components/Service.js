import React from "react";
import Image from "next/image";
import design from "../../public/design.png";
import code from "../../public/code.png";
import consulting from "../../public/consulting.png";
import "../styles/_service.scss";

const Service = ({ darkMode }) => {
  const services = [
    {
      image: design,
      title: "Beautiful Designs",
      description: "Creating elegant designs suited for your needs following core design theory.",
      tools: ["Photoshop", "Illustrator", "Figma", "Indesign"],
    },
    {
      image: code,
      title: "Code your dream project",
      description: "Do you have an idea for your next great website? Let's make it a reality.",
      tools: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      image: consulting,
      title: "Consulting",
      description: "Are you interested in feedback for your current project? I can give you tips and tricks to level it up.",
      tools: ["Project Evaluation", "Best Practices", "Optimization"],
    },
  ];

  return (
    <div>
      <div>
        <h3 className={`services-heading ${darkMode ? "dark" : ""}`}>Services I offer</h3>
        <p className={`services-paragraph ${darkMode ? "dark" : ""}`}>
          Since the beginning of my journey as a freelance designer and developer, I have worked with agencies,
          startups, and collaborated with others to create digital products for business and consumer use.
        </p>
        <p className={`services-paragraph ${darkMode ? "dark" : ""}`}>
          I offer a variety of services, including brand design, programming, and teaching.
        </p>
      </div>
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
