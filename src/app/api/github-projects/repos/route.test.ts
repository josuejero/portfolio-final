// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from './route';

interface MockResponseInit {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
}

function makeMockResponse(body: any, status = 200): MockResponseInit {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe('/api/github-projects/repos GET', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.GITHUB_TOKEN = 'test-token';
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('maps GitHub repo fields to GitHubRepositorySummary[]', async () => {
    const githubPayload = [
      {
        id: 1,
        name: 'demo',
        full_name: 'user/demo',
        description: 'Demo repo',
        html_url: 'https://github.com/user/demo',
        homepage: 'https://demo.example.com',
        language: 'TypeScript',
        stargazers_count: 10,
        forks_count: 2,
        open_issues_count: 1,
        topics: ['nextjs', 'portfolio'],
        archived: false,
        disabled: false,
        pushed_at: '2025-01-01T00:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue(
      makeMockResponse(githubPayload),
    ) as any;

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();

    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(1);

    const repo = json[0];

    // Check mapping from snake_case to camelCase type
    expect(repo.id).toBe(1);
    expect(repo.name).toBe('demo');
    expect(repo.fullName).toBe('user/demo');
    expect(repo.htmlUrl).toBe('https://github.com/user/demo');
    expect(repo.homepage).toBe('https://demo.example.com');
    expect(repo.stargazersCount).toBe(10);
    expect(repo.forksCount).toBe(2);
    expect(repo.openIssuesCount).toBe(1);
    expect(repo.archived).toBe(false);
    expect(repo.disabled).toBe(false);
    expect(repo.topics).toEqual(['nextjs', 'portfolio']);

    // Cache header should exist (exact value may differ)
    expect(res.headers.get('Cache-Control')).toBeTruthy();
  });

  it('returns an empty array but still a 200 on GitHub error', async () => {
    // Simulate GitHub 500
    global.fetch = vi.fn().mockResolvedValue(
      makeMockResponse({ message: 'Server error' }, 500),
    ) as any;

    const res = await GET();
    expect(res.status).toBe(200); // route normalizes to empty list

    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });
});
