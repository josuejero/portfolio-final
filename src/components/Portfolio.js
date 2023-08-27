import React from "react";
import Image from "next/image";

import web1 from "../../public/web1.png";
import web2 from "../../public/web2.png";
import web3 from "../../public/web3.png";
import web4 from "../../public/web4.png";
import web5 from "../../public/web5.png";
import web6 from "../../public/web6.png";
import "../styles/_portfolio.scss"

const webImages = [
  "/web1.png",
  "/web2.png",
  "/web3.png",
  "/web4.png",
  "/web5.png",
  "/web6.png"
];


const Portfolio = ({darkMode}) => {
  const portfolioImages = [web1, web2, web3, web4, web5, web6];

  return (
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
};

export default Portfolio;
