import { describe, expect, it } from 'vitest';

import { getProjectById } from './projects';
import {
  getDefaultRoleLens,
  getProjectsForRoleLens,
  getRoleLensById,
  getRoleLensBySlug,
  getSkillsForRoleLens,
  ROLE_LENSES,
} from './role-lenses';
import { getSkillById } from './skills';

describe('role lens catalog', () => {
  it('exposes the four employer-facing role lenses', () => {
    expect(
      ROLE_LENSES.map((lens) => lens.label),
    ).toEqual([
      'Software Engineering',
      'QA & Test Automation',
      'Data Quality & Operations',
      'Platform & Technical Support',
    ]);
  });

  it('has unique role lens ids', () => {
    const ids = ROLE_LENSES.map((lens) =>
      lens.id.toLowerCase(),
    );

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique role lens slugs', () => {
    const slugs = ROLE_LENSES.map((lens) =>
      lens.slug.toLowerCase(),
    );

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has exactly one default lens', () => {
    const defaults = ROLE_LENSES.filter(
      (lens) => lens.presentation.default === true,
    );

    expect(defaults).toHaveLength(1);
  });

  it('references only canonical skills', () => {
    for (const lens of ROLE_LENSES) {
      for (const skillId of lens.skillIds) {
        expect(
          getSkillById(skillId),
          `${lens.label} references missing skill ${skillId}`,
        ).toBeDefined();
      }
    }
  });

  it('references only canonical projects', () => {
    for (const lens of ROLE_LENSES) {
      for (const projectId of lens.projectIds) {
        expect(
          getProjectById(projectId),
          `${lens.label} references missing project ${projectId}`,
        ).toBeDefined();
      }
    }
  });

  it('does not duplicate relationships within a lens', () => {
    for (const lens of ROLE_LENSES) {
      expect(new Set(lens.skillIds).size).toBe(
        lens.skillIds.length,
      );

      expect(new Set(lens.projectIds).size).toBe(
        lens.projectIds.length,
      );
    }
  });

  it('only prioritizes projects supported by selected skills', () => {
    for (const lens of ROLE_LENSES) {
      const supportedProjectIds = new Set(
        getSkillsForRoleLens(lens).flatMap(
          (skill) => skill.projectIds,
        ),
      );

      for (const projectId of lens.projectIds) {
        expect(
          supportedProjectIds.has(projectId),
          `${lens.label} project ${projectId} lacks a selected-skill relationship`,
        ).toBe(true);
      }
    }
  });

  it('resolves ids and slugs case-insensitively', () => {
    expect(
      getRoleLensById('SOFTWARE-ENGINEERING')?.slug,
    ).toBe('software-engineering');

    expect(
      getRoleLensBySlug('QUALITY-ENGINEERING')?.id,
    ).toBe('quality-engineering');

    expect(
      getRoleLensById('FRONTEND-DX')?.slug,
    ).toBe('frontend-dx');
  });

  it('resolves the default software engineering lens', () => {
    expect(getDefaultRoleLens()?.id).toBe(
      'software-engineering',
    );
  });

  it('resolves canonical skills and projects for the QA lens', () => {
    const qa = getRoleLensById('quality-engineering');

    expect(qa).toBeDefined();

    expect(
      getSkillsForRoleLens(qa!).map(
        (skill) => skill.id,
      ),
    ).toEqual([
      'python',
      'javascript-typescript',
      'react',
      'ci-cd',
      'git-github',
    ]);

    expect(
      getProjectsForRoleLens(qa!).map(
        (project) => project.id,
      ),
    ).toEqual([
      'cycleready',
      'hostdesk',
      'botmedic',
      'dqsentry',
    ]);
  });
});
