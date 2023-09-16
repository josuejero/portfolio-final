"use client"
import Image from "next/image"
import "../styles/_sidebar.scss"

type Section = {
    id: string;
    label: string;
};

const sections: Section[] = [
    {
        id: "#HomeSection", 
        label: "Home"
    },
    {
        id: "#AboutSection",
        label: "About"
    },
    {
        id: "BlogSection",
        label: "Blog"
    },
    {
        id: "#ContactSection",
        label: "Contact"
    },
]

export default function Sidebar(){

    const scrollToSection = (id: string) => {
        
    }

    return(
        <div className="sidebar">
            <ul className="image">
                <li>
                </li>
                {sections.map((section) => (
                    <li key={section.id}>
                        <div className="nav-link" onClick={() => scrollToSection(section.id)}>
                            <div className="image-container">
                                <Image src={`/${section.label.toLowerCase()}.png`} width={25} height={25} alt=""/>
                                <span className="button-name">{section.label}</span>
                            </div>
                        </div>
                    </li>
                ))}
                <li>
                    <a className="resume-link" href="Resume.pdf">
                        Resume
                    </a>
                </li>
            </ul>
        </div>
    )
}
