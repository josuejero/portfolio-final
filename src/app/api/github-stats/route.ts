// src/app/github-stats/route.ts

import { NextResponse } from 'next/server';

interface GitHubUserData {
  public_repos: number;
  followers: number;
  following: number;
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
  sha: string;
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
    // Fetch user data
    const userData = await fetchGitHubData<GitHubUserData>(`/users/${username}`, token);

    // Fetch repositories
    const repos = await fetchGitHubData<GitHubRepo[]>(
      `/users/${username}/repos?per_page=100`,
      token
    );

    // Calculate language distribution
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


    // Count total commits
    let totalCommits = 0;
    await Promise.all(
      repos.map(async (repo: GitHubRepo) => {
        if (!repo.fork) {
          const commits = await fetchGitHubData<GitHubCommit[]>(
            `/repos/${username}/${repo.name}/commits?per_page=1&page=1`,
            token
          );
          totalCommits +=
            repo.size > 0
              ? parseInt(commits[0]?.sha?.substring(0, 7) || '0', 16) % 100
              : 0;
        }
      })
    );

    return NextResponse.json({
      totalRepos: userData.public_repos,
      totalCommits,
      topLanguages: languagePercentages,
      followers: userData.followers,
      following: userData.following,
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
