'use client';

import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  CommandLineIcon, 
  CloudIcon,
  ArrowDownIcon 
} from '@heroicons/react/24/outline';
import Die from '@/components/Die';
import { Skill } from '@/components/Die/types';

const Home = () => {
  const skills = [
    { 
      category: "Languages", 
      items: ["Java", "C", "C++", "Python", "JavaScript", "HTML5", "SCSS"],
      icon: CodeBracketIcon
    },
    { 
      category: "Frameworks & Libraries", 
      items: ["ReactJS", "Django", "Node.js"],
      icon: CommandLineIcon
    },
    { 
      category: "Cloud & DevOps", 
      items: ["Docker", "Kubernetes", "Jenkins", "Google Cloud Platform", "Microsoft Azure"],
      icon: CloudIcon
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleSkillSelect = (skill: Skill) => {
    console.log('Selected skill:', skill);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8 px-4 md:px-8 pl-16">
      {/* Hero Section */}
      <motion.section 
        className="relative w-full max-w-3xl mx-auto"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group mb-6"
          >
            {/* Profile Image with hover effects */}
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-blue-600 dark:ring-blue-500 
                          transition-all duration-300 group-hover:ring-opacity-80 group-hover:shadow-xl">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src="/images/profile.png"
                  alt="Josue Sebastian Jeronimo"
                  className="w-full h-full object-cover transition-transform duration-500 
                           scale-105 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 
                              transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-4 py-2 rounded-full 
                         text-sm font-medium shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Open to Work
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                         from-blue-600 to-violet-600 transition-colors duration-300 
                         hover:from-violet-600 hover:to-blue-600 leading-tight">
              Josue Sebastian Jeronimo
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 whitespace-nowrap overflow-hidden"
            >
              Software Engineer<span className="mx-2 text-blue-600">•</span>
              Data Engineer<span className="mx-2 text-blue-600">•</span>
              Network Engineer<span className="mx-2 text-blue-600">•</span>
              Automation Engineer
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
            >
              Results-oriented Computer Engineering graduate with 7 years of programming experience, 
              specializing in software development, cloud computing, and automation.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Interactive Die */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Roll the Die to Explore My Skills</h3>
          <Die onSkillSelect={handleSkillSelect} className="mx-auto" />
        </motion.div>
      </motion.section>

      {/* Key Areas with hover animations */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                     transition-all duration-300 ease-in-out"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              y: -5 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4">
              <skill.icon />
            </div>
            <h3 className="text-xl font-semibold mb-3">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, itemIndex) => (
                <motion.span
                  key={itemIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 
                           dark:text-blue-100 rounded-full text-sm"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Call to Action with hover animations */}
      <motion.section 
        className="text-center space-y-6 w-full max-w-3xl mx-auto"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold">Interested in learning more?</h3>
        <div className="flex justify-center gap-4">
          <motion.a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white 
                     rounded-lg transition-colors"
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Download Resume</span>
            <ArrowDownIcon className="h-4 w-4" />
          </motion.a>
          <motion.a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 
                     text-gray-800 dark:text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;