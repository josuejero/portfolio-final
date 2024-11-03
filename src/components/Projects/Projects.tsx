'use client';

import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Product Affordability Predictor",
      period: "October 2023 - Present",
      description: "Cash flow and product affordability application",
      technologies: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes", "Jenkins"],
      highlights: [
        "Engineered a cash flow and product affordability application managing financial data with PostgreSQL",
        "Implemented OAuth integration for improved user experience",
        "Designed robust Jenkins CI/CD pipeline for automated updates"
      ]
    },
    {
      title: "Finance Tracker",
      period: "May 2023 - Present",
      description: "Personal finance tracking application",
      technologies: ["Python", "Django", "OAuth", "Google Cloud", "PyTest", "Selenium"],
      highlights: [
        "Built personal finance tracker with secure account linking",
        "Established deployment processes on Google Cloud",
        "Streamlined testing workflows reducing deployment time"
      ]
    },
    {
      title: "Selestino",
      period: "September 2022 - Present",
      description: "Recipe website with cloud infrastructure",
      technologies: ["Python", "PostgreSQL", "Docker", "Kubernetes", "Jenkins", "Google Cloud"],
      highlights: [
        "Developed recipe website using Python and PostgreSQL",
        "Optimized application hosting on Google Cloud",
        "Improved functionality with RESTful APIs"
      ]
    },
    {
      title: "Fludde",
      period: "April 2022 - Present",
      description: "Multimedia review platform",
      technologies: ["Android", "Java", "REST API"],
      highlights: [
        "Collaborated on multimedia review platform development",
        "Leveraged Movie Database API for real-time content",
        "Created REST API for user interactions"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <motion.h2 
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{project.period}</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;