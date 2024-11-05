// src/app/api/github-stats/route.ts
import { NextResponse } from 'next/server';



interface GitHubUserData {
  public_repos: number;
}

interface GitHubRepo {
  name: string;
  fork: boolean;
  size: number;
}

interface GitHubRepoLanguages {
  [language: string]: number;
}

interface GitHubCommit {
  commit: {
    author: {
      date: string;
    };
  };
}

async function fetchGitHubData<T>(endpoint: string, token: string): Promise<T> {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function getCommitActivity(username: string, token: string) {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  // Get all repos
  const repos = await fetchGitHubData<GitHubRepo[]>(
    `/users/${username}/repos?per_page=100&type=owner`,
    token
  );

  // Initialize monthly commits object
  const monthlyCommits: { [key: string]: number } = {};
  
  // Initialize all months with 0 commits
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyCommits[monthKey] = 0;
  }

  // Fetch commits for each non-fork repository
  await Promise.all(
    repos.filter(repo => !repo.fork).map(async (repo) => {
      const since = oneYearAgo.toISOString();
      const until = new Date().toISOString();
      
      try {
        const commits = await fetchGitHubData<GitHubCommit[]>(
          `/repos/${username}/${repo.name}/commits?since=${since}&until=${until}&per_page=100`,
          token
        );

        commits.forEach(commit => {
          const date = new Date(commit.commit.author.date);
          const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          if (monthlyCommits[monthKey] !== undefined) {
            monthlyCommits[monthKey]++;
          }
        });
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}:`, error);
      }
    })
  );

  // Convert to array and sort chronologically
  return Object.entries(monthlyCommits)
    .map(([month, commits]) => ({ month, commits }))
    .reverse();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
  }

  try {
    // Fetch all data in parallel
    const [userData, repos, commitActivity] = await Promise.all([
      fetchGitHubData<GitHubUserData>(`/users/${username}`, token),
      fetchGitHubData<GitHubRepo[]>(`/users/${username}/repos?per_page=100`, token),
      getCommitActivity(username, token)
    ]);

    // Calculate language distribution
    const languages: { [key: string]: number } = {};
    let totalSize = 0;

    // Fetch language data for each repo
    await Promise.all(
      repos.map(async (repo: GitHubRepo) => {
        if (!repo.fork) {
          const repoLangs = await fetchGitHubData<GitHubRepoLanguages>(
            `/repos/${username}/${repo.name}/languages`,
            token
          );
          Object.entries(repoLangs).forEach(([lang, size]) => {
            languages[lang] = (languages[lang] || 0) + size;
            totalSize += size;
          });
        }
      })
    );

    // Convert byte counts to percentages
    const languagePercentages = Object.fromEntries(
      Object.entries(languages)
        .map(([lang, size]) => [lang, Math.round((size / totalSize) * 100)] as [string, number])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
    );

    // Calculate total commits
    const totalCommits = commitActivity.reduce((sum, month) => sum + month.commits, 0);

    return NextResponse.json({
      totalRepos: userData.public_repos,
      totalCommits,
      topLanguages: languagePercentages,
      commitActivity
    });
    
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}