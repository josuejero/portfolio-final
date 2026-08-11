import { getProjectById } from '@/data/projects';
import { getSkillById } from '@/data/skills';
import type { PortfolioProject } from '@/types/project';
import type { RoleLens } from '@/types/role-lens';
import type { PortfolioSkill } from '@/types/skill';

export const ROLE_LENSES: readonly RoleLens[] = [
  {
    id: 'software-engineering',
    slug: 'software-engineering',
    label: 'Software Engineering',
    shortLabel: 'Software',
    summary:
      'Full-stack and application development across TypeScript, React, Python, backend APIs, relational data, and delivery tooling.',
    skillIds: [
      'python',
      'java',
      'javascript-typescript',
      'react',
      'docker',
      'ci-cd',
      'git-github',
    ],
    projectIds: [
      'hostdesk',
      'botmedic',
      'dqsentry',
      'cycleready',
      'finance-tracker',
      'product-affordability-predictor',
      'selestino',
      'framecast-web-portal',
      'cheapest-grocery-finder',
      'fludde',
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
    presentation: {
      order: 1,
      default: true,
    },
  },

  {
    id: 'quality-engineering',
    slug: 'quality-engineering',
    label: 'QA & Test Automation',
    shortLabel: 'QA',
    summary:
      'Release readiness, regression coverage, API and browser automation, requirements traceability, and evidence-backed quality decisions.',
    skillIds: [
      'python',
      'javascript-typescript',
      'react',
      'ci-cd',
      'git-github',
    ],
    projectIds: [
      'cycleready',
      'hostdesk',
      'botmedic',
      'dqsentry',
    ],
    presentation: {
      order: 2,
    },
  },

  {
    id: 'data-quality',
    slug: 'data-quality',
    label: 'Data Quality & Operations',
    shortLabel: 'Data',
    summary:
      'Data validation, issue detection, explainable quality scoring, regression fixtures, and automated reporting pipelines.',
    skillIds: [
      'python',
      'ci-cd',
      'git-github',
    ],
    projectIds: [
      'dqsentry',
    ],
    presentation: {
      order: 3,
    },
  },

  {
    id: 'platform-support',
    slug: 'platform-support',
    label: 'Platform & Technical Support',
    shortLabel: 'Platform',
    summary:
      'Operational tooling for diagnostics, support workflows, incident triage, secure application behavior, and reliable delivery.',
    skillIds: [
      'javascript-typescript',
      'react',
      'cloud',
      'docker',
      'ci-cd',
      'git-github',
    ],
    projectIds: [
      'botmedic',
      'hostdesk',
      'cycleready',
    ],
    presentation: {
      order: 4,
    },
  },
];

// Preserve old query-string/deep-link lookups without exposing these
// retired lenses in the primary ROLE_LENSES UI.
const LEGACY_ROLE_LENSES: readonly RoleLens[] = [
  {
    id: 'frontend-dx',
    slug: 'frontend-dx',
    label: 'Frontend & Developer Experience',
    shortLabel: 'Frontend & DX',
    summary:
      'Interface development with React, Next.js, TypeScript, and maintainable developer workflows.',
    skillIds: [
      'react',
      'nextjs',
      'javascript-typescript',
      'git-github',
    ],
    projectIds: [
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
    presentation: {
      order: 90,
    },
  },
  {
    id: 'cloud-automation',
    slug: 'cloud-automation',
    label: 'Cloud & Automation',
    shortLabel: 'Cloud',
    summary:
      'Cloud, container, infrastructure, and automation work centered on reliable delivery.',
    skillIds: [
      'docker',
      'cloud',
      'google-cloud-platform',
      'ci-cd',
      'infrastructure-as-code',
    ],
    projectIds: [
      'selestino',
      'finance-tracker',
      'product-affordability-predictor',
    ],
    presentation: {
      order: 91,
    },
  },
];

const ALL_ROLE_LENSES: readonly RoleLens[] = [
  ...ROLE_LENSES,
  ...LEGACY_ROLE_LENSES,
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getRoleLensById(
  id: string,
): RoleLens | undefined {
  const normalizedId = normalize(id);

  return ALL_ROLE_LENSES.find(
    (lens) => normalize(lens.id) === normalizedId,
  );
}

export function getRoleLensBySlug(
  slug: string,
): RoleLens | undefined {
  const normalizedSlug = normalize(slug);

  return ALL_ROLE_LENSES.find(
    (lens) => normalize(lens.slug) === normalizedSlug,
  );
}

export function getDefaultRoleLens(): RoleLens | undefined {
  return ROLE_LENSES.find(
    (lens) => lens.presentation.default === true,
  );
}

export function getSkillsForRoleLens(
  lens: RoleLens,
): PortfolioSkill[] {
  return lens.skillIds.flatMap((skillId) => {
    const skill = getSkillById(skillId);

    return skill ? [skill] : [];
  });
}

export function getProjectsForRoleLens(
  lens: RoleLens,
): PortfolioProject[] {
  return lens.projectIds.flatMap((projectId) => {
    const project = getProjectById(projectId);

    return project ? [project] : [];
  });
}
