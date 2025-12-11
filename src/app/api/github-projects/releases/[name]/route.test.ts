// FILE: src/app/api/github-projects/releases/[name]/route.test.ts
// @vitest-environment node

import type { GitHubRelease } from '@/types/github';
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

describe('GET /api/github-projects/releases/[name]', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns transformed releases on success', async () => {
    const apiReleases = [
      {
        id: 1,
        tag_name: 'v1.0.0',
        name: 'First release',
        body: 'Changelog',
        draft: false,
        prerelease: false,
        html_url: 'https://github.com/example/repo/releases/1',
        published_at: '2025-01-01T00:00:00Z',
      },
    ];

    const fetchMock = vi.fn(async () =>
      makeMockResponse(apiReleases) as unknown as Response,
    );

    global.fetch = fetchMock as unknown as typeof fetch;

    const request = new Request(
      'http://localhost/api/github-projects/releases/example',
    );

    const response = await GET(request, {
      params: Promise.resolve({ name: 'example' }),
    });

    const json = (await response.json()) as GitHubRelease[];

    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(1);

    const release = json[0];

    expect(release.tagName).toBe('v1.0.0');
    expect(release.htmlUrl).toBe(
      'https://github.com/example/repo/releases/1',
    );
  });

  it('normalizes GitHub errors into an empty array', async () => {
    const fetchMock = vi.fn(async () =>
      makeMockResponse({ message: 'Internal error' }, 500) as unknown as Response,
    );

    global.fetch = fetchMock as unknown as typeof fetch;

    const request = new Request(
      'http://localhost/api/github-projects/releases/example',
    );

    const response = await GET(request, {
      params: Promise.resolve({ name: 'example' }),
    });

    const json = (await response.json()) as GitHubRelease[];

    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(0);
  });
});
