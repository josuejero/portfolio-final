import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill, DieProps } from './types';
import { SKILLS_DATA } from './skillsData';
import { dieAnimationVariants } from './DieAnimation';

const Die: React.FC<DieProps> = ({ onSkillSelect, className = '' }) => {
  const [state, setState] = useState({
    isRolling: false,
    currentSkill: null as Skill | null,
    previousSkill: null as Skill | null,
  });

  const rollDie = useCallback(() => {
    if (state.isRolling) return;

    setState(prev => ({
      ...prev,
      isRolling: true,
      previousSkill: prev.currentSkill
    }));

    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      const randomSkill = SKILLS_DATA[Math.floor(Math.random() * SKILLS_DATA.length)];
      setState(prev => ({ ...prev, currentSkill: randomSkill }));
      
      rollCount++;
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        const finalSkill = SKILLS_DATA[Math.floor(Math.random() * SKILLS_DATA.length)];
        setState(prev => ({
          ...prev,
          isRolling: false,
          currentSkill: finalSkill
        }));
        onSkillSelect?.(finalSkill);
      }
    }, 200);
  }, [state.isRolling, onSkillSelect]);

  return (
    <div className={`flex flex-col items-center space-y-8 ${className}`}>
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Explore My Skills
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Click the die to discover my tech stack</p>
      </motion.div>

      {/* Die Container with Glow Effect */}
      <motion.div
        className="relative group"
        variants={dieAnimationVariants}
        initial="initial"
        animate={state.isRolling ? "rolling" : "initial"}
        whileHover="hover"
        whileTap="tap"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Main Die */}
        <motion.div
          onClick={rollDie}
          className="relative w-40 h-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
                     cursor-pointer backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90
                     flex items-center justify-center transform transition-all
                     border border-gray-200 dark:border-gray-700
                     perspective-1000 transform-style-preserve-3d"
        >
          <div className="text-xl font-bold text-center bg-gradient-to-r from-blue-600 to-violet-600 
                         bg-clip-text text-transparent px-4">
            {state.currentSkill ? state.currentSkill.name : 'Roll Me!'}
          </div>
        </motion.div>
      </motion.div>

      {/* Skill Details with AnimatePresence */}
      <AnimatePresence mode="wait">
        {state.currentSkill && !state.isRolling && (
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg
                          border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{state.currentSkill.name}</h4>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {state.currentSkill.yearsOfExperience} years
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${state.currentSkill.proficiency}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Proficiency</span>
                    <span>{state.currentSkill.proficiency}%</span>
                  </div>
                </div>

                {state.currentSkill.projects && (
                  <div className="pt-4">
                    <h5 className="font-semibold mb-2">Related Projects:</h5>
                    <div className="flex flex-wrap gap-2">
                      {state.currentSkill.projects.map((project) => (
                        <a
                          key={project.name}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 
                                   dark:text-blue-100 rounded-full text-sm hover:underline"
                        >
                          {project.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Die;