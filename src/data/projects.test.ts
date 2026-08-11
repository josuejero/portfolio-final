import { describe, expect, it } from 'vitest';

import {
  PROJECTS,
  getFeaturedProjects,
  getProjectByFullRepositoryName,
  getProjectById,
  getProjectByRepository,
  getProjectByRepositoryName,
  getProjectBySlug,
} from './projects';

describe('project catalog', () => {
  it('has unique project ids', () => {
    const values = PROJECTS.map(
      (project) => project.id.toLowerCase(),
    );

    expect(new Set(values).size).toBe(
      values.length,
    );
  });

  it('has unique stable slugs', () => {
    const values = PROJECTS.map(
      (project) => project.slug.toLowerCase(),
    );

    expect(new Set(values).size).toBe(
      values.length,
    );
  });

  it('has unique GitHub repository identities', () => {
    const values = PROJECTS.map((project) =>
      `${project.repository.owner}/${project.repository.name}`.toLowerCase(),
    );

    expect(new Set(values).size).toBe(
      values.length,
    );
  });

  it('keeps source links aligned with repository identities', () => {
    for (const project of PROJECTS) {
      const expected =
        `https://github.com/${project.repository.owner}/${project.repository.name}`;

      expect(project.repository.url).toBe(
        expected,
      );
      expect(project.links.source).toBe(
        expected,
      );

      expect(project.evidence).toContainEqual({
        id: 'source-repository',
        type: 'repository',
        label: 'Source repository',
        href: expected,
      });
    }
  });

  it('resolves projects by id and stable slug', () => {
    expect(
      getProjectById('finance-tracker')?.name,
    ).toBe('Finance Tracker');

    expect(
      getProjectBySlug(
        'cheapest-grocery-finder',
      )?.repository.name,
    ).toBe('grocery-finder');

    expect(
      getProjectBySlug(
        'portfolio-website',
      )?.repository.name,
    ).toBe('portfolio-final');
  });

  it('resolves GitHub repository identities case-insensitively', () => {
    expect(
      getProjectByRepository(
        'josuejero',
        'FrameCast-Web-Portal',
      )?.id,
    ).toBe('framecast-web-portal');

    expect(
      getProjectByFullRepositoryName(
        'CourajeousMax/ozzie-photography',
      )?.slug,
    ).toBe('ozzie-gonzalez-photography');

    expect(
      getProjectByRepositoryName('FLUDDE')
        ?.name,
    ).toBe('Fludde');
  });

  it('returns featured projects in explicit presentation order', () => {
    expect(
      getFeaturedProjects().map(
        (project) => project.id,
      ),
    ).toEqual([
      'hostdesk',
      'botmedic',
      'dqsentry',
      'cycleready',
    ]);
  });

  it('keeps every featured project evidence-backed', () => {
    for (const project of getFeaturedProjects()) {
      expect(project.summary).toBeTruthy();
      expect(project.caseStudy).toBeDefined();

      expect(
        project.evidence.some(
          (evidence) =>
            evidence.type === 'readme',
        ),
      ).toBe(true);

      expect(
        project.evidence.some(
          (evidence) =>
            evidence.type === 'metric' ||
            evidence.type === 'release' ||
            evidence.type === 'case-study',
        ),
      ).toBe(true);
    }
  });

  it('attaches typed interactive demos to the four implemented project workspaces', () => {
    const framecast =
      getProjectById('framecast-web-portal');
    const hostdesk =
      getProjectById('hostdesk');
    const botmedic =
      getProjectById('botmedic');
    const dqsentry =
      getProjectById('dqsentry');

    expect(framecast?.demo?.type).toBe(
      'framecast-configurator',
    );

    expect(hostdesk?.demo?.type).toBe(
      'hostdesk-operations',
    );

    expect(botmedic?.demo?.type).toBe(
      'botmedic-triage',
    );

    expect(dqsentry?.demo?.type).toBe(
      'dqsentry-validator',
    );

    expect(framecast?.demo?.disclaimer).toMatch(
      /simulation/i,
    );

    expect(hostdesk?.demo?.disclaimer).toMatch(
      /portfolio simulation/i,
    );

    expect(botmedic?.demo?.disclaimer).toMatch(
      /portfolio simulation/i,
    );

    expect(dqsentry?.demo?.disclaimer).toMatch(
      /portfolio simulation/i,
    );

    expect(
      PROJECTS.filter(
        (project) => project.demo,
      ).map((project) => project.id),
    ).toEqual([
      'framecast-web-portal',
      'hostdesk',
      'botmedic',
      'dqsentry',
    ]);
  });

  it('rejects malformed or unknown repository identities', () => {
    expect(
      getProjectByFullRepositoryName(
        'invalid',
      ),
    ).toBeUndefined();

    expect(
      getProjectByFullRepositoryName(
        'owner/repo/extra',
      ),
    ).toBeUndefined();

    expect(
      getProjectByRepository(
        'unknown',
        'unknown',
      ),
    ).toBeUndefined();

    expect(
      getProjectByRepositoryName('unknown'),
    ).toBeUndefined();
  });
});
