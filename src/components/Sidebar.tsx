"use client";
import Image from "next/image";
import "../styles/_sidebar.scss";

const sections = [
    { className: "HomeSection", label: "Home" },
    { className: "AboutSection", label: "About" },
    { className: "BlogSection", label: "Blog" },
    { className: "ContactSection", label: "Contact" },
];

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const scrollToSection = (className: string) => {
        const element = document.querySelector(`.${className}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar}>
                {isOpen ? "Close" : "Open"} Sidebar
            </button>
            <ul>
                {sections.map(section => (
                    <li key={section.className} onClick={() => scrollToSection(section.className)}>
                        <Image src={`/${section.label.toLowerCase()}.svg`} width={25} height={25} alt={section.label} />
                        <span>{section.label}</span>
                    </li>
                ))}
                <li>
                    <a href="Resume.pdf">Resume</a>
                </li>
            </ul>
        </div>
    );
}
