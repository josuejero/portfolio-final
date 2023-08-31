import React from "react";
import Image from "next/image";
import "../styles/_portfolio.scss";

const webImages = [
  "/web1.png",
  "/web2.png",
  "/web3.png",
  "/web4.png",
  "/web5.png",
  "/web6.png"
];

const Portfolio = ({ darkMode }) => (
  <section className="portfolio-section">
    <div>
      <h3 className={`portfolio-heading ${darkMode ? "dark" : ""}`}>Portfolio</h3>
    </div>
    <div className="portfolio-image-container">
      {webImages.map((image, index) => (
        <div key={index} className="image-item">
          <Image className="rounded-lg object-cover" width={500} height={300} layout="responsive" src={image} alt="" />
        </div>
      ))}
    </div>
  </section>
);

export default Portfolio;