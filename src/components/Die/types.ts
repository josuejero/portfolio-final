// src/components/Die/types.ts
export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'cloud';
  proficiency: number;
  yearsOfExperience: number;
  projects?: string[];
}

export interface DieProps {
  onSkillSelect?: (skill: Skill) => void;
  className?: string;
}

export interface DieState {
  isRolling: boolean;
  currentSkill: Skill | null;
  currentFace: number;
}