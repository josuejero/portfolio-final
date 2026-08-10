'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import { DIE_SKILLS, getProjectsForSkill } from '@/data/skills';
import type { PortfolioSkill } from '@/types/skill';

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
        DIE_SKILLS[Math.floor(Math.random() * DIE_SKILLS.length)];

      setState((prev) => ({
        ...prev,
        currentSkill: randomSkill,
      }));

      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);

        const finalSkill =
          DIE_SKILLS[Math.floor(Math.random() * DIE_SKILLS.length)];

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
      <div className="space-y-2 text-center">
        <h3 className="bg-gradient-to-r from-brand to-brand-accent bg-clip-text text-2xl font-bold text-transparent">
          Explore My Skills
        </h3>

        <p className="text-muted-foreground">
          Click the die to discover my tech stack
        </p>
      </div>

      <div
        className={[
          'group relative transition-transform duration-normal ease-standard',
          'motion-safe:hover:-translate-y-1',
          'motion-reduce:transition-none',
          state.isRolling ? 'motion-safe:animate-pulse' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-panel bg-gradient-to-r from-brand to-brand-accent opacity-50 blur-lg transition-opacity duration-normal ease-standard group-hover:opacity-75"
        />

        <button
          type="button"
          onClick={rollDie}
          disabled={state.isRolling}
          aria-label={
            state.isRolling
              ? 'Rolling skill die'
              : 'Roll skill die'
          }
          className="perspective-1000 transform-style-preserve-3d relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-panel border border-border/60 bg-card/90 shadow-raised backdrop-blur-sm transition-transform duration-fast ease-standard motion-safe:active:scale-[0.98] motion-reduce:transition-none disabled:cursor-wait"
        >
          <span className="bg-gradient-to-r from-brand to-brand-accent bg-clip-text px-4 text-center text-xl font-bold text-transparent">
            {state.currentSkill
              ? state.currentSkill.name
              : 'Roll Me!'}
          </span>
        </button>
      </div>

      {state.currentSkill && !state.isRolling && (
        <div
          className="w-full max-w-md"
          aria-live="polite"
        >
          <div className="rounded-surface border border-border/60 bg-card/70 p-6 shadow-soft">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">
                  {state.currentSkill.name}
                </h4>

                <span className="text-sm text-brand">
                  {state.currentSkill.yearsOfExperience} years
                </span>
              </div>

              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-pill bg-muted">
                  <div
                    className="h-full bg-gradient-to-r from-brand to-brand-accent"
                    style={{
                      width: `${state.currentSkill.proficiency}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
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
                        className="rounded-pill border border-brand/30 bg-brand/10 px-3 py-1 text-sm text-brand hover:underline"
                      >
                        {project.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Die;
