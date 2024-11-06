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
    <div className="w-full max-w-full mx-auto 
                    space-y-8 sm:space-y-12 lg:space-y-16 
                    py-4 sm:py-6 lg:py-8 
                    px-4 sm:px-6 lg:px-8">
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
            className="relative group mb-4 sm:mb-6"
          >
            {/* Profile Image with hover effects */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 
                            rounded-full overflow-hidden 
                            ring-4 ring-blue-600 dark:ring-blue-500 
                            transition-all duration-300 
                            group-hover:ring-opacity-80 group-hover:shadow-xl">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src="/images/profile.png"
                  alt="Josue Sebastian Jeronimo"
                  className="w-full h-full object-cover transition-transform duration-500 
                             scale-105 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 
                                opacity-0 transition-opacity duration-300 
                                group-hover:opacity-100"></div>
              </div>
            </div>
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-blue-600 text-white 
                          px-3 py-1.5 sm:px-4 sm:py-2 
                          text-xs sm:text-sm 
                          rounded-full font-medium shadow-lg"
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
            className="space-y-3 sm:space-y-4 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                          bg-clip-text text-transparent bg-gradient-to-r 
                          from-blue-600 to-violet-600 
                          leading-tight">
              Josue Sebastian Jeronimo
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl 
                          text-gray-600 dark:text-gray-300 
                          flex flex-wrap justify-center gap-2"
            >
              <span>Software Engineer</span>
              <span className="text-blue-600">•</span>
              <span>Data Engineer</span>
              <span className="text-blue-600">•</span>
              <span>Network Engineer</span>
              <span className="text-blue-600">•</span>
              <span>Automation Engineer</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base lg:text-lg 
                          text-gray-700 dark:text-gray-300 
                          leading-relaxed max-w-2xl mx-auto"
            >
              Results-oriented Computer Engineering graduate with 7 years of programming experience, 
              specializing in software development, cloud computing, and automation.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Interactive Die */}
        <motion.div 
          className="mt-8 sm:mt-10 lg:mt-12 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Die onSkillSelect={handleSkillSelect} className="mx-auto" />
        </motion.div>
      </motion.section>

      {/* Key Areas with hover animations */}
      <motion.section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className="p-4 bg-white dark:bg-gray-800 
                        rounded-lg shadow-lg 
                        transition-all duration-300 ease-in-out"
            whileHover={{ 
              scale: 1.02, 
              y: -3 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3">
              <skill.icon />
            </div>
            <h3 className="text-lg font-semibold mb-2">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 
                              text-blue-800 dark:text-blue-100 
                              rounded-full"
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
        className="text-center space-y-4 w-full max-w-3xl mx-auto px-4"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold">Interested in learning more?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <motion.a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 
                        px-4 py-2.5 
                        bg-blue-600 text-white 
                        text-sm
                        rounded-lg transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Download Resume</span>
            <ArrowDownIcon className="h-4 w-4" />
          </motion.a>
          <motion.a 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 
                        px-4 py-2.5 
                        bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white 
                        text-sm
                        rounded-lg transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
