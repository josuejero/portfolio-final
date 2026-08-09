import { describe, expect, it } from 'vitest';

import type { GitHubRepositorySummary } from '@/types/github';

import {
  findRepositorySummaryForReference,
  getCatalogProjectForReference,
  toRepositoryProjectViewModel,
} from './view-model';

function makeRepository(
  overrides: Partial<GitHubRepositorySummary> = {},
): GitHubRepositorySummary {
  return {
    id: 1,
    name: 'grocery-finder',
    fullName: 'josuejero/grocery-finder',
    description: 'Find inexpensive groceries',
    htmlUrl: 'https://github.com/josuejero/grocery-finder',
    homepage: 'https://example.com',
    language: 'Python',
    stargazersCount: 3,
    forksCount: 1,
    openIssuesCount: 0,
    topics: ['python'],
    archived: false,
    disabled: false,
    pushedAt: '2026-01-01T00:00:00Z',
    createdAt: '2025-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('project view-model adapter', () => {
  it('maps catalogued repository summaries to stable project slugs', () => {
    const view = toRepositoryProjectViewModel(makeRepository());

    expect(view.slug).toBe('cheapest-grocery-finder');
    expect(view.name).toBe('Cheapest Grocery Finder');
    expect(view.repository.name).toBe('grocery-finder');
    expect(view.catalogProject?.id).toBe(
      'cheapest-grocery-finder',
    );
  });

  it('preserves uncatalogued GitHub repositories', () => {
    const repo = makeRepository({
      id: 99,
      name: 'experimental-repo',
      fullName: 'josuejero/experimental-repo',
      htmlUrl: 'https://github.com/josuejero/experimental-repo',
    });

    const view = toRepositoryProjectViewModel(repo);

    expect(view.slug).toBe('experimental-repo');
    expect(view.name).toBe('experimental-repo');
    expect(view.catalogProject).toBeNull();
  });

  it('resolves both canonical slugs and legacy repository names', () => {
    expect(
      getCatalogProjectForReference(
        'cheapest-grocery-finder',
      )?.repository.name,
    ).toBe('grocery-finder');

    expect(
      getCatalogProjectForReference('grocery-finder')?.slug,
    ).toBe('cheapest-grocery-finder');
  });

  it('finds repository data for a canonical project slug', () => {
    const repos = [
      makeRepository(),
      makeRepository({
        id: 2,
        name: 'something-else',
        fullName: 'josuejero/something-else',
      }),
    ];

    expect(
      findRepositorySummaryForReference(
        'cheapest-grocery-finder',
        repos,
      )?.name,
    ).toBe('grocery-finder');
  });

  it('retains fallback matching for uncatalogued repository routes', () => {
    const repos = [
      makeRepository({
        id: 9,
        name: 'uncatalogued',
        fullName: 'josuejero/uncatalogued',
      }),
    ];

    expect(
      findRepositorySummaryForReference(
        'uncatalogued',
        repos,
      )?.fullName,
    ).toBe('josuejero/uncatalogued');
  });
});
