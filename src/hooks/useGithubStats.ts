import { useState, useEffect } from 'react';
import type { GitHubStats } from '../types/github';

export function useGithubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats & { loading: boolean; error: string | null }>({
    totalRepos: 0,
    totalCommits: 0,
    followers: 0,
    following: 0,
    topLanguages: {},
    commitActivity: [], // Initialize commitActivity
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const response = await fetch(`/api/github-stats?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        const data = await response.json();
        setStats({
          ...data,
          loading: false,
          error: null
        });
      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        }));
      }
    }

    fetchGitHubStats();
  }, [username]);

  return stats;
}

export default useGithubStats;