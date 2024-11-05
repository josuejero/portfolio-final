// src/types/github.ts

export interface CommitActivity {
  month: string;
  commits: number;
}

export interface GitHubStats {
  totalRepos: number;
  totalCommits: number;
  followers: number;
  following: number;
  topLanguages: Record<string, number>;
  commitActivity: CommitActivity[];
  loading: boolean;
  error: string | null;
}