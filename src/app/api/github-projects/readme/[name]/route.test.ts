// @vitest-environment node

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { GET } from './route';

describe('GET /api/github-projects/readme/[name]', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('uses an explicitly requested repository owner', async () => {
    const fetchMock = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) => {
        return new Response(
        JSON.stringify({
          encoding: 'base64',
          content: Buffer.from('# Example').toString('base64'),
          path: 'README.md',
          html_url:
            'https://github.com/example-owner/example-repo/blob/main/README.md',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
        );
      },
    );

    global.fetch = fetchMock as typeof fetch;

    const request = new Request(
      'http://localhost/api/github-projects/readme/example-repo?owner=example-owner',
    );

    const response = await GET(request, {
      params: Promise.resolve({
        name: 'example-repo',
      }),
    });

    expect(response.status).toBe(200);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
      'https://api.github.com/repos/example-owner/example-repo/readme',
    );

    const json = await response.json();

    expect(json.readme.repo).toBe('example-repo');
    expect(json.readme.markdown).toBe('# Example');
  });
});
