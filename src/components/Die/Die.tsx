// src/components/Die/Die.tsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill, DieProps } from './types';
import { SKILLS_DATA } from './skillsData';
import { dieAnimationVariants } from './DieAnimation';
import { SkillInfo } from './SkillInfo';

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
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        variants={dieAnimationVariants}
        initial="initial"
        animate={state.isRolling ? "rolling" : "initial"}
        whileHover="hover"
        whileTap="tap"
        onClick={rollDie}
        className="w-32 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                 flex items-center justify-center cursor-pointer 
                 perspective-1000 transform-style-preserve-3d"
      >
        <span className="text-lg font-bold text-center">
          {state.currentSkill ? state.currentSkill.name : 'Click to Roll!'}
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        {state.currentSkill && !state.isRolling && (
          <SkillInfo skill={state.currentSkill} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Die;