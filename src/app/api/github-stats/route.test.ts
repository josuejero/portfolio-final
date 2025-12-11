// FILE: src/app/api/github-stats/route.test.ts
// @vitest-environment node

import type { GitHubStats } from '@/types/github';
import { describe, expect, it } from 'vitest';
import { GET } from './route';

describe('github-stats route module', () => {
  it('exports a GET handler', () => {
    expect(typeof GET).toBe('function');
  });

  it('GitHubStats example object satisfies the type shape', () => {
    const stats: GitHubStats = {
      // Core counters
      totalRepos: 0,
      totalCommits: 0,
      followers: 0,
      following: 0,
      topLanguages: {},
      commitActivity: [],

      // Snapshot bar metrics
      totalStars: 0,
      totalForks: 0,
      totalOpenIssues: 0,
      contributionsThisYear: 0,

      // Contribution calendar and derived streaks
      contributionCalendar: null,
      streaks: null,

      // Activity feed
      activity: [],

      // Profile info
      avatarUrl: '',
      name: '',
      bio: '',
      location: '',
      company: '',
      profileUrl: '',
      memberSinceYear: 1970,

      // UI state
      loading: false,
      error: null,
    };

    expect(stats.totalRepos).toBe(0);
    expect(stats.activity).toEqual([]);
  });
});
