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
    // Optional: Add analytics or other functionality when a skill is selected
    console.log('Selected skill:', skill);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8">
      {/* Hero Section */}
      <motion.section 
        className="relative text-center space-y-6"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          Josue Sebastian Jeronimo
        </h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-300">
          Full-Stack Developer
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Results-oriented Computer Engineering graduate with 7 years of programming experience, 
          specializing in software development, cloud computing, and automation.
        </p>
        
        {/* Interactive Die */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Roll the Die to Explore My Skills</h3>
          <Die onSkillSelect={handleSkillSelect} className="mx-auto" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownIcon className="h-6 w-6 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* Key Areas */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                     hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <skill.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 
                           dark:text-blue-100 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="text-center space-y-6"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold">Interested in learning more?</h3>
        <div className="flex justify-center gap-4">
          <a 
            href="/resume_fiu_canva_3.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white 
                     rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Download Resume</span>
            <ArrowDownIcon className="h-4 w-4" />
          </a>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 
                     text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 
                     dark:hover:bg-gray-600 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;