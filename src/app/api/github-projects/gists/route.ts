// FILE: src/app/api/github-projects/gists/route.ts
// src/app/api/github-projects/gists/route.ts
import { setPublicCacheHeaders } from '@/lib/http/cache-headers';
import {
  GITHUB_API_BASE,
  getGitHubHeaders,
  resolveGitHubUsername,
} from '@/lib/github-api';
import type { GitHubGist, GitHubGistFile } from '@/types/github';
import { NextResponse } from 'next/server';

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

export async function GET(): Promise<NextResponse> {
  const username = resolveGitHubUsername();

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/gists`,
      {
        headers: getGitHubHeaders(
          process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACCESS_TOKEN,
          { 'User-Agent': 'portfolio-site' },
        ),
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorResponse = NextResponse.json<GitHubGist[]>([]);
      return setPublicCacheHeaders(errorResponse, {
        maxAge: 60,
        scope: 'browser',
      });
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
    return setPublicCacheHeaders(nextResponse, {
      maxAge: 1800,
      scope: 'browser',
    });
  } catch {
    const errorResponse = NextResponse.json<GitHubGist[]>([]);
    return setPublicCacheHeaders(errorResponse, {
        maxAge: 60,
        scope: 'browser',
      });
  }
}
