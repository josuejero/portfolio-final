// FILE: src/app/api/github-projects/releases/[name]/route.ts
import { setPublicCacheHeaders } from '@/lib/http/cache-headers';
import {
  GITHUB_API_BASE,
  getGitHubHeaders,
  resolveGitHubUsername,
} from '@/lib/github-api';
import type { GitHubRelease } from '@/types/github';
import { NextResponse } from 'next/server';


interface GitHubReleaseResponse {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  html_url: string;
  published_at: string | null;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  const username = resolveGitHubUsername();
  const token = process.env.GITHUB_TOKEN;

  const emptyPayload: GitHubRelease[] = [];
  const emptyResponse = NextResponse.json(emptyPayload);

  try {
    const url = `${GITHUB_API_BASE}/repos/${encodeURIComponent(
      username,
    )}/${encodeURIComponent(name)}/releases`;

    const res = await fetch(url, {
      headers: getGitHubHeaders(token, {
        'X-GitHub-Api-Version': '2022-11-28',
      }),
    });

    // Many repos simply have no releases
    if (res.status === 404) {
      return setPublicCacheHeaders(emptyResponse, {
        maxAge: 3600,
      }); // Cache "no releases" for 1 hour
    }

    if (!res.ok) {
      throw new Error(
        `GitHub releases request failed with status ${res.status}`,
      );
    }

    const data = (await res.json()) as GitHubReleaseResponse[];
    const list = Array.isArray(data) ? data : [];

    // Transform to our format
    const mapped: GitHubRelease[] = list.map((release) => ({
      id: release.id,
      tagName: release.tag_name,
      name: release.name,
      body: release.body,
      draft: release.draft,
      prerelease: release.prerelease,
      htmlUrl: release.html_url,
      publishedAt: release.published_at,
    }));

    const nextResponse = NextResponse.json(mapped);
    return setPublicCacheHeaders(nextResponse, {
      maxAge: 3600,
    }); // 1 hour cache
  } catch (error) {
    // Return empty result on error
    console.error('Error fetching GitHub releases', error);

    return setPublicCacheHeaders(emptyResponse, {
      maxAge: 300,
    }); // 5 minute cache on error
  }
}
