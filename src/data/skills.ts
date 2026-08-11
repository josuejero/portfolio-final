import { getProjectById } from '@/data/projects';
import type { PortfolioProject } from '@/types/project';
import type {
  AboutSkillGroupId,
  PortfolioSkill,
} from '@/types/skill';

type AboutSkillGroup = {
  id: AboutSkillGroupId;
  label: string;
  order: number;
};

export const ABOUT_SKILL_GROUPS = [
  {
    id: 'core-languages-frameworks',
    label: 'Core Languages & Frameworks',
    order: 1,
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    order: 2,
  },
  {
    id: 'databases-tools',
    label: 'Databases & Tools',
    order: 3,
  },
] as const satisfies readonly AboutSkillGroup[];

export const SKILLS: readonly PortfolioSkill[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'language',
    proficiency: 90,
    yearsOfExperience: 6,
    projectIds: [
      'dqsentry',
      'finance-tracker',
      'product-affordability-predictor',
      'selestino',
      'framecast-web-portal',
      'cheapest-grocery-finder',
    ],
    presentation: {
      showInDie: true,
      about: {
        group: 'core-languages-frameworks',
        order: 1,
        details: 'Django, Flask, Data Analysis',
      },
    },
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
    presentation: {
      showInDie: true,
      about: {
        group: 'core-languages-frameworks',
        order: 2,
        details: 'Android Development, Spring Boot',
      },
    },
  },
  {
    id: 'react',
    name: 'React',
    category: 'framework',
    proficiency: 80,
    yearsOfExperience: 3,
    projectIds: [
      'hostdesk',
      'cycleready',
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
    presentation: {
      showInDie: true,
    },
  },
  {
    id: 'docker',
    name: 'Docker',
    aliases: [
      'Kubernetes',
    ],
    category: 'tool',
    proficiency: 85,
    yearsOfExperience: 3,
    projectIds: [
      'hostdesk',
      'selestino',
      'finance-tracker',
      'product-affordability-predictor',
    ],
    presentation: {
      showInDie: true,
      about: {
        group: 'cloud-devops',
        order: 1,
        label: 'Docker & Kubernetes',
        details: 'Container Orchestration, Microservices',
      },
    },
  },
  {
    id: 'cloud',
    name: 'Cloud',
    category: 'cloud',
    proficiency: 80,
    yearsOfExperience: 3,
    projectIds: [
      'botmedic',
      'selestino',
      'finance-tracker',
      'product-affordability-predictor',
    ],
    presentation: {
      showInDie: true,
    },
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
    presentation: {
      showInDie: true,
    },
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
    presentation: {
      showInDie: true,
    },
  },

  // About-page skills that do not yet have canonical project
  // relationships in the current portfolio data.
  {
    id: 'javascript-typescript',
    name: 'JavaScript/TypeScript',
    aliases: [
      'JavaScript',
      'TypeScript',
    ],
    category: 'language',
    yearsOfExperience: 5,
    projectIds: [
      'hostdesk',
      'botmedic',
      'cycleready',
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
    presentation: {
      about: {
        group: 'core-languages-frameworks',
        order: 3,
        details: 'React, Next.js, Node.js',
      },
    },
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'language',
    yearsOfExperience: 5,
    projectIds: [],
    presentation: {
      about: {
        group: 'core-languages-frameworks',
        order: 4,
        details: 'Systems Programming, Embedded Systems',
      },
    },
  },
  {
    id: 'google-cloud-platform',
    name: 'Google Cloud Platform',
    aliases: [
      'GCP',
    ],
    category: 'cloud',
    yearsOfExperience: 3,
    projectIds: [],
    presentation: {
      about: {
        group: 'cloud-devops',
        order: 2,
        details: 'App Engine, Cloud Functions, Cloud Run',
      },
    },
  },
  {
    id: 'ci-cd',
    name: 'CI/CD',
    category: 'devops',
    yearsOfExperience: 2,
    projectIds: [
      'hostdesk',
      'botmedic',
      'dqsentry',
      'cycleready',
      'selestino',
    ],
    presentation: {
      about: {
        group: 'cloud-devops',
        order: 3,
        details: 'Jenkins, GitHub Actions',
      },
    },
  },
  {
    id: 'infrastructure-as-code',
    name: 'Infrastructure as Code',
    aliases: [
      'Terraform',
      'CloudFormation',
    ],
    category: 'devops',
    yearsOfExperience: 2,
    projectIds: [],
    presentation: {
      about: {
        group: 'cloud-devops',
        order: 4,
        details: 'Terraform, CloudFormation',
      },
    },
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    yearsOfExperience: 4,
    projectIds: [],
    presentation: {
      about: {
        group: 'databases-tools',
        order: 1,
        details: 'Performance Optimization, Schema Design',
      },
    },
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    yearsOfExperience: 2,
    projectIds: [],
    presentation: {
      about: {
        group: 'databases-tools',
        order: 2,
        details: 'Document Design, Aggregation Pipeline',
      },
    },
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    aliases: [
      'Git',
      'GitHub',
    ],
    category: 'tool',
    yearsOfExperience: 5,
    projectIds: [
      'hostdesk',
      'botmedic',
      'dqsentry',
      'cycleready',
      'selestino',
      'framecast-web-portal',
      'cheapest-grocery-finder',
      'fludde',
      'portfolio-website',
      'ozzie-gonzalez-photography',
    ],
    presentation: {
      about: {
        group: 'databases-tools',
        order: 3,
        details: 'Version Control, Code Review',
      },
    },
  },
  {
    id: 'aws-services',
    name: 'AWS Services',
    aliases: [
      'AWS',
    ],
    category: 'cloud',
    yearsOfExperience: 2,
    projectIds: [],
    presentation: {
      about: {
        group: 'databases-tools',
        order: 4,
        details: 'Lambda, S3, EC2, RDS',
      },
    },
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export const DIE_SKILLS: readonly PortfolioSkill[] =
  SKILLS.filter(
    (skill) => skill.presentation?.showInDie === true,
  );

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

export function getAboutSkillsForGroup(
  groupId: AboutSkillGroupId,
): PortfolioSkill[] {
  return SKILLS
    .filter(
      (skill) =>
        skill.presentation?.about?.group === groupId,
    )
    .sort(
      (left, right) =>
        (left.presentation?.about?.order ?? 0) -
        (right.presentation?.about?.order ?? 0),
    );
}
