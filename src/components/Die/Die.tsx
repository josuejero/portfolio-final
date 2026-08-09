import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { getProjectsForSkill, SKILLS } from '@/data/skills';
import type { PortfolioSkill } from '@/types/skill';

import { dieAnimationVariants } from './DieAnimation';

interface DieProps {
  onSkillSelect?: (skill: PortfolioSkill) => void;
  className?: string;
}

const Die: React.FC<DieProps> = ({
  onSkillSelect,
  className = '',
}) => {
  const [state, setState] = useState({
    isRolling: false,
    currentSkill: null as PortfolioSkill | null,
    previousSkill: null as PortfolioSkill | null,
  });

  const rollDie = useCallback(() => {
    if (state.isRolling) return;

    setState((prev) => ({
      ...prev,
      isRolling: true,
      previousSkill: prev.currentSkill,
    }));

    let rollCount = 0;
    const maxRolls = 10;

    const rollInterval = setInterval(() => {
      const randomSkill =
        SKILLS[Math.floor(Math.random() * SKILLS.length)];

      setState((prev) => ({
        ...prev,
        currentSkill: randomSkill,
      }));

      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);

        const finalSkill =
          SKILLS[Math.floor(Math.random() * SKILLS.length)];

        setState((prev) => ({
          ...prev,
          isRolling: false,
          currentSkill: finalSkill,
        }));

        onSkillSelect?.(finalSkill);
      }
    }, 200);
  }, [state.isRolling, onSkillSelect]);

  const relatedProjects = state.currentSkill
    ? getProjectsForSkill(state.currentSkill)
    : [];

  return (
    <div className={`flex flex-col items-center space-y-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 text-center"
      >
        <h3 className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
          Explore My Skills
        </h3>

        <p className="text-gray-600 dark:text-gray-400">
          Click the die to discover my tech stack
        </p>
      </motion.div>

      <motion.div
        className="group relative"
        variants={dieAnimationVariants}
        initial="initial"
        animate={state.isRolling ? 'rolling' : 'initial'}
        whileHover="hover"
        whileTap="tap"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-50 blur-lg transition-opacity group-hover:opacity-75" />

        <motion.div
          onClick={rollDie}
          className="perspective-1000 transform-style-preserve-3d relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white bg-opacity-90 shadow-xl backdrop-blur-sm transition-all dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90"
        >
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text px-4 text-center text-xl font-bold text-transparent">
            {state.currentSkill
              ? state.currentSkill.name
              : 'Roll Me!'}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {state.currentSkill && !state.isRolling && (
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">
                    {state.currentSkill.name}
                  </h4>

                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {state.currentSkill.yearsOfExperience} years
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${state.currentSkill.proficiency}%`,
                      }}
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                      transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Proficiency</span>
                    <span>
                      {state.currentSkill.proficiency}%
                    </span>
                  </div>
                </div>

                {relatedProjects.length > 0 && (
                  <div className="pt-4">
                    <h5 className="mb-2 font-semibold">
                      Related Projects:
                    </h5>

                    <div className="flex flex-wrap gap-2">
                      {relatedProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${encodeURIComponent(
                            project.slug,
                          )}`}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:underline dark:bg-blue-900 dark:text-blue-100"
                        >
                          {project.name}
                        </Link>
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
