'use client';

import { CodeBracketIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { toRepositoryProjectViewModel } from '@/lib/projects/view-model';
import type { GitHubRepositorySummary } from '@/types/github';

import { formatDate } from './project-detail-utils';

interface Props {
  repo: GitHubRepositorySummary;
}

export default function ProjectExplorerCard({ repo }: Props) {
  const project = toRepositoryProjectViewModel(repo);

  return (
    <article
      className="flex flex-col gap-3 rounded-surface border bg-card/80 p-4 shadow-soft backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold leading-tight">
            <Link
              prefetch={false}
              href={`/projects/${encodeURIComponent(project.slug)}`}
              className="hover:underline"
            >
              {project.name}
            </Link>
          </h3>

          {project.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        {project.language && (
          <span className="rounded-pill border border-border px-2 py-0.5">
            {project.language.name}
          </span>
        )}

        {project.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="rounded-pill border border-border px-2 py-0.5"
          >
            #{topic}
          </span>
        ))}

        <span className="ml-auto">
          Updated {formatDate(project.updatedAt)}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-1 text-xs">
        <Link
          prefetch={false}
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <CodeBracketIcon className="h-4 w-4" />
          <span>View on GitHub</span>
        </Link>

        {project.liveUrl && (
          <Link
            prefetch={false}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Live demo
          </Link>
        )}
      </div>
    </article>
  );
}
