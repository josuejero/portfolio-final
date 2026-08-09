import { getProjectByFullRepositoryName } from '@/data/projects';
import type { GitHubRepositorySummary } from '@/types/github';
import type { RoleLens } from '@/types/role-lens';

export interface RoleLensRepositoryPartition {
  matched: GitHubRepositorySummary[];
  other: GitHubRepositorySummary[];
}

/**
 * Prioritize repositories that are explicitly curated for a role lens.
 *
 * Repositories outside the canonical catalog, and canonical repositories that
 * are not selected for this lens, remain visible in the "other" collection.
 */
export function partitionRepositoriesForRoleLens(
  repos: readonly GitHubRepositorySummary[],
  lens: RoleLens,
): RoleLensRepositoryPartition {
  const priorities = new Map(
    lens.projectIds.map((projectId, index) => [
      projectId,
      index,
    ]),
  );

  const matched: Array<{
    repo: GitHubRepositorySummary;
    priority: number;
    originalIndex: number;
  }> = [];

  const other: GitHubRepositorySummary[] = [];

  repos.forEach((repo, originalIndex) => {
    const project = getProjectByFullRepositoryName(
      repo.fullName,
    );

    const priority = project
      ? priorities.get(project.id)
      : undefined;

    if (priority === undefined) {
      other.push(repo);
      return;
    }

    matched.push({
      repo,
      priority,
      originalIndex,
    });
  });

  matched.sort(
    (left, right) =>
      left.priority - right.priority ||
      left.originalIndex - right.originalIndex,
  );

  return {
    matched: matched.map(({ repo }) => repo),
    other,
  };
}
