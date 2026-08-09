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
      className="group relative flex flex-col rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4 transition hover:border-neutral-500 hover:bg-neutral-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-50">
            {project.name}
          </h3>

          {project.language && (
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-400">
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

        <div className="flex items-center gap-4 text-xs text-neutral-400">
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
        <p className="mt-2 line-clamp-3 text-xs text-neutral-300">
          {project.description}
        </p>
      )}

      {project.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-neutral-800/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-300"
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
            className="inline-flex items-center gap-1 text-neutral-300 hover:text-neutral-50"
          >
            <CodeBracketIcon className="h-3.5 w-3.5" />
            <span>Source</span>
          </Link>

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-neutral-300 hover:text-neutral-50"
            >
              <GlobeAltIcon className="h-3.5 w-3.5" />
              <span>Live</span>
            </Link>
          )}
        </div>

        <Link
          href={`/projects/${encodeURIComponent(project.slug)}`}
          className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-2 py-0.5 text-[11px] font-medium text-neutral-200 hover:border-neutral-500"
        >
          <span>Releases & details</span>
        </Link>
      </div>
    </motion.article>
  );
}
