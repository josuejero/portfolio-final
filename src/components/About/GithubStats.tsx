'use client';

import type { GitHubStats } from '@/types/github';

import ActivityFeedCard from './github-stats/ActivityFeedCard';
import DeferredCommitActivityCard from './github-stats/DeferredCommitActivityCard';
import ContributionCalendarCard from './github-stats/ContributionCalendarCard';
import LanguageCard from './github-stats/LanguageCard';

import styles from './GithubActivity.module.css';

interface GithubStatsProps {
  stats: GitHubStats;
  username: string;
}

export default function GithubStats({
  stats,
  username,
}: GithubStatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.statsLead}>
        <span>@{username}</span>

        <strong>
          {stats.contributionsThisYear.toLocaleString()}
        </strong>

        <p>
          CONTRIBUTIONS / LAST 12 MONTHS
        </p>
      </div>

      <ContributionCalendarCard
        calendar={
          stats.contributionCalendar
        }
        contributionsThisYear={
          stats.contributionsThisYear
        }
      />

      <DeferredCommitActivityCard
        commitActivity={
          stats.commitActivity
        }
      />

      <div className={styles.secondaryGrid}>
        <LanguageCard
          topLanguages={
            stats.topLanguages
          }
        />

        <ActivityFeedCard
          activity={stats.activity}
        />
      </div>
    </div>
  );
}
