import { describe, expect, it } from 'vitest';

import { getRoleLensById } from '@/data/role-lenses';
import type { GitHubRepositorySummary } from '@/types/github';

import { partitionRepositoriesForRoleLens } from './role-lens';

function makeRepository(
  name: string,
  fullName: string,
  id: number,
): GitHubRepositorySummary {
  return {
    id,
    name,
    fullName,
    description: null,
    htmlUrl: `https://github.com/${fullName}`,
    homepage: null,
    language: null,
    stargazersCount: 0,
    forksCount: 0,
    openIssuesCount: 0,
    topics: [],
    archived: false,
    disabled: false,
    pushedAt: '2026-01-01T00:00:00Z',
    createdAt: '2025-01-01T00:00:00Z',
  };
}

describe('role-lens repository partitioning', () => {
  it('orders matched repositories by curated lens priority', () => {
    const lens = getRoleLensById('software-engineering');

    expect(lens).toBeDefined();

    const repos = [
      makeRepository(
        'portfolio',
        'josuejero/portfolio',
        1,
      ),
      makeRepository(
        'grocery-finder',
        'josuejero/grocery-finder',
        2,
      ),
      makeRepository(
        'finance-tracker',
        'josuejero/finance-tracker',
        3,
      ),
    ];

    const result = partitionRepositoriesForRoleLens(
      repos,
      lens!,
    );

    expect(result.matched.map((repo) => repo.name)).toEqual([
      'finance-tracker',
      'grocery-finder',
      'portfolio',
    ]);

    expect(result.other).toEqual([]);
  });

  it('keeps canonical projects outside the selected lens visible', () => {
    const lens = getRoleLensById('frontend-dx');

    expect(lens).toBeDefined();

    const portfolio = makeRepository(
      'portfolio',
      'josuejero/portfolio',
      1,
    );

    const finance = makeRepository(
      'finance-tracker',
      'josuejero/finance-tracker',
      2,
    );

    const result = partitionRepositoriesForRoleLens(
      [finance, portfolio],
      lens!,
    );

    expect(result.matched.map((repo) => repo.name)).toEqual([
      'portfolio',
    ]);

    expect(result.other.map((repo) => repo.name)).toEqual([
      'finance-tracker',
    ]);
  });

  it('keeps uncatalogued GitHub repositories visible', () => {
    const lens = getRoleLensById('cloud-automation');

    expect(lens).toBeDefined();

    const uncatalogued = makeRepository(
      'experimental-repo',
      'josuejero/experimental-repo',
      99,
    );

    const result = partitionRepositoriesForRoleLens(
      [uncatalogued],
      lens!,
    );

    expect(result.matched).toEqual([]);
    expect(result.other).toEqual([uncatalogued]);
  });

  it('supports catalogued repositories owned by another account', () => {
    const lens = getRoleLensById('frontend-dx');

    expect(lens).toBeDefined();

    const external = makeRepository(
      'ozzie-photography',
      'CourajeousMax/ozzie-photography',
      50,
    );

    const result = partitionRepositoriesForRoleLens(
      [external],
      lens!,
    );

    expect(result.matched).toEqual([external]);
    expect(result.other).toEqual([]);
  });

  it('preserves lens ordering rather than GitHub response ordering', () => {
    const lens = getRoleLensById('cloud-automation');

    expect(lens).toBeDefined();

    const product = makeRepository(
      'product-affordability-predictor',
      'josuejero/product-affordability-predictor',
      1,
    );

    const finance = makeRepository(
      'finance-tracker',
      'josuejero/finance-tracker',
      2,
    );

    const selestino = makeRepository(
      'selestino',
      'josuejero/selestino',
      3,
    );

    const result = partitionRepositoriesForRoleLens(
      [product, finance, selestino],
      lens!,
    );

    expect(result.matched.map((repo) => repo.name)).toEqual([
      'selestino',
      'finance-tracker',
      'product-affordability-predictor',
    ]);
  });
});
