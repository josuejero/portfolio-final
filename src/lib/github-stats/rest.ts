import { getGitHubHeaders } from '@/lib/github-api';

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

const API_VERSION_HEADER = {
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function fetchUser(
  username: string,
  token: string,
): Promise<GitHubUserResponse> {
  const response = await fetch(
    `https://api.github.com/users/${username}`,
    {
      headers: getGitHubHeaders(token, API_VERSION_HEADER),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}

export async function fetchRepos(
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
        headers: getGitHubHeaders(token, API_VERSION_HEADER),
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

export async function buildCommitActivity(
  username: string,
  repos: GitHubRepo[],
  token: string,
) {
  const monthlyCommits: Record<string, number> = {};
  const currentYear = new Date().getFullYear().toString();

  const activeRepos = repos.filter((repo) => !repo.fork && !repo.archived);
  const sampleRepos = activeRepos.slice(0, 20);

  for (const repo of sampleRepos) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?since=${currentYear}-01-01T00:00:00Z&per_page=100`,
        {
          headers: getGitHubHeaders(token, API_VERSION_HEADER),
        }
      );

      if (!response.ok) continue;

      const commits: GitHubCommit[] = await response.json();
      commits.forEach((commit) => {
        if (commit?.commit?.author?.date) {
          const date = new Date(commit.commit.author.date);
          const monthKey = `${date.toLocaleString('default', {
            month: 'short',
          })} ${date.getFullYear().toString().slice(-2)}`;
          monthlyCommits[monthKey] = (monthlyCommits[monthKey] || 0) + 1;
        }
      });
    } catch (error) {
      console.warn(`Failed to fetch commits for ${repo.name}:`, error);
      continue;
    }
  }

  return Object.entries(monthlyCommits)
    .map(([month, commits]) => ({ month, commits }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      if (aYear !== bYear) return parseInt(aYear, 10) - parseInt(bYear, 10);
      return months.indexOf(aMonth) - months.indexOf(bMonth);
    });
}
