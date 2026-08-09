import { getProjectById } from '@/data/projects';
import type { PortfolioProject } from '@/types/project';
import type { PortfolioSkill } from '@/types/skill';

export const SKILLS = [
  {
    id: 'python',
    name: 'Python',
    category: 'language',
    proficiency: 90,
    yearsOfExperience: 6,
    projectIds: [
      'finance-tracker',
      'product-affordability-predictor',
      'selestino',
      'framecast-web-portal',
      'cheapest-grocery-finder',
    ],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'language',
    proficiency: 85,
    yearsOfExperience: 7,
    projectIds: [
      'fludde',
    ],
  },
  {
    id: 'react',
    name: 'React',
    category: 'framework',
    proficiency: 80,
    yearsOfExperience: 3,
    projectIds: [
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tool',
    proficiency: 85,
    yearsOfExperience: 3,
    projectIds: [
      'selestino',
      'finance-tracker',
      'product-affordability-predictor',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    category: 'cloud',
    proficiency: 80,
    yearsOfExperience: 3,
    projectIds: [
      'selestino',
      'finance-tracker',
      'product-affordability-predictor',
    ],
  },
  {
    id: 'django',
    name: 'Django',
    category: 'framework',
    proficiency: 85,
    yearsOfExperience: 4,
    projectIds: [
      'finance-tracker',
      'product-affordability-predictor',
      'cheapest-grocery-finder',
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'framework',
    proficiency: 80,
    yearsOfExperience: 2,
    projectIds: [
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
  },
] as const satisfies readonly PortfolioSkill[];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getSkillById(
  id: string,
): PortfolioSkill | undefined {
  const normalizedId = normalize(id);

  return SKILLS.find(
    (skill) => normalize(skill.id) === normalizedId,
  );
}

export function getProjectsForSkill(
  skill: PortfolioSkill,
): PortfolioProject[] {
  return skill.projectIds.flatMap((projectId) => {
    const project = getProjectById(projectId);

    return project ? [project] : [];
  });
}
