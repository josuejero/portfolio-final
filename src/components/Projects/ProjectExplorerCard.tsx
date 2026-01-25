'use client';

import type { GitHubRepositorySummary } from '@/types/github';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate } from './project-detail-utils';

interface Props {
  repo: GitHubRepositorySummary;
}

export default function ProjectExplorerCard({ repo }: Props) {
  return (
    <motion.article
      layout
      whileHover={{ y: -2 }}
      className="flex flex-col gap-3 rounded-xl border bg-card/80 p-4 shadow-sm backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold leading-tight">
            <Link href={`/projects/${encodeURIComponent(repo.name)}`} className="hover:underline">
              {repo.name}
            </Link>
          </h3>
          {repo.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {repo.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        {repo.language && (
          <span className="rounded-full border border-border px-2 py-0.5">
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-border px-2 py-0.5"
          >
            #{topic}
          </span>
        ))}
        <span className="ml-auto">Updated {formatDate(repo.pushedAt)}</span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-1 text-xs">
        <Link
          href={repo.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <CodeBracketIcon className="h-4 w-4" />
          <span>View on GitHub</span>
        </Link>
        {repo.homepage && (
          <Link
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Live demo
          </Link>
        )}
      </div>
    </motion.article>
  );
}
