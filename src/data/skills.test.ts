import { describe, expect, it } from 'vitest';

import { getProjectById } from './projects';
import {
  ABOUT_SKILL_GROUPS,
  DIE_SKILLS,
  getAboutSkillsForGroup,
  getProjectsForSkill,
  getSkillById,
  SKILLS,
} from './skills';

describe('skill catalog', () => {
  it('has unique skill ids', () => {
    const ids = SKILLS.map((skill) => skill.id.toLowerCase());

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique skill names', () => {
    const names = SKILLS.map((skill) =>
      skill.name.toLowerCase(),
    );

    expect(new Set(names).size).toBe(names.length);
  });

  it('keeps defined proficiency values within 0 through 100', () => {
    for (const skill of SKILLS) {
      if (skill.proficiency === undefined) {
        continue;
      }

      expect(skill.proficiency).toBeGreaterThanOrEqual(0);
      expect(skill.proficiency).toBeLessThanOrEqual(100);
    }
  });

  it('keeps experience values non-negative', () => {
    for (const skill of SKILLS) {
      expect(skill.yearsOfExperience).toBeGreaterThanOrEqual(0);
    }
  });

  it('references only canonical projects', () => {
    for (const skill of SKILLS) {
      for (const projectId of skill.projectIds) {
        expect(
          getProjectById(projectId),
          `${skill.name} references missing project ${projectId}`,
        ).toBeDefined();
      }
    }
  });

  it('does not duplicate project relationships within a skill', () => {
    for (const skill of SKILLS) {
      expect(new Set(skill.projectIds).size).toBe(
        skill.projectIds.length,
      );
    }
  });

  it('keeps the interactive die limited to the original seven skills', () => {
    expect(
      DIE_SKILLS.map((skill) => skill.id),
    ).toEqual([
      'python',
      'java',
      'react',
      'docker',
      'cloud',
      'django',
      'nextjs',
    ]);

    for (const skill of DIE_SKILLS) {
      expect(skill.proficiency).toBeDefined();
    }
  });

  it('preserves the three About skill groups', () => {
    expect(
      ABOUT_SKILL_GROUPS.map((group) => group.label),
    ).toEqual([
      'Core Languages & Frameworks',
      'Cloud & DevOps',
      'Databases & Tools',
    ]);
  });

  it('preserves four About cards per group', () => {
    for (const group of ABOUT_SKILL_GROUPS) {
      expect(
        getAboutSkillsForGroup(group.id),
      ).toHaveLength(4);
    }
  });

  it('preserves shared Python and Java experience claims', () => {
    expect(getSkillById('python')?.yearsOfExperience).toBe(6);
    expect(getSkillById('java')?.yearsOfExperience).toBe(7);
  });

  it('preserves the Docker and Kubernetes About label', () => {
    const docker = getSkillById('docker');

    expect(docker?.presentation?.about?.label).toBe(
      'Docker & Kubernetes',
    );

    expect(docker?.aliases).toContain('Kubernetes');
  });

  it('resolves related projects through the project catalog', () => {
    const python = getSkillById('python');

    expect(python).toBeDefined();

    const projects = getProjectsForSkill(python!);

    expect(projects.map((project) => project.name)).toEqual([
      'Finance Tracker',
      'Product Affordability Predictor',
      'Selestino',
      'FrameCast Web Portal',
      'Cheapest Grocery Finder',
    ]);
  });
});
