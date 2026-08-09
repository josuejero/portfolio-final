import {
  getProjectByFullRepositoryName,
  getProjectByRepositoryName,
  getProjectBySlug,
} from '@/data/projects';
import type { GitHubRepositorySummary } from '@/types/github';
import type { PortfolioProject } from '@/types/project';

export interface ProjectViewModel {
  key: string;
  slug: string;
  name: string;
  description: string | null;

  sourceUrl: string;
  liveUrl: string | null;

  language: {
    name: string;
    color: string | null;
  } | null;

  topics: readonly string[];

  stars: number | null;
  forks: number | null;
  updatedAt: string | null;

  repository: {
    owner: string | null;
    name: string;
    fullName: string | null;
  };

  catalogProject: PortfolioProject | null;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getCatalogProjectForReference(
  reference: string,
): PortfolioProject | undefined {
  return (
    getProjectBySlug(reference) ??
    getProjectByRepositoryName(reference)
  );
}

export function toRepositoryProjectViewModel(
  repo: GitHubRepositorySummary,
): ProjectViewModel {
  const catalogProject =
    getProjectByFullRepositoryName(repo.fullName) ?? null;

  const [owner] = repo.fullName.split('/');

  return {
    key: catalogProject?.id ?? String(repo.id),
    slug: catalogProject?.slug ?? repo.name,
    name: catalogProject?.name ?? repo.name,
    description: catalogProject?.summary ?? repo.description,

    sourceUrl: catalogProject?.links.source ?? repo.htmlUrl,
    liveUrl: catalogProject?.links.live ?? repo.homepage,

    language: repo.language
      ? {
          name: repo.language,
          color: null,
        }
      : null,

    topics: repo.topics,

    stars: repo.stargazersCount,
    forks: repo.forksCount,
    updatedAt: repo.pushedAt,

    repository: {
      owner: owner || null,
      name: repo.name,
      fullName: repo.fullName,
    },

    catalogProject,
  };
}

export function findRepositorySummaryForReference(
  reference: string,
  repos: readonly GitHubRepositorySummary[],
): GitHubRepositorySummary | null {
  const catalogProject = getCatalogProjectForReference(reference);

  if (catalogProject) {
    const expectedFullName =
      `${catalogProject.repository.owner}/${catalogProject.repository.name}`;

    return (
      repos.find(
        (repo) =>
          normalize(repo.fullName) === normalize(expectedFullName),
      ) ?? null
    );
  }

  const normalizedReference = normalize(reference);

  return (
    repos.find(
      (repo) =>
        normalize(repo.name) === normalizedReference ||
        normalize(repo.fullName).endsWith(
          `/${normalizedReference}`,
        ),
    ) ?? null
  );
}
