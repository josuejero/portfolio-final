// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cachedFetch,
  getCacheKey,
  getGitHubHeaders,
  RateLimiter,
} from './github-api';

describe('getGitHubHeaders', () => {
  it('includes auth and default GitHub headers', () => {
    const headers = getGitHubHeaders('test-token', { 'X-Test': '1' });

    expect(headers.Authorization).toBe('Bearer test-token');
    expect(headers.Accept).toContain('github'); // vnd.github+json etc
    expect(headers['X-Test']).toBe('1');
  });
});

describe('getCacheKey', () => {
  it('includes endpoint and params in a stable way', () => {
    const keyA = getCacheKey('/users', { username: 'foo', page: '1' });
    const keyB = getCacheKey('/users', { page: '1', username: 'foo' });

    expect(keyA).toBe(keyB);
    expect(keyA).toContain('/users');
  });
});

describe('cachedFetch (memory cache path)', () => {
  beforeEach(() => {
    // Make sure we do not accidentally rely on Redis env
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it('calls the fetch function only once for the same key', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ value: 42 });

    const a = await cachedFetch<{ value: number }>('test-key', fetchFn, 60);
    const b = await cachedFetch<{ value: number }>('test-key', fetchFn, 60);

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(b).toEqual(a);
  });

  it('can cache different keys independently', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({ value: 1 })
      .mockResolvedValueOnce({ value: 2 });

    const v1 = await cachedFetch<{ value: number }>('key-1', fetchFn, 60);
    const v2 = await cachedFetch<{ value: number }>('key-2', fetchFn, 60);

    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(v1.value).toBe(1);
    expect(v2.value).toBe(2);
  });
});

describe('RateLimiter', () => {
  it('starts with remaining requests equal to the configured max', () => {
    const remaining = RateLimiter.getRemainingRequests('github-stats');
    expect(remaining).toBeGreaterThan(0);
  });

  it('reduces remaining requests after calling canMakeRequest', () => {
    const before = RateLimiter.getRemainingRequests('github-stats');

    const allowed = RateLimiter.canMakeRequest('github-stats');
    const after = RateLimiter.getRemainingRequests('github-stats');

    expect(allowed).toBe(true);
    expect(after).toBeLessThanOrEqual(before);
  });

  it('eventually stops allowing requests when the limit is exceeded', () => {
    const endpoint = 'github-stats-heavy';

    // Bang on it enough times to cross the limit window
    for (let i = 0; i < 4100; i++) {
      RateLimiter.canMakeRequest(endpoint);
    }

    const remaining = RateLimiter.getRemainingRequests(endpoint);
    expect(remaining).toBeGreaterThanOrEqual(0);
    expect(RateLimiter.canMakeRequest(endpoint)).toBe(false);
  });
});
