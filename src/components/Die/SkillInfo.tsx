// src/components/Die/SkillInfo.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from './types';

interface SkillInfoProps {
  skill: Skill;
}

export const SkillInfo: React.FC<SkillInfoProps> = ({ skill }) => {
  // Define animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.05 * i,
      },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 } 
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{skill.name}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {skill.yearsOfExperience} years
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Proficiency</span>
            <span>{skill.proficiency}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {skill.projects && skill.projects.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Related Projects:</h4>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              {skill.projects.map((project) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 
                             text-blue-800 dark:text-blue-100 rounded-full text-sm hover:underline"
                >
                  {project.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
