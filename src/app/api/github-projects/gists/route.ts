// FILE: src/app/api/github-projects/gists/route.ts
// src/app/api/github-projects/gists/route.ts
import type { GitHubGist, GitHubGistFile } from '@/types/github';
import { NextResponse } from 'next/server';

function setCacheHeaders(
  response: NextResponse,
  maxAge: number = 1800,
): NextResponse {
  response.headers.set(
    'Cache-Control',
    `public, max-age=${maxAge}, stale-while-revalidate=${maxAge}`,
  );
  return response;
}

interface GitHubGistResponse {
  id: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  files: Record<
    string,
    {
      filename: string;
      language: string | null;
      raw_url: string;
      size: number;
      content: string;
    }
  >;
}

function extractTags(description: string | null): string[] {
  if (!description) return [];
  const matches = description.match(/#([a-z0-9_-]+)/gi);
  if (!matches) return [];
  return matches.map((tag) => tag.replace(/^#/u, '')).filter(Boolean);
}

function transformFiles(
  apiFiles: GitHubGistResponse['files'],
): Record<string, GitHubGistFile> {
  const result: Record<string, GitHubGistFile> = {};
  for (const [key, value] of Object.entries(apiFiles)) {
    result[key] = {
      filename: value.filename,
      language: value.language,
      raw_url: value.raw_url,
      size: value.size,
      content: value.content,
    };
  }
  return result;
}

function resolveGitHubUsername(): string {
  if (process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    return process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  }
  // TODO: Keep in sync with the username used elsewhere in the app.
  return 'josuejero';
}

function buildGitHubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-site',
  };

  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACCESS_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function GET(): Promise<NextResponse> {
  const username = resolveGitHubUsername();

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/gists`,
      {
        headers: buildGitHubHeaders(),
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorResponse = NextResponse.json<GitHubGist[]>([]);
      return setCacheHeaders(errorResponse, 60);
    }

    const data = (await response.json()) as GitHubGistResponse[];

    const gists: GitHubGist[] = data.map((gist) => ({
      id: gist.id,
      description: gist.description,
      html_url: gist.html_url,
      created_at: gist.created_at,
      updated_at: gist.updated_at,
      files: transformFiles(gist.files),
      tags: extractTags(gist.description),
    }));

    const nextResponse = NextResponse.json<GitHubGist[]>(gists);
    return setCacheHeaders(nextResponse, 1800);
  } catch {
    const errorResponse = NextResponse.json<GitHubGist[]>([]);
    return setCacheHeaders(errorResponse, 60);
  }
}
