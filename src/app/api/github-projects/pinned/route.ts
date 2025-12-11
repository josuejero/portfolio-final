// src/app/api/github-projects/pinned/route.ts
import type { GitHubPinnedRepo } from '@/types/github';
import { NextResponse } from 'next/server';

// Cache control helper
function setCacheHeaders(response: NextResponse, maxAge: number = 3600) {
  response.headers.set('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`);
  return response;
}

interface GraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          name: string;
          description: string | null;
          url: string;
          homepageUrl: string | null;
          stargazerCount: number;
          forkCount: number;
          updatedAt: string;
          primaryLanguage: {
            name: string;
            color: string | null;
          } | null;
          repositoryTopics: {
            nodes: Array<{
              topic: {
                name: string;
              };
            }>;
          };
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
    }

    // GraphQL query for pinned repositories
    const query = `
      query {
        user(login: "josuejero") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                updatedAt
                primaryLanguage {
                  name
                  color
                }
                repositoryTopics(first: 5) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-app',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GraphQLResponse = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${data.errors.map(e => e.message).join(', ')}`);
    }

    // Transform to our format
    const pinnedRepos: GitHubPinnedRepo[] = (data.data?.user?.pinnedItems?.nodes || []).map(node => ({
      name: node.name,
      description: node.description,
      url: node.url,
      homepageUrl: node.homepageUrl,
      stargazerCount: node.stargazerCount,
      forkCount: node.forkCount,
      updatedAt: node.updatedAt,
      primaryLanguage: node.primaryLanguage,
      topics: node.repositoryTopics.nodes.map(topicNode => topicNode.topic.name),
    }));

    const nextResponse = NextResponse.json(pinnedRepos);
    return setCacheHeaders(nextResponse, 3600); // 1 hour cache
  } catch (error: unknown) {
    console.error('Failed to fetch pinned repos:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch pinned repos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    return setCacheHeaders(errorResponse, 60); // 1 minute cache on error
  }
}