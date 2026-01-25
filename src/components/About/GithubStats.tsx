'use client';

import type { GitHubStats } from '@/types/github';
import React from 'react';
import ActivityFeedCard from './github-stats/ActivityFeedCard';
import CommitActivityCard from './github-stats/CommitActivityCard';
import ContributionCalendarCard from './github-stats/ContributionCalendarCard';
import LanguageCard from './github-stats/LanguageCard';

interface GithubStatsProps {
  stats: GitHubStats;
  username: string;
}

export default function GithubStats({ stats, username }: GithubStatsProps) {
  if (stats.loading) {
    return (
      <div className="space-y-4">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
        <p className="font-medium text-destructive">
          GitHub data is currently unavailable.
        </p>
        <p className="mt-1 text-muted-foreground">{stats.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">
          GitHub activity for{' '}
          <span className="font-mono text-primary">@{username}</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          {stats.contributionsThisYear.toLocaleString()} contributions in the last 12 months
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <ContributionCalendarCard
          calendar={stats.contributionCalendar}
          contributionsThisYear={stats.contributionsThisYear}
        />
      </div>

      <CommitActivityCard commitActivity={stats.commitActivity} />

      <div className="grid gap-6 md:grid-cols-2">
        <LanguageCard topLanguages={stats.topLanguages} />
        <ActivityFeedCard activity={stats.activity} />
      </div>
    </div>
  );
}
