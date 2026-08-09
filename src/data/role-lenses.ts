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
      'Application development across Python, Java, and modern web technologies.',
    skillIds: [
      'python',
      'java',
      'javascript-typescript',
      'react',
      'django',
      'nextjs',
      'git-github',
    ],
    projectIds: [
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
      order: 2,
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
      order: 3,
    },
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getRoleLensById(
  id: string,
): RoleLens | undefined {
  const normalizedId = normalize(id);

  return ROLE_LENSES.find(
    (lens) => normalize(lens.id) === normalizedId,
  );
}

export function getRoleLensBySlug(
  slug: string,
): RoleLens | undefined {
  const normalizedSlug = normalize(slug);

  return ROLE_LENSES.find(
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
