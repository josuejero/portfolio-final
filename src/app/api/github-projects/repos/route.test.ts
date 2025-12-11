// FILE: src/app/api/github-projects/repos/route.test.ts
// @vitest-environment node

import type { GitHubRepositorySummary } from '@/types/github';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from './route';

interface MockResponseInit<T> {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
}

function makeMockResponse<T>(body: T, status = 200): MockResponseInit<T> {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  };
}

describe('GET /api/github-projects/repos', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('maps GitHub repo fields to GitHubRepositorySummary', async () => {
    const apiRepos = [
      {
        id: 123,
        name: 'example',
        full_name: 'user/example',
        description: 'Example repo',
        html_url: 'https://github.com/user/example',
        homepage: 'https://example.com',
        language: 'TypeScript',
        stargazers_count: 10,
        forks_count: 2,
        open_issues_count: 1,
        topics: ['portfolio'],
        archived: false,
        disabled: false,
        fork: false,
        pushed_at: '2025-01-01T00:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      },
    ];

    const fetchMock = vi.fn(async () =>
      makeMockResponse(apiRepos) as unknown as Response,
    );

    global.fetch = fetchMock as unknown as typeof fetch;

    const response = await GET();
    const json = (await response.json()) as GitHubRepositorySummary[];

    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(1);

    const repo = json[0];

    expect(repo.id).toBe(123);
    expect(repo.name).toBe('example');
    expect(repo.fullName).toBe('user/example');
    expect(repo.htmlUrl).toBe('https://github.com/user/example');
    expect(repo.homepage).toBe('https://example.com');
    expect(repo.language).toBe('TypeScript');
    expect(repo.stargazersCount).toBe(10);
    expect(repo.forksCount).toBe(2);
    expect(repo.openIssuesCount).toBe(1);
    expect(repo.topics).toContain('portfolio');

    const cacheControl = response.headers.get('Cache-Control');
    expect(cacheControl).not.toBeNull();
  });

  it('normalizes GitHub errors into an empty array', async () => {
    const fetchMock = vi.fn(async () =>
      makeMockResponse({ message: 'Internal error' }, 500) as unknown as Response,
    );

    global.fetch = fetchMock as unknown as typeof fetch;

    const response = await GET();
    const json = (await response.json()) as GitHubRepositorySummary[];

    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(0);
  });
});
