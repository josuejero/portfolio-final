'use client';

import {
  CodeBracketIcon,
  GlobeAltIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { toPinnedProjectViewModel } from '@/lib/projects/view-model';
import type { GitHubPinnedRepo } from '@/types/github';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  repo: GitHubPinnedRepo;
}

export default function PinnedProjectCard({ repo }: Props) {
  const project = toPinnedProjectViewModel(repo);

  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex flex-col rounded-surface border border-border/70 bg-card/70 p-4 shadow-soft transition-colors duration-fast ease-standard hover:border-foreground/20 hover:bg-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {project.name}
          </h3>

          {project.language && (
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    project.language.color ?? '#737373',
                }}
              />
              <span>{project.language.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5" />
            <span>{project.stars ?? 0}</span>
          </span>

          <span className="inline-flex items-center gap-1">
            <CodeBracketIcon className="h-3.5 w-3.5" />
            <span>{project.forks ?? 0}</span>
          </span>
        </div>
      </div>

      {project.description && (
        <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">
          {project.description}
        </p>
      )}

      {project.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="rounded-pill border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <Link
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors duration-fast hover:text-foreground"
          >
            <CodeBracketIcon className="h-3.5 w-3.5" />
            <span>Source</span>
          </Link>

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors duration-fast hover:text-foreground"
            >
              <GlobeAltIcon className="h-3.5 w-3.5" />
              <span>Live</span>
            </Link>
          )}
        </div>

        <Link
          href={`/projects/${encodeURIComponent(project.slug)}`}
          className="inline-flex items-center gap-1 rounded-pill border border-border px-2 py-0.5 text-[11px] font-medium text-foreground transition-colors duration-fast hover:border-brand/50 hover:text-brand"
        >
          <span>Releases & details</span>
        </Link>
      </div>
    </motion.article>
  );
}
