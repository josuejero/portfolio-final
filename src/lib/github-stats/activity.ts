import type { GitHubActivityItem } from '@/types/github';
import { getGitHubHeaders } from '@/lib/github-api';

type GitHubActivityResponse = {
  data?: {
    user?: {
      pullRequests: {
        nodes: {
          id: string;
          title: string;
          url: string;
          mergedAt: string | null;
          updatedAt: string;
          repository: { nameWithOwner: string };
        }[];
      };
      issues: {
        nodes: {
          id: string;
          title: string;
          url: string;
          createdAt: string;
          repository: { nameWithOwner: string };
        }[];
      };
      repositories: {
        nodes: {
          id: string;
          nameWithOwner: string;
          url: string;
          createdAt: string;
        }[];
      };
      starredRepositories: {
        edges: {
          starredAt: string;
          node: {
            id: string;
            nameWithOwner: string;
            url: string;
          };
        }[];
      };
    };
  };
  errors?: { message: string }[];
};

const API_VERSION_HEADER = {
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function getActivityFeed(
  username: string,
  token: string,
): Promise<GitHubActivityItem[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        pullRequests(first: 5, states: MERGED, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            mergedAt
            repository {
              nameWithOwner
            }
          }
        }
        issues(first: 5, states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            createdAt
            repository {
              nameWithOwner
            }
          }
        }
        repositories(first: 5, ownerAffiliations: OWNER, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            nameWithOwner
            url
            createdAt
          }
        }
        starredRepositories(first: 5, orderBy: {field: STARRED_AT, direction: DESC}) {
          edges {
            starredAt
            node {
              id
              nameWithOwner
              url
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: getGitHubHeaders(token, {
      ...API_VERSION_HEADER,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    console.warn('GraphQL activity feed fetch failed:', response.status);
    return [];
  }

  const result: GitHubActivityResponse = await response.json();

  if (result.errors || !result.data?.user) {
    console.warn('GraphQL activity feed error:', result.errors);
    return [];
  }

  const userData = result.data.user;
  const activity: GitHubActivityItem[] = [];

  userData.pullRequests.nodes.forEach((pr) => {
    if (pr.mergedAt) {
      activity.push({
        id: pr.id,
        type: 'PR_MERGED',
        title: pr.title,
        repoName: pr.repository.nameWithOwner,
        url: pr.url,
        date: pr.mergedAt,
      });
    }
  });

  userData.issues.nodes.forEach((issue) => {
    activity.push({
      id: issue.id,
      type: 'ISSUE_OPENED',
      title: issue.title,
      repoName: issue.repository.nameWithOwner,
      url: issue.url,
      date: issue.createdAt,
    });
  });

  userData.repositories.nodes.forEach((repo) => {
    activity.push({
      id: repo.id,
      type: 'REPO_CREATED',
      title: `Created ${repo.nameWithOwner.split('/')[1]}`,
      repoName: repo.nameWithOwner,
      url: repo.url,
      date: repo.createdAt,
    });
  });

  userData.starredRepositories.edges.forEach((edge) => {
    activity.push({
      id: edge.node.id,
      type: 'STARRED_REPO',
      title: `Starred ${edge.node.nameWithOwner}`,
      repoName: edge.node.nameWithOwner,
      url: edge.node.url,
      date: edge.starredAt,
    });
  });

  return activity
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
}
