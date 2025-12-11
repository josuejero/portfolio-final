// src/app/api/github-stats/route.ts
import type {
  GitHubActivityItem,
  GitHubContributionCalendar,
  GitHubStreakStats,
} from '@/types/github';
import { NextResponse } from 'next/server';

interface GitHubUserResponse {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  name: string | null;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  size: number;
}

interface GitHubCommit {
  commit: {
    author: {
      date: string | null;
    } | null;
  } | null;
}

type GitHubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              weekday: number;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

type GitHubActivityType =
  | 'PR_MERGED'
  | 'ISSUE_OPENED'
  | 'REPO_CREATED'
  | 'STARRED_REPO';

interface GitHubActivityResponse {
  data?: {
    user?: {
      pullRequests: {
        nodes: {
          id: string;
          title: string;
          url: string;
          mergedAt: string | null;
          updatedAt: string;
          repository: { nameWithOwner: string };
        }[];
      };
      issues: {
        nodes: {
          id: string;
          title: string;
          url: string;
          createdAt: string;
          repository: { nameWithOwner: string };
        }[];
      };
      repositories: {
        nodes: {
          id: string;
          nameWithOwner: string;
          url: string;
          createdAt: string;
        }[];
      };
      starredRepositories: {
        edges: {
          starredAt: string;
          node: {
            id: string;
            nameWithOwner: string;
            url: string;
          };
        }[];
      };
    };
  };
  errors?: { message: string }[];
}

function getGitHubHeaders(token: string, extra?: Record<string, string>) {
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...extra,
  };
}

// Cache control helper
function setCacheHeaders(response: NextResponse, maxAge: number = 900) {
  response.headers.set(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  );
  response.headers.set('Vary', 'Accept-Encoding');
  return response;
}

// Fetch user profile
async function fetchUser(
  username: string,
  token: string,
): Promise<GitHubUserResponse> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: getGitHubHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}

