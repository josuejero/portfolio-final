'use client';

import { motion } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon, CloudIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const skills = [
    { category: "Languages", items: ["Java", "C", "C++", "Python", "JavaScript", "HTML5", "SCSS"] },
    { category: "Frameworks & Libraries", items: ["ReactJS", "Django", "Node.js"] },
    { category: "Cloud & DevOps", items: ["Docker", "Kubernetes", "Jenkins", "Google Cloud Platform", "Microsoft Azure"] },
    { category: "Databases", items: ["PostgreSQL", "SQLite"] },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-4"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1 className="text-5xl font-bold">Josue Sebastian Jeronimo</h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-300">Full-Stack Developer</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Results-oriented Computer Engineering graduate with 7 years of programming experience, specializing in software development,
          cloud computing, and automation.
        </p>
      </motion.section>

      {/* Key Areas */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <CodeBracketIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Software Development</h3>
          <p className="text-gray-600 dark:text-gray-300">Full-stack development with modern frameworks and technologies</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <CloudIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Cloud Computing</h3>
          <p className="text-gray-600 dark:text-gray-300">Experience with GCP, Azure, and cloud-native technologies</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <CommandLineIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Automation</h3>
          <p className="text-gray-600 dark:text-gray-300">CI/CD pipelines and process automation expertise</p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="space-y-6"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="text-center"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <a 
          href="/resume_fiu_canva_3.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download Resume
        </a>
      </motion.section>
    </div>
  );
};

export default Home;