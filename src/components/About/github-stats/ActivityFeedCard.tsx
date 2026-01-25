'use client';

import type { GitHubActivityItem } from '@/types/github';
import { motion } from 'framer-motion';

interface Props {
  activity: GitHubActivityItem[];
}

const labelForActivityType = (type: string) => {
  switch (type) {
    case 'PR_MERGED':
      return 'Merged PR';
    case 'ISSUE_OPENED':
      return 'Opened issue';
    case 'REPO_CREATED':
      return 'Created repo';
    case 'STARRED_REPO':
      return 'Starred repo';
    default:
      return type;
  }
};

export default function ActivityFeedCard({ activity }: Props) {
  const recentActivity = activity.slice(0, 8);

  return (
    <motion.div
      className="rounded-xl border bg-card/50 p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.2 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xs">*</span>
          </span>
          <div>
            <p className="text-sm font-medium">Recent activity</p>
            <p className="text-xs text-muted-foreground">
              Latest PRs, issues, and repositories
            </p>
          </div>
        </div>
      </div>

      {recentActivity.length > 0 ? (
        <ul className="mt-4 space-y-3 text-sm">
          {recentActivity.map((item) => (
            <li key={`${item.type}-${item.id}`} className="flex gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <span className="font-medium">{labelForActivityType(item.type)}</span>
                  <span className="text-muted-foreground">
                    in <span className="font-mono">{item.repoName}</span>
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="line-clamp-1 text-xs text-primary hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-[11px] text-muted-foreground">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No recent GitHub activity from this account that can be shown yet.
        </p>
      )}
    </motion.div>
  );
}
