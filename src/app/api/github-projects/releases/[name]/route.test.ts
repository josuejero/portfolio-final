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

describe('/api/github-projects/releases/[name] GET', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.GITHUB_TOKEN = 'test-token';
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns normalized releases', async () => {
    const githubPayload = [
      {
        id: 1,
        tag_name: 'v1.0.0',
        name: 'First release',
        body: 'Changelog',
        draft: false,
        prerelease: false,
        html_url: 'https://github.com/user/demo/releases/v1.0.0',
        published_at: '2025-01-01T00:00:00Z',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue(
      makeMockResponse(githubPayload),
    ) as any;

    const req = new Request('http://localhost/api/github-projects/releases/demo');

    const res = await GET(req, {
      params: Promise.resolve({ name: 'demo' }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
    const release = json[0];

    expect(release.tagName).toBe('v1.0.0');
    expect(release.name).toBe('First release');
    expect(release.htmlUrl).toContain('github.com');
    expect(release.publishedAt).toBe('2025-01-01T00:00:00Z');
  });

  it('returns empty array when repo has no releases', async () => {
    global.fetch = vi.fn().mockResolvedValue(
      makeMockResponse([], 200),
    ) as any;

    const req = new Request('http://localhost/api/github-projects/releases/demo');
    const res = await GET(req, {
      params: Promise.resolve({ name: 'demo' }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(0);
  });
});
