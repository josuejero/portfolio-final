import type { PortfolioProject } from '@/types/project';

type GitHubProjectInput = {
  id: string;
  slug: string;
  name: string;
  owner: string;
  repositoryName: string;
};

function createGitHubProject({
  id,
  slug,
  name,
  owner,
  repositoryName,
}: GitHubProjectInput): PortfolioProject {
  const sourceUrl = `https://github.com/${owner}/${repositoryName}`;

  return {
    id,
    slug,
    name,
    repository: {
      provider: 'github',
      owner,
      name: repositoryName,
      url: sourceUrl,
    },
    links: {
      source: sourceUrl,
    },
    evidence: [
      {
        id: 'source-repository',
        type: 'repository',
        label: 'Source repository',
        href: sourceUrl,
      },
    ],
  };
}

export const PROJECTS = [
  createGitHubProject({
    id: 'finance-tracker',
    slug: 'finance-tracker',
    name: 'Finance Tracker',
    owner: 'josuejero',
    repositoryName: 'finance-tracker',
  }),

  createGitHubProject({
    id: 'product-affordability-predictor',
    slug: 'product-affordability-predictor',
    name: 'Product Affordability Predictor',
    owner: 'josuejero',
    repositoryName: 'product-affordability-predictor',
  }),

  createGitHubProject({
    id: 'selestino',
    slug: 'selestino',
    name: 'Selestino',
    owner: 'josuejero',
    repositoryName: 'selestino',
  }),

  createGitHubProject({
    id: 'framecast-web-portal',
    slug: 'framecast-web-portal',
    name: 'FrameCast Web Portal',
    owner: 'josuejero',
    repositoryName: 'FrameCast-Web-Portal',
  }),

  createGitHubProject({
    id: 'cheapest-grocery-finder',
    slug: 'cheapest-grocery-finder',
    name: 'Cheapest Grocery Finder',
    owner: 'josuejero',
    repositoryName: 'grocery-finder',
  }),

  createGitHubProject({
    id: 'fludde',
    slug: 'fludde',
    name: 'Fludde',
    owner: 'josuejero',
    repositoryName: 'Fludde',
  }),

  createGitHubProject({
    id: 'portfolio-website',
    slug: 'portfolio-website',
    name: 'Portfolio Website',
    owner: 'josuejero',
    repositoryName: 'portfolio',
  }),

  createGitHubProject({
    id: 'ozzie-gonzalez-photography',
    slug: 'ozzie-gonzalez-photography',
    name: 'Ozzie Gonzalez Photography',
    owner: 'CourajeousMax',
    repositoryName: 'ozzie-photography',
  }),
] satisfies readonly PortfolioProject[];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getProjectById(id: string): PortfolioProject | undefined {
  const normalizedId = normalize(id);

  return PROJECTS.find(
    (project) => normalize(project.id) === normalizedId,
  );
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  const normalizedSlug = normalize(slug);

  return PROJECTS.find(
    (project) => normalize(project.slug) === normalizedSlug,
  );
}

export function getProjectByRepository(
  owner: string,
  repositoryName: string,
): PortfolioProject | undefined {
  const normalizedOwner = normalize(owner);
  const normalizedRepository = normalize(repositoryName);

  return PROJECTS.find(
    (project) =>
      normalize(project.repository.owner) === normalizedOwner &&
      normalize(project.repository.name) === normalizedRepository,
  );
}

export function getProjectByFullRepositoryName(
  fullName: string,
): PortfolioProject | undefined {
  const [owner, repositoryName, ...rest] = fullName.trim().split('/');

  if (!owner || !repositoryName || rest.length > 0) {
    return undefined;
  }

  return getProjectByRepository(owner, repositoryName);
}

export function getProjectByRepositoryName(
  repositoryName: string,
): PortfolioProject | undefined {
  const normalizedRepository = normalize(repositoryName);

  const matches = PROJECTS.filter(
    (project) =>
      normalize(project.repository.name) === normalizedRepository,
  );

  return matches.length === 1 ? matches[0] : undefined;
}
