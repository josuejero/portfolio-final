'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  highlights: string[];
  period: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  githubUrl, 
  demoUrl, 
  highlights,
  period 
}: ProjectProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <div className="flex gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                         rounded-full transition-colors"
              aria-label={`View ${title} on GitHub`}
            >
              <CodeBracketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                           rounded-full transition-colors"
                aria-label={`View ${title} demo`}
              >
                <GlobeAltIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Period */}
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-3 sm:mb-4">
          {period}
        </span>
        
        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        {/* Key Features */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg font-semibold mb-2">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base 
                         text-gray-600 dark:text-gray-300">
            {highlights.map((highlight, i) => (
              <li key={i} className="leading-relaxed">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 sm:px-3 py-0.5 sm:py-1 
                         text-xs sm:text-sm 
                         bg-blue-100 dark:bg-blue-900 
                         text-blue-800 dark:text-blue-100 
                         rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


const projectsData: ProjectProps[] = [
  {
    title: "Product Affordability Predictor",
    description: "A cash flow and product affordability application using Python and Django, managing financial data with PostgreSQL.",
    period: "October 2023 - Present",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes", "Jenkins", "OAuth"],
    githubUrl: "https://github.com/josuejero/product-affordability-predictor",
    highlights: [
      "Engineered a cash flow and product affordability application using Python and Django",
      "Implemented innovative financial data management solutions with PostgreSQL",
      "Incorporated external APIs via OAuth to improve user experience and retention",
      "Spearheaded the adoption of Docker and Kubernetes for deployment",
      "Designed a robust Jenkins CI/CD pipeline to automate updates"
    ]
  },
  {
    title: "Finance Tracker",
    description: "Personal finance tracker enabling users to monitor transactions with OAuth-secured account linking.",
    period: "May 2023 - Present",
    technologies: ["Python", "Django", "OAuth", "Google Cloud", "PyTest", "Selenium", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/josuejero/finance-tracker",
    highlights: [
      "Built a personal finance tracker with Python and Django",
      "Enabled secure account linking through OAuth integration",
      "Led establishment of deployment processes on Google Cloud with Docker and Kubernetes",
      "Streamlined testing workflows using PyTest and Selenium",
      "Maintained CI/CD pipeline through Jenkins to accelerate feature releases"
    ]
  },
  {
    title: "Selestino (Peruvian Recipe Generator)",
    description: "A recipe website developed using Python and PostgreSQL, with cloud infrastructure optimization.",
    period: "September 2022 - Present",
    technologies: ["Python", "PostgreSQL", "Docker", "Kubernetes", "Jenkins", "Google Cloud", "REST API"],
    githubUrl: "https://github.com/josuejero/selestino",
    highlights: [
      "Developed recipe website using Python and PostgreSQL",
      "Optimized application hosting on Google Cloud with Docker and Kubernetes",
      "Ensured scalable infrastructure through Jenkins CI/CD automation",
      "Improved application functionality by incorporating RESTful APIs",
      "Conducted comprehensive browser testing with Selenium to boost user satisfaction"
    ]
  },
  {
    title: "Fludde",
    description: "A multimedia review platform for Android using Java, with integrated social features and content sharing.",
    period: "April 2022 - Present",
    technologies: ["Android", "Java", "REST API", "Movie Database API"],
    githubUrl: "https://github.com/josuejero/Fludde",
    highlights: [
      "Collaborated on multimedia review platform development using Android and Java",
      "Leveraged Movie Database API for real-time content integration",
      "Created REST API to enable seamless user interaction",
      "Implemented social features and content sharing capabilities",
      "Contributed to launch and continuous feature enhancements"
    ]
  },
  {
    title: "FrameCast Web Portal",
    description: "A comprehensive web-based management system for digital photo frames, featuring device management, photo organization, and wireless connectivity through both Bluetooth and WiFi interfaces.",
    period: "2024",
    technologies: [
      "Python", 
      "Flask", 
      "RESTful API", 
      "SQLite",
      "Bluetooth",
      "WiFi",
      "pytest",
      "JavaScript",
      "HTML/CSS"
    ],
    githubUrl: "https://github.com/josuejero/FrameCast-Web-Portal",
    highlights: [
      "Developed comprehensive device management system for discovering and controlling digital photo frames",
      "Implemented dual connectivity with both Bluetooth and WiFi device discovery and management",
      "Created RESTful API endpoints for device operations and photo management",
      "Built user-friendly web interface for device configuration and photo organization",
      "Integrated automated testing suite using pytest for reliable deployment"
    ]
  },
  {
    title: "Cheapest Grocery Finder",
    description: "A web application that helps users locate the most affordable grocery items in their vicinity.",
    period: "2024 - Present",
    technologies: ["Python", "Django", "REST API", "PostgreSQL"],
    githubUrl: "https://github.com/josuejero/grocery-finder",
    highlights: [
      "Developed price comparison algorithm for grocery items",
      "Integrated with store APIs for real-time pricing data",
      "Implemented location-based store searching",
      "Created user-friendly interface for price comparison",
      "Built database for storing historical price data"
    ]
  },
  {
    title: "Ozzie Gonzalez Photography Portfolio",
    description: "A professional photography portfolio website built with Next.js, featuring a bilingual interface, image galleries, and workshop management for a professional photographer.",
    period: "2024",
    technologies: [
      "Next.js",
      "JavaScript",
      "SCSS",
      "Jest",
      "Cloudinary",
      "Vercel"
    ],
    githubUrl: "https://github.com/CourajeousMax/ozzie-photography",
    demoUrl: "https://ozzie-photography.vercel.app",
    highlights: [
      "Built responsive portfolio website with Next.js and SCSS for optimal performance",
      "Implemented bilingual support for English and Spanish speaking audiences",
      "Integrated Cloudinary for optimized image management and delivery",
      "Created dynamic gallery system with LightGallery.js for professional photo showcase",
      "Developed workshop management system for scheduling and displaying photography events"
    ]
  }
];

const ProjectsSection = () => {
  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 md:px-8 
                    space-y-6 sm:space-y-8 lg:space-y-12">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-center 
                   mb-4 sm:mb-6 lg:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={`${project.title}-${index}`}
            {...project}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;