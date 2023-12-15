import React from "react";
import Image from "next/image";
import "../styles/_blog.scss";

const webImages: string[] = [
];

interface PortfolioProps {
}

const Portfolio: React.FC<PortfolioProps> = ({  }) => (
    <section className="BlogSection">
        <div>
            <h3 className="portfolio-heading">Portfolio</h3>
        </div>
        <div className="portfolio-image-container">
        {webImages.map((image, index) => (
            <div key={index} className="image-item">
            <Image className="rounded-lg object-cover" width={500} height={300}  src={image} alt="" />
            </div>
        ))}
        </div>
    </section>
);

export default Portfolio;
