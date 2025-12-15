// src/lib/github-api.ts
import { Redis } from '@upstash/redis';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

// Use Upstash Redis for caching if available, otherwise use in-memory cache
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const memoryCache = new Map<string, CacheEntry<unknown>>();
const MEMORY_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 900
): Promise<T> {
  const cacheKey = `github:${key}`;
  
  // Try Redis cache first
  if (redis) {
    try {
      const cached = await redis.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    } catch (error: unknown) {
      console.warn('Redis cache error:', error);
    }
  }

  // Try memory cache
  const memoryEntry = memoryCache.get(cacheKey);
  if (memoryEntry && memoryEntry.expiresAt > Date.now()) {
    return memoryEntry.value as T;
  }

  // Fetch fresh data
  try {
    const data = await fetchFn();
    
    // Cache in Redis
    if (redis) {
      try {
        await redis.setex(cacheKey, ttlSeconds, data);
      } catch (error: unknown) {
        console.warn('Redis set error:', error);
      }
    }
    
    // Cache in memory
    memoryCache.set(cacheKey, {
      value: data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    
    return data;
  } catch (error: unknown) {
    throw error;
  }
}

// Clean up old memory cache entries periodically
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache.entries()) {
      if (entry.expiresAt <= now) {
        memoryCache.delete(key);
      }
    }
  }, 60000); // Clean every minute
}

export function getGitHubHeaders(token: string, extra?: Record<string, string>) {
  return {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-app',
    ...extra,
  };
}

// Helper to generate cache keys
export function getCacheKey(endpoint: string, params: Record<string, string> = {}) {
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return `${endpoint}${paramString ? `?${paramString}` : ''}`;
}

// Rate limiting helper
export class RateLimiter {
  private static readonly requests = new Map<string, number[]>();
  private static readonly WINDOW_MS = 60 * 60 * 1000; // 1 hour
  private static readonly MAX_REQUESTS = 4000; // Leave some buffer under 5000 limit

  static canMakeRequest(endpoint: string): boolean {
    const now = Date.now();
    const endpointRequests = this.requests.get(endpoint) || [];
    
    // Clean up old requests
    const recentRequests = endpointRequests.filter(time => now - time < this.WINDOW_MS);
    this.requests.set(endpoint, recentRequests);
    
    return recentRequests.length < this.MAX_REQUESTS;
  }

  static recordRequest(endpoint: string) {
    const now = Date.now();
    const endpointRequests = this.requests.get(endpoint) || [];
    endpointRequests.push(now);
    this.requests.set(endpoint, endpointRequests);
  }

  static getRemainingRequests(endpoint: string): number {
    const now = Date.now();
    const endpointRequests = this.requests.get(endpoint) || [];
    const recentRequests = endpointRequests.filter(time => now - time < this.WINDOW_MS);
    return this.MAX_REQUESTS - recentRequests.length;
  }
}