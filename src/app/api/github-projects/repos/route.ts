// FILE: src/app/api/github-projects/repos/route.ts
import { getGitHubHeaders } from '@/lib/github-api';
import type { GitHubRepositorySummary } from '@/types/github';
import { NextResponse } from 'next/server';

const GITHUB_API_BASE = 'https://api.github.com';

// Cache control helper
function setCacheHeaders(response: NextResponse, maxAge: number = 3600) {
  response.headers.set(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge}`,
  );
  return response;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  archived: boolean;
  disabled: boolean;
  fork: boolean;
  pushed_at: string;
  created_at: string;
}

async function fetchUserRepos(
  username: string,
  token?: string,
): Promise<GitHubRepoResponse[]> {
  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(
    username,
  )}/repos?per_page=100&sort=updated`;

  const res = await fetch(url, {
    headers: getGitHubHeaders(token, {
      'X-GitHub-Api-Version': '2022-11-28',
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub repos request failed with status ${res.status}`);
  }

  const data = (await res.json()) as GitHubRepoResponse[];
  return Array.isArray(data) ? data : [];
}

function resolveGitHubUsername(): string {
  const envUsername =
    process.env.GITHUB_USERNAME ?? process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (envUsername && envUsername.trim().length > 0) {
    return envUsername.trim();
  }

  // TODO: If you change your GitHub username, update this value
  // or derive it from siteMetadata so API routes stay in sync.
  return 'josuejero';
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = resolveGitHubUsername();

  const emptyPayload: GitHubRepositorySummary[] = [];
  const emptyResponse = NextResponse.json(emptyPayload);

  try {
    const repos = await fetchUserRepos(username, token);

    // Filter out forks and inactive repos to keep the explorer focused
    const filtered = repos.filter(
      (repo) => !repo.fork && !repo.archived && !repo.disabled,
    );

    // Transform to our frontend-friendly format
    const mapped: GitHubRepositorySummary[] = filtered.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      openIssuesCount: repo.open_issues_count,
      topics: repo.topics ?? [],
      archived: repo.archived,
      disabled: repo.disabled,
      pushedAt: repo.pushed_at,
      createdAt: repo.created_at,
    }));

    const nextResponse = NextResponse.json(mapped);
    return setCacheHeaders(nextResponse, 3600); // 1 hour cache
  } catch (error) {
    // On GitHub error, normalize to a 200 with an empty list
    // so the frontend can degrade gracefully.
    // eslint-disable-next-line no-console
    console.error('Error fetching GitHub repositories', error);

    return setCacheHeaders(emptyResponse, 60); // 1 minute cache on error
  }
}
