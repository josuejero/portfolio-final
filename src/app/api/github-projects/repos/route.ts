// FILE: src/app/api/github-projects/repos/route.ts
import { getGitHubHeaders, getRepoCiStatus } from '@/lib/github-api';
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
  default_branch: string; // <-- add this
}

async function fetchUserRepos(
  username: string,
  token?: string,
): Promise<GitHubRepoResponse[]> {
  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(
    username,
  )}/repos?per_page=100&sort=updated`;

  try {
    const res = await fetch(url, {
      headers: getGitHubHeaders(token, {
        'X-GitHub-Api-Version': '2022-11-28',
      }),
    });

    if (!res.ok) {
      console.error('[github-projects/repos] GitHub repos request failed', res.status);
      return [];
    }

    const data = (await res.json()) as GitHubRepoResponse[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('[github-projects/repos] Fetch error', error);
    return [];
  }
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
  try {
    const username = resolveGitHubUsername();
    const token = process.env.GITHUB_TOKEN;
    const requirePassingCi =
      process.env.GITHUB_REQUIRE_PASSING_CI === 'true';

    const rawRepos = await fetchUserRepos(username, token);

    // Existing filters: non-forks, not archived, not disabled, recent, topic, etc
    const isTestEnv = process.env.NODE_ENV === 'test';

    let filtered = rawRepos.filter((repo) => {
      if (repo.fork || repo.archived || repo.disabled) return false;

      // Example "recent activity" filter - keep your current logic here
      const pushedAt = new Date(repo.pushed_at).getTime();
      const oneYearAgo =
        Date.now() - 365 * 24 * 60 * 60 * 1000;
      if (!isTestEnv && pushedAt < oneYearAgo) return false;

      return true;
    });

    // New: optionally only keep repos with a passing CI run
    if (requirePassingCi) {
      const ciResults = await Promise.all(
        filtered.map(async (repo) => ({
          repo,
          ci: await getRepoCiStatus({
            fullName: repo.full_name,
            defaultBranch: repo.default_branch,
            token,
          }),
        })),
      );

      filtered = ciResults
        .filter(({ ci }) => ci === 'success')
        .map(({ repo }) => repo);
    }

    const payload: GitHubRepositorySummary[] = filtered.map(
      (repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        homepageUrl: repo.homepage,
        language: repo.language,
        primaryLanguage: repo.language
          ? { name: repo.language, color: null }
          : null,
        stargazersCount: repo.stargazers_count,
        stargazerCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        forkCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        topics: repo.topics ?? [],
        archived: repo.archived,
        disabled: repo.disabled,
        pushedAt: repo.pushed_at,
        createdAt: repo.created_at,
      }),
    );

    return setCacheHeaders(NextResponse.json(payload), 3600);
  } catch (error) {
    console.error('[github-projects/repos] error', error);
    return NextResponse.json(
      { error: 'Failed to load repositories' },
      { status: 500 },
    );
  }
}
