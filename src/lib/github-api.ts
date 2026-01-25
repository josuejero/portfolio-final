import { getGitHubHeaders } from '@/lib/github-api/headers';
import { cachedFetch, getCacheKey } from '@/lib/github-api/cache';
import { RateLimiter } from '@/lib/github-api/rate-limiter';

export { cachedFetch, getCacheKey, getGitHubHeaders, RateLimiter };

export const GITHUB_API_BASE = 'https://api.github.com';
export const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export type CiStatus = 'success' | 'failing' | 'unknown';

type WorkflowRun = {
  status: 'queued' | 'in_progress' | 'completed';
  conclusion:
    | 'success'
    | 'failure'
    | 'neutral'
    | 'cancelled'
    | 'skipped'
    | 'timed_out'
    | 'action_required'
    | 'stale'
    | null;
};

type WorkflowRunsResponse = {
  total_count: number;
  workflow_runs: WorkflowRun[];
};

export async function getRepoCiStatus(opts: {
  fullName: string;
  defaultBranch: string;
  token?: string;
}): Promise<CiStatus> {
  const { fullName, defaultBranch, token } = opts;
  const url = new URL(`https://api.github.com/repos/${fullName}/actions/runs`);
  url.searchParams.set('branch', defaultBranch);
  url.searchParams.set('status', 'completed');
  url.searchParams.set('per_page', '1');

  const res = await fetch(url.toString(), {
    headers: getGitHubHeaders(token),
  });

  if (!res.ok) {
    console.error('[CI] Failed to fetch workflow runs for', fullName, res.status);
    return 'unknown';
  }

  const data = (await res.json()) as WorkflowRunsResponse;

  if (!data.workflow_runs?.length) {
    return 'unknown';
  }

  const latest = data.workflow_runs[0];

  if (latest.status !== 'completed' || !latest.conclusion) {
    return 'unknown';
  }

  return latest.conclusion === 'success' ? 'success' : 'failing';
}
