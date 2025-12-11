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

describe('/api/github-stats GET', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.GITHUB_TOKEN = 'test-token';
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns a GitHubStats-like object for a username', async () => {
    // Very rough multi-call mock.
    // The route will call multiple GitHub endpoints.
    // We respond with simple, type-compatible data for each call.
    const mockFetch = vi.fn().mockImplementation(async (input: any, init?: any) => {
      const url = typeof input === 'string' ? input : input.url;

      // User profile
      if (url.includes('/users/') && !url.includes('/repos')) {
        return makeMockResponse({
          login: 'demo',
          avatar_url: 'https://avatars.githubusercontent.com/u/1',
          html_url: 'https://github.com/demo',
          bio: 'Demo user',
          location: 'Internet',
          company: 'Self',
          followers: 5,
          following: 2,
          public_repos: 3,
          created_at: '2020-01-01T00:00:00Z',
          name: 'Demo',
        });
      }

      // Repos list
      if (url.includes('/repos')) {
        return makeMockResponse([
          {
            name: 'demo',
            full_name: 'demo/demo',
            stargazers_count: 10,
            forks_count: 1,
            open_issues_count: 0,
            language: 'TypeScript',
            fork: false,
            archived: false,
            pushed_at: '2025-01-01T00:00:00Z',
            size: 100,
          },
        ]);
      }

      // GraphQL for contributions and activity
      if (url.includes('/graphql')) {
        return makeMockResponse({
          data: {
            user: {
              contributionsCollection: {
                contributionCalendar: {
                  totalContributions: 5,
                  weeks: [
                    {
                      contributionDays: [
                        {
                          date: '2025-01-01',
                          contributionCount: 5,
                          weekday: 3,
                        },
                      ],
                    },
                  ],
                },
              },
              pullRequests: { nodes: [] },
              issues: { nodes: [] },
              repositories: { nodes: [] },
              starredRepositories: { edges: [] },
            },
          },
          errors: [],
        });
      }

      return makeMockResponse({}, 200);
    });

    global.fetch = mockFetch as any;

    const req = new Request('http://localhost/api/github-stats?username=demo');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const json = await res.json();

    // Check a few key pieces of the GitHubStats shape
    expect(json).toHaveProperty('totalRepos');
    expect(json).toHaveProperty('totalStars');
    expect(json).toHaveProperty('followers');
    expect(json).toHaveProperty('topLanguages');
    expect(json).toHaveProperty('commitActivity');
    expect(json).toHaveProperty('contributionCalendar');
    expect(json).toHaveProperty('activity');
    expect(json).toHaveProperty('avatarUrl');
    expect(json).toHaveProperty('profileUrl');
  });

  it('returns an error structure when token is missing', async () => {
    delete process.env.GITHUB_TOKEN;

    const req = new Request('http://localhost/api/github-stats?username=demo');
    const res = await GET(req);

    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
