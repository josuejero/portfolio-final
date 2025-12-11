// src/app/api/github-projects/gists/route.ts
import type { GitHubGist, GitHubGistFile } from '@/types/github';
import { NextResponse } from 'next/server';

// Cache control helper
function setCacheHeaders(response: NextResponse, maxAge: number = 1800) {
  response.headers.set('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`);
  return response;
}

interface GitHubGistResponse {
  id: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  files: Record<string, {
    filename: string;
    language: string | null;
    raw_url: string;
    size: number;
    content: string;
  }>;
}

export async function GET() {
  const username = 'josuejero';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    const errorResponse = NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
    return setCacheHeaders(errorResponse, 60);
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/gists`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const gists: GitHubGistResponse[] = await response.json();

    // Transform gists to our format with tags
    const transformedGists: GitHubGist[] = gists.map((gist) => {
      // Extract tags from description (looking for #tag format)
      const tags: string[] = [];
      if (gist.description) {
        const tagMatches = gist.description.match(/#[\w-]+/g);
        if (tagMatches) {
          tags.push(...tagMatches.map(tag => tag.substring(1)));
        }
      }

      // Transform files to our format
      const files: Record<string, GitHubGistFile> = {};
      for (const [filename, file] of Object.entries(gist.files)) {
        files[filename] = {
          filename: file.filename,
          language: file.language,
          raw_url: file.raw_url,
          size: file.size,
          content: file.content,
        };
      }

      // Get first file for preview
      const firstFile = Object.values(gist.files)[0];

      return {
        id: gist.id,
        description: gist.description,
        html_url: gist.html_url,
        created_at: gist.created_at,
        updated_at: gist.updated_at,
        files,
        tags,
      };
    });

    const nextResponse = NextResponse.json(transformedGists);
    return setCacheHeaders(nextResponse, 1800); // 30 minutes cache
  } catch (error) {
    console.error('Error fetching GitHub gists:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch GitHub gists' },
      { status: 500 }
    );
    return setCacheHeaders(errorResponse, 60); // 1 minute cache on error
  }
}