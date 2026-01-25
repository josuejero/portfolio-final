import { Redis } from '@upstash/redis';

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const MEMORY_CACHE_TTL = 15 * 60;
const memoryCache = new Map<string, CacheEntry<unknown>>();
let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  if (typeof process === 'undefined' || !process.env) {
    return null;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis({ url, token });
  }

  return redisClient;
}

export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = MEMORY_CACHE_TTL,
): Promise<T> {
  const now = Date.now();
  const redis = getRedisClient();

  if (redis) {
    try {
      const cached = await redis.get<CacheEntry<T>>(key);

      if (
        cached &&
        typeof cached === 'object' &&
        typeof cached.expiresAt === 'number' &&
        cached.expiresAt > now
      ) {
        return cached.value;
      }

      const value = await fetchFn();
      const entry: CacheEntry<T> = {
        value,
        expiresAt: now + ttlSeconds * 1000,
      };

      await redis.set(key, entry, { ex: ttlSeconds });
      return value;
    } catch (error) {
      console.error('[cachedFetch] Redis error, falling back to memory cache', error);
    }
  }

  const existing = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (existing && existing.expiresAt > now) {
    return existing.value;
  }

  const value = await fetchFn();
  const entry: CacheEntry<T> = {
    value,
    expiresAt: now + ttlSeconds * 1000,
  };

  memoryCache.set(key, entry);
  return value;
}

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
  }, 60_000);
}

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
