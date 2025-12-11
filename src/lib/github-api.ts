// FILE: src/lib/github-api.ts
// src/lib/github-api.ts
import { Redis } from '@upstash/redis';

export const GITHUB_API_BASE = 'https://api.github.com';
export const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

// Default TTL for cache entries (in seconds)
const MEMORY_CACHE_TTL = 15 * 60; // 15 minutes

// Simple in-memory cache as a fallback when Redis is not available
const memoryCache = new Map<string, CacheEntry<unknown>>();

// Singleton Redis client so we don't create multiple instances
let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  // Guard against non-Node environments (e.g. browser)
  if (typeof process === 'undefined' || !process.env) {
    return null;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis({
      url,
      token,
    });
  }

  return redisClient;
}

/**
 * cachedFetch
 *
 * Generic cache helper that:
 * - Tries Redis first if configured
 * - Falls back to in-memory cache
 * - Falls back to live fetch on any cache failure
 */
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = MEMORY_CACHE_TTL,
): Promise<T> {
  const now = Date.now();
  const redis = getRedisClient();

  // Try Redis cache first
  if (redis) {
    try {
      const cached = await redis.get<CacheEntry<T>>(key);

      if (
        cached &&
        typeof cached === 'object' &&
        typeof (cached as CacheEntry<T>).expiresAt === 'number' &&
        (cached as CacheEntry<T>).expiresAt > now
      ) {
        return (cached as CacheEntry<T>).value;
      }

      // Cache miss or expired: fetch fresh data
      const value = await fetchFn();
      const entry: CacheEntry<T> = {
        value,
        expiresAt: now + ttlSeconds * 1000,
      };

      // TTL in seconds for Redis
      await redis.set(key, entry, { ex: ttlSeconds });

      return value;
    } catch (error) {
      // On Redis failure, just fall back to memory / live fetch
      // eslint-disable-next-line no-console
      console.error('[cachedFetch] Redis error, falling back to memory cache', error);
    }
  }

  // Try memory cache
  const existing = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (existing && existing.expiresAt > now) {
    return existing.value;
  }

  // Fetch fresh data
  const value = await fetchFn();
  const entry: CacheEntry<T> = {
    value,
    expiresAt: now + ttlSeconds * 1000,
  };

  // Cache in memory (TTL in ms)
  memoryCache.set(key, entry);

  return value;
}

// Clean up old memory cache entries periodically (server-only).
// We guard with a flag on globalThis so we don't create multiple intervals
// during hot reloads or in test environments that re-import this module.
declare const globalThis: typeof global & {
  __GITHUB_API_CACHE_SWEEP__?: boolean;
};

if (typeof globalThis !== 'undefined' && !globalThis.__GITHUB_API_CACHE_SWEEP__) {
  globalThis.__GITHUB_API_CACHE_SWEEP__ = true;

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache.entries()) {
      if (entry.expiresAt <= now) {
        memoryCache.delete(key);
      }
    }
  }, 60_000); // Clean every minute
}

/**
 * Build headers for GitHub REST / GraphQL APIs.
 *
 * - Always includes GitHub's recommended Accept + User-Agent headers.
 * - Optionally adds Authorization if a token is provided.
 * - Merges in any extra headers the caller passes.
 */
export function getGitHubHeaders(
  token?: string,
  extra: Record<string, string> = {},
): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-final',
    ...extra,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// Helper to generate cache keys
export function getCacheKey(
  endpoint: string,
  params: Record<string, string> = {},
): string {
  const sortedKeys = Object.keys(params).sort();

  if (sortedKeys.length === 0) {
    return endpoint;
  }

  const query = sortedKeys
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return `${endpoint}?${query}`;
}

// Rate limiting helper
export class RateLimiter {
  // 1 hour window
  private static readonly WINDOW_MS = 60 * 60 * 1000;
  // Leave some buffer under GitHub's 5000/hr limit
  private static readonly MAX_REQUESTS = 4000;

  // Map of endpoint -> timestamps (ms) of recent requests
  private static requests = new Map<string, number[]>();

  private static prune(endpoint: string, now: number): number[] {
    const windowStart = now - this.WINDOW_MS;
    const list = this.requests.get(endpoint) ?? [];
    const pruned = list.filter((ts) => ts > windowStart);
    this.requests.set(endpoint, pruned);
    return pruned;
  }

  /**
   * Check whether we can make another request for this endpoint
   * in the current window. Does NOT record the request; caller
   * should call recordRequest() after actually making the call.
   */
  static canMakeRequest(endpoint: string): boolean {
    const now = Date.now();
    const recent = this.prune(endpoint, now);
    return recent.length < this.MAX_REQUESTS;
  }

  /**
   * Record that we have made a request to this endpoint.
   * If we are already at the limit, this is a no-op to avoid
   * inflating the count further.
   */
  static recordRequest(endpoint: string): void {
    const now = Date.now();
    const recent = this.prune(endpoint, now);

    if (recent.length >= this.MAX_REQUESTS) {
      // If already at limit, do not record a new one
      return;
    }

    // Record this request and allow
    recent.push(now);
    this.requests.set(endpoint, recent);
  }

  /**
   * Return how many requests remain in the current window
   * for the given endpoint.
   */
  static getRemainingRequests(endpoint: string): number {
    const now = Date.now();
    const recent = this.prune(endpoint, now);
    const remaining = this.MAX_REQUESTS - recent.length;
    return remaining > 0 ? remaining : 0;
  }
}
