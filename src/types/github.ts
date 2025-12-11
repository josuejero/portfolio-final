// src/types/github.ts

// Simple monthly aggregate used by the commit activity chart
export interface CommitActivity {
  month: string; // e.g. "Jan 25"
  commits: number;
}

// Contribution calendar types
export interface GitHubContributionDay {
  date: string; // ISO date, e.g. "2025-01-01"
  count: number;
  // 0 = Sunday ... 6 = Saturday (matches GitHub's weekday field)
  weekday: number;
}

export interface GitHubContributionWeek {
  days: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

// Streaks and derived patterns from the contribution calendar
export interface GitHubStreakStats {
  currentStreak: number;
  longestStreak: number;
  busiestDayOfWeek: string;
  averageCommitsPerActiveDay: number;
}

// Activity feed types
export type GitHubActivityType =
  | 'PR_MERGED'
  | 'ISSUE_OPENED'
  | 'REPO_CREATED'
  | 'STARRED_REPO';

export interface GitHubActivityItem {
  id: string;
  type: GitHubActivityType;
  title: string;
  repoName: string;
  url: string;
  date: string; // ISO timestamp
}

// Main stats object consumed by hooks and components
export interface GitHubStats {
  // Core counters
  totalRepos: number;
  totalCommits: number;
  followers: number;
  following: number;
  topLanguages: Record<string, number>;
  commitActivity: CommitActivity[];

  // Snapshot bar metrics
  totalStars: number;
  totalForks: number;
  totalOpenIssues: number;
  contributionsThisYear: number;

  // Contribution calendar and derived streaks
  contributionCalendar: GitHubContributionCalendar | null;
  streaks: GitHubStreakStats | null;

  // Activity feed
  activity: GitHubActivityItem[];

  // Profile info for hero card and about page
  avatarUrl: string;
  name: string;
  bio: string;
  location: string;
  company: string;
  profileUrl: string;
  memberSinceYear: number;

  // UI state
  loading: boolean;
  error: string | null;
}

// Repository cards / explorer
export interface GitHubPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
  topics: string[];
}

export interface GitHubRepositorySummary {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  topics: string[];
  archived: boolean;
  disabled: boolean;
  pushedAt: string;
  createdAt: string;
}

// Releases
export interface GitHubRelease {
  id: number;
  tagName: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  htmlUrl: string;
  publishedAt: string | null;
}

// README highlights
export interface GitHubReadme {
  repo: string;
  path: string;
  excerpt: string;
  html: string;
  lastFetched: string; // ISO timestamp
}

// README highlight types (alternative/legacy)
export interface GitHubReadmeHighlight {
  repo: string;
  path: string;
  excerpt: string;
  fullMarkdown: string;
  html?: string;
  lastFetched: string;
}

// Gist types
export interface GitHubGistFile {
  filename: string;
  language: string | null;
  raw_url: string;
  size: number;
  content: string;
}

export interface GitHubGist {
  id: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  files: Record<string, GitHubGistFile>;
  tags?: string[];
}