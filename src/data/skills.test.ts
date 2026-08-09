import { describe, expect, it } from 'vitest';

import { getProjectById } from './projects';
import {
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

  it('keeps proficiency values within 0 through 100', () => {
    for (const skill of SKILLS) {
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
