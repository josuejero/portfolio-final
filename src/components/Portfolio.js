import React from "react";
import Image from "next/image";

import web1 from "../../public/web1.png";
import web2 from "../../public/web2.png";
import web3 from "../../public/web3.png";
import web4 from "../../public/web4.png";
import web5 from "../../public/web5.png";
import web6 from "../../public/web6.png";
import "../styles/_portfolio.scss"

const Portfolio = () => {
  const portfolioImages = [web1, web2, web3, web4, web5, web6];

  return (
    <section className="portfolio-section">
      <div className="content-container">
        <h3 className="section-heading">Portfolio</h3>
        <p className="section-paragraph">
          Since the beginning of my journey as a freelance designer and developer,
          I have done remote work for{" "}
          <span className="highlighted-text">agencies</span> consulted for{" "}
          <span className="highlighted-text">startups</span> and
          collaborated with talented people to create digital products for both
          business and consumer use.
        </p>
        <p className="section-paragraph">
          I offer a wide range of services, including brand design, programming,
          and teaching.
        </p>
      </div>
      <div className="flex-container">
        {portfolioImages.map((image, index) => (
          <div key={index} className="portfolio-item">
            <Image
              className="image-item"
              width={"100%"}
              height={"100%"}
              layout="responsive"
              src={image}
              alt=""
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
