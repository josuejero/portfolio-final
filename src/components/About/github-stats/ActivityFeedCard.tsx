'use client';

import type { GitHubActivityItem } from '@/types/github';

import styles from '../GithubActivity.module.css';

interface Props {
  activity:
    GitHubActivityItem[];
}

const labelForActivityType = (
  type: string,
) => {
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

export default function ActivityFeedCard({
  activity,
}: Props) {
  const recentActivity =
    activity.slice(0, 8);

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeading}>
        <span>RECENT ACTIVITY</span>
        <strong>
          {String(
            recentActivity.length,
          ).padStart(2, '0')}
        </strong>
      </div>

      {recentActivity.length > 0 ? (
        <ol className={styles.activityList}>
          {recentActivity.map(
            (item, index) => (
              <li
                key={`${item.type}-${item.id}`}
              >
                <span>
                  {String(
                    index + 1,
                  ).padStart(2, '0')}
                </span>

                <div>
                  <strong>
                    {labelForActivityType(
                      item.type,
                    )}
                  </strong>

                  <p>
                    {item.repoName}
                  </p>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                    {' '}↗
                  </a>

                  <time>
                    {new Date(
                      item.date,
                    ).toLocaleString()}
                  </time>
                </div>
              </li>
            ),
          )}
        </ol>
      ) : (
        <p className={styles.empty}>
          No recent GitHub activity
          available.
        </p>
      )}
    </section>
  );
}
