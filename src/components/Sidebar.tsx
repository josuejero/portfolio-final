"use client";
import { useState } from "react";
import Image from "next/image";
import "../styles/_sidebar.scss";

type Section = {
    className: string;
    label: string;
};

const sections: Section[] = [
    {
        className: ".HomeSection", 
        label: "Home"
    },
    {
        className: ".AboutSection",
        label: "About"
    },
    {
        className: ".BlogSection",
        label: "Blog"
    },
    {
        className: ".contact-section",
        label: "Contact"
    },
];

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void; // Assuming toggleSidebar is a function that returns void
};

export default function Sidebar({isOpen, toggleSidebar}: SidebarProps) {
    // Removed the useState and function declaration for isOpen and toggleSidebar
    
    const scrollToSection = (className: string) => {
        const element = document.querySelector(className);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar}>
                {isOpen ? "Open" : "Close"} Sidebar
            </button>
            <ul className="image">
                {sections.map((section) => (
                    <li key={section.className}>
                        <div className="nav-link" onClick={() => scrollToSection(section.className)}>
                            <div className="image-container">
                                <Image src={`/${section.label.toLowerCase()}.svg`} width={25} height={25} alt={section.label} />
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
    );
}