// Fetch all public repos for the user (paged)
async function fetchRepos(
  username: string,
  token: string,
): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
      {
        headers: getGitHubHeaders(token),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.status}`);
    }

    const pageRepos = await response.json();
    if (pageRepos.length === 0) break;

    repos.push(...pageRepos);
    if (pageRepos.length < perPage) break;
    page++;
  }

  return repos;
}

// Build a monthly commit activity map by hitting per repo commit lists
async function buildCommitActivity(
  username: string,
  repos: GitHubRepo[],
  token: string,
) {
  const monthlyCommits: Record<string, number> = {};
  const currentYear = new Date().getFullYear();

  // Limit to non fork, non archived to avoid noisy stats
  const activeRepos = repos.filter(repo => !repo.fork && !repo.archived);
  
  // Sample only the most recent 20 repos to avoid hitting rate limits
  const sampleRepos = activeRepos.slice(0, 20);

  for (const repo of sampleRepos) {
    try {
      // Do not crash entire stats if one repo fails
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?since=${currentYear}-01-01T00:00:00Z&per_page=100`,
        {
          headers: getGitHubHeaders(token),
        }
      );

      if (!response.ok) continue; // Skip if repo has no commits or error

      const commits: GitHubCommit[] = await response.json();
      commits.forEach(commit => {
        if (commit?.commit?.author?.date) {
          const date = new Date(commit.commit.author.date);
          const monthKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear().toString().slice(-2)}`;
          monthlyCommits[monthKey] = (monthlyCommits[monthKey] || 0) + 1;
        }
      });
    } catch (error) {
      console.warn(`Failed to fetch commits for ${repo.name}:`, error);
      continue;
    }
  }

  // Convert to array and sort by month
  return Object.entries(monthlyCommits)
    .map(([month, commits]) => ({ month, commits }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
      return months.indexOf(aMonth) - months.indexOf(bMonth);
    });
}

// GraphQL: contribution calendar and streak stats
async function getContributionCalendarAndStreaks(
  username: string,
  token: string,
): Promise<{
  contributionCalendar: GitHubContributionCalendar | null;
  streaks: GitHubStreakStats | null;
}> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: getGitHubHeaders(token, {
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    console.warn('GraphQL contribution calendar fetch failed:', response.status);
    return { contributionCalendar: null, streaks: null };
  }

  const result: GitHubContributionsResponse = await response.json();
  
  if (result.errors || !result.data?.user?.contributionsCollection?.contributionCalendar) {
    console.warn('GraphQL contribution calendar error:', result.errors);
    return { contributionCalendar: null, streaks: null };
  }

  const calendarData = result.data.user.contributionsCollection.contributionCalendar;
  
  const contributionCalendar: GitHubContributionCalendar = {
    totalContributions: calendarData.totalContributions,
    weeks: calendarData.weeks.map(week => ({
      days: week.contributionDays.map(day => ({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
      })),
    })),
  };

  // Calculate streaks from calendar data
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  // Flatten all days and sort by date (newest first)
  const allDays = contributionCalendar.weeks.flatMap(week => week.days);
  allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Calculate current streak
  for (const day of allDays) {
    if (day.count > 0) {
      if (currentStreak === 0 || 
          new Date(day.date).getTime() === 
          new Date(allDays[currentStreak]?.date || today).getTime() - 86400000) {
        currentStreak++;
      } else {
        break;
      }
    }
  }
  
  // Calculate longest streak
  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Calculate busiest day
  const dayCounts: Record<number, number> = {};
  allDays.forEach(day => {
    if (day.count > 0) {
      dayCounts[day.weekday] = (dayCounts[day.weekday] || 0) + day.count;
    }
  });
  
  const busiestDay = Object.entries(dayCounts).reduce((max, [day, count]) => 
    count > max.count ? { day: parseInt(day), count } : max,
    { day: 0, count: 0 }
  );
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const busiestDayOfWeek = dayNames[busiestDay.day];

  const activeDays = allDays.filter(day => day.count > 0).length;
  const averageCommitsPerActiveDay = activeDays > 0 
    ? contributionCalendar.totalContributions / activeDays 
    : 0;

  const streaks: GitHubStreakStats = {
    currentStreak,
    longestStreak,
    busiestDayOfWeek,
    averageCommitsPerActiveDay,
  };

  return { contributionCalendar, streaks };
}

// GraphQL: activity feed
async function getActivityFeed(
  username: string,
  token: string,
): Promise<GitHubActivityItem[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        pullRequests(first: 5, states: MERGED, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            mergedAt
            repository {
              nameWithOwner
            }
          }
        }
        issues(first: 5, states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            createdAt
            repository {
              nameWithOwner
            }
          }
        }
        repositories(first: 5, ownerAffiliations: OWNER, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            nameWithOwner
            url
            createdAt
          }
        }
        starredRepositories(first: 5, orderBy: {field: STARRED_AT, direction: DESC}) {
          edges {
            starredAt
            node {
              id
              nameWithOwner
              url
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: getGitHubHeaders(token, {
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    console.warn('GraphQL activity feed fetch failed:', response.status);
    return [];
  }

  const result: GitHubActivityResponse = await response.json();
  
  if (result.errors || !result.data?.user) {
    console.warn('GraphQL activity feed error:', result.errors);
    return [];
  }

  const userData = result.data.user;
  const activity: GitHubActivityItem[] = [];

  // Add PRs
  userData.pullRequests.nodes.forEach(pr => {
    if (pr.mergedAt) {
      activity.push({
        id: pr.id,
        type: 'PR_MERGED' as GitHubActivityType,
        title: pr.title,
        repoName: pr.repository.nameWithOwner,
        url: pr.url,
        date: pr.mergedAt,
      });
    }
  });

  // Add issues
  userData.issues.nodes.forEach(issue => {
    activity.push({
      id: issue.id,
      type: 'ISSUE_OPENED' as GitHubActivityType,
      title: issue.title,
      repoName: issue.repository.nameWithOwner,
      url: issue.url,
      date: issue.createdAt,
    });
  });

  // Add created repos
  userData.repositories.nodes.forEach(repo => {
    activity.push({
      id: repo.id,
      type: 'REPO_CREATED' as GitHubActivityType,
      title: `Created ${repo.nameWithOwner.split('/')[1]}`,
      repoName: repo.nameWithOwner,
      url: repo.url,
      date: repo.createdAt,
    });
  });

  // Add starred repos
  userData.starredRepositories.edges.forEach(edge => {
    activity.push({
      id: edge.node.id,
      type: 'STARRED_REPO' as GitHubActivityType,
      title: `Starred ${edge.node.nameWithOwner}`,
      repoName: edge.node.nameWithOwner,
      url: edge.node.url,
      date: edge.starredAt,
    });
  });

  // Sort by date (newest first) and limit to 10 items
  return activity
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'josuejero';
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('GITHUB_TOKEN environment variable is not set');
    return NextResponse.json(
      { 
        error: 'GitHub token not configured',
        loading: false,
        errorMessage: 'GitHub integration not configured'
      },
      { status: 500 }
    );
  }

  try {
    // Fetch data in parallel for better performance
    const [user, repos, { contributionCalendar, streaks }, activity] = await Promise.all([
      fetchUser(username, token),
      fetchRepos(username, token),
      getContributionCalendarAndStreaks(username, token),
      getActivityFeed(username, token),
    ]);

    // Calculate top languages from repos
    const languageStats: Record<string, number> = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size;
      }
    });
    
    // Sort and get top 5 languages
    const topLanguages = Object.entries(languageStats)
      .sort(([, aSize], [, bSize]) => bSize - aSize)
      .slice(0, 5)
      .reduce((acc, [lang, size]) => {
        acc[lang] = size;
        return acc;
      }, {} as Record<string, number>);

    // Build commit activity
    const commitActivity = await buildCommitActivity(username, repos, token);

    // Calculate snapshot metrics
    const snapshotMetrics = repos.reduce((acc, repo) => ({
      totalStars: acc.totalStars + repo.stargazers_count,
      totalForks: acc.totalForks + repo.forks_count,
      totalOpenIssues: acc.totalOpenIssues + repo.open_issues_count,
    }), { totalStars: 0, totalForks: 0, totalOpenIssues: 0 });

    // Build the complete stats object
    const stats = {
      // Core counters
      totalRepos: user.public_repos,
      totalCommits: commitActivity.reduce((sum, month) => sum + month.commits, 0),
      followers: user.followers,
      following: user.following,
      topLanguages,
      commitActivity,

      // Snapshot metrics
      totalStars: snapshotMetrics.totalStars,
      totalForks: snapshotMetrics.totalForks,
      totalOpenIssues: snapshotMetrics.totalOpenIssues,
      contributionsThisYear: contributionCalendar?.totalContributions || 0,

      // Calendar and streaks
      contributionCalendar,
      streaks,

      // Activity feed
      activity,

      // Profile fields
      avatarUrl: user.avatar_url,
      name: user.name || user.login,
      bio: user.bio || '',
      location: user.location || '',
      company: user.company || '',
      profileUrl: user.html_url,
      memberSinceYear: new Date(user.created_at).getFullYear(),

      // UI state
      loading: false,
      error: null,
    };

    const response = NextResponse.json(stats);
    return setCacheHeaders(response, 900); // 15 minutes cache

  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    
    // Return empty stats with error state
    const emptyStats = {
      // Core counters
      totalRepos: 0,
      totalCommits: 0,
      followers: 0,
      following: 0,
      topLanguages: {},
      commitActivity: [],

      // Snapshot metrics
      totalStars: 0,
      totalForks: 0,
      totalOpenIssues: 0,
      contributionsThisYear: 0,

      // Calendar and streaks
      contributionCalendar: null,
      streaks: null,

      // Activity feed
      activity: [],

      // Profile fields
      avatarUrl: '',
      name: username,
      bio: '',
      location: '',
      company: '',
      profileUrl: `https://github.com/${username}`,
      memberSinceYear: new Date().getFullYear(),

      // UI state
      loading: false,
      error: 'Failed to fetch GitHub stats',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };

    const response = NextResponse.json(emptyStats);
    return setCacheHeaders(response, 60); // 1 minute cache on error
  }
}