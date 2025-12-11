// src/hooks/useGithubStats.ts
import type { GitHubStats } from '@/types/github';
import { useEffect, useState } from 'react';

const createEmptyStats = (): GitHubStats => ({
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

  // Profile info for hero card and about page
  avatarUrl: '',
  name: '',
  bio: '',
  location: '',
  company: '',
  profileUrl: '',
  memberSinceYear: 0,

  // UI state
  loading: true,
  error: null,
});

export default function useGithubStats(username: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>(createEmptyStats());

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));
        
        // Call our server-side API route instead of fetching directly from GitHub
        const response = await fetch(`/api/github-stats`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub stats: ${response.status}`);
        }
        
        const data = await response.json();
        setStats({
          ...data,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        }));
      }
    };

    fetchGitHubStats();
    
    // Refresh every 15 minutes for fresh data
    const interval = setInterval(fetchGitHubStats, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [username]);

  return stats;
}