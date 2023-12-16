import Image from "next/image"
import "../styles/_about.scss"

export default function About(){
    const services = [
        {
            title: "Beautiful Designs",
            description: "Creating elegant designs suited for your needs following core design theory.",
            tools: ["Photoshop", "Illustrator", "Figma", "Indesign"],
        },
        {
            title: "Code your dream project",
            description: "Turning your website idea into reality with HTML, CSS, JavaScript, and React.",
            tools: ["HTML", "CSS", "JavaScript", "React"],
        },
        {
            title: "Consulting",
            description: "Providing feedback and advice to enhance your projects with best practices and optimization.",
            tools: ["Project Evaluation", "Best Practices", "Optimization"],
        },
    ];
    return(
        <div className="AboutSection">
            <h3 className="services-heading">
                Services I Offer
            </h3>
            <p className="services-paragraph">
                As a freelance designer and developer, I&rsquo;ve partnered with agencies, startups, and collaborators to craft digital products for businesses and consumers.
            </p>
            <p className="services-paragraph">
                I provide diverse servies including branding, programming, and instruction.
            </p>
            <div className="service-container">
                {services.map((services, index) => (
                    <div className="service-item" key={index}>
                        <div className="service-content">
                            <div className="image-container">
                                {/* <Image src="" width={100} height={100} alt=""/> */}
                            </div>
                            <h3 className="title">
                                {services.title}
                            </h3>
                            <p className="description">
                                {services.description}
                            </p>
                            <h4 className="subtitle">
                                Tools I Use
                            </h4>
                            <ul className="tool-list">
                                {services.tools.map((tool, index) => (
                                    <li key={index}>{tool}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}