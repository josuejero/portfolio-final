// src/components/About/GithubStats.tsx
'use client';

import type { GitHubStats } from '@/types/github';
import { motion } from 'framer-motion';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface GithubStatsProps {
  stats: GitHubStats;
  username: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ stats, username }) => {
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

  const languageEntries = Object.entries(stats.topLanguages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const totalLanguageBytes = languageEntries.reduce(
    (sum, [, bytes]) => sum + bytes,
    0,
  );

  const calendar = stats.contributionCalendar;
  const streaks = stats.streaks;
  const activity = stats.activity ?? [];

  let maxDayCount = 0;
  if (calendar) {
    for (const week of calendar.weeks) {
      for (const day of week.days) {
        if (day.count > maxDayCount) {
          maxDayCount = day.count;
        }
      }
    }
  }

  const levelForCount = (count: number) => {
    if (count === 0) return 0;
    if (!maxDayCount) return 1;
    const ratio = count / maxDayCount;
    if (ratio < 0.25) return 1;
    if (ratio < 0.5) return 2;
    if (ratio < 0.75) return 3;
    return 4;
  };

  const levelClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-muted';
      case 1:
        return 'bg-emerald-900/30 dark:bg-emerald-500/20';
      case 2:
        return 'bg-emerald-700/60 dark:bg-emerald-500/40';
      case 3:
        return 'bg-emerald-600 dark:bg-emerald-400';
      case 4:
      default:
        return 'bg-emerald-500 dark:bg-emerald-300';
    }
  };

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

  const recentActivity = activity.slice(0, 8);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">
          GitHub activity for{' '}
          <span className="font-mono text-primary">@{username}</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          {stats.contributionsThisYear.toLocaleString()} contributions in the
          last 12 months
        </p>
      </div>

      {/* Contribution calendar and streaks */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <motion.div
          className="rounded-xl border bg-card/50 p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-medium text-muted-foreground">
              Contribution calendar
            </span>
            {calendar && (
              <span className="text-muted-foreground">
                {calendar.totalContributions.toLocaleString()} contributions
              </span>
            )}
          </div>

          {calendar ? (
            <div className="mt-3">
              <div
                className="grid grid-rows-7 gap-0.5 rounded-md bg-muted/40 p-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(
                    calendar.weeks.length,
                    1,
                  )}, minmax(3px, 1fr))`,
                }}
              >
                {calendar.weeks.map((week, weekIndex) =>
                  week.days.map((day) => {
                    const level = levelForCount(day.count);
                    return (
                      <div
                        key={`${weekIndex}-${day.date}`}
                        className={`h-3 w-3 rounded-[2px] ${levelClass(level)}`}
                        style={{
                          gridColumnStart: weekIndex + 1,
                          gridRowStart: day.weekday + 1,
                        }}
                        title={`${day.date}: ${
                          day.count
                        } contribution${day.count === 1 ? '' : 's'}`}
                      />
                    );
                  }),
                )}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Darker squares represent more contributions on that day, like the
                GitHub profile calendar.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Calendar data is not available. Check that your GitHub token
              includes GraphQL read access.
            </p>
          )}
        </motion.div>

        <motion.div
          className="rounded-xl border bg-card/50 p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <p className="text-xs font-medium text-muted-foreground">
            Streaks and patterns
          </p>
          {streaks ? (
            <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[11px] text-muted-foreground">
                  Current streak
                </dt>
                <dd className="text-base font-semibold">
                  {streaks.currentStreak}{' '}
                  <span className="text-xs font-normal text-muted-foreground">
                    days
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted-foreground">
                  Longest streak
                </dt>
                <dd className="text-base font-semibold">
                  {streaks.longestStreak}{' '}
                  <span className="text-xs font-normal text-muted-foreground">
                    days
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted-foreground">
                  Busiest weekday
                </dt>
                <dd className="text-base font-semibold">
                  {streaks.busiestDayOfWeek}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted-foreground">
                  Avg commits on active days
                </dt>
                <dd className="text-base font-semibold">
                  {streaks.averageCommitsPerActiveDay.toFixed(1)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Streak data is not available yet.
            </p>
          )}
        </motion.div>
      </div>

      {/* Monthly commit activity */}
      <motion.div
        className="rounded-xl border bg-card/50 p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-xs">&lt;/&gt;</span>
            </span>
            <div>
              <p className="text-sm font-medium">Commit activity</p>
              <p className="text-xs text-muted-foreground">
                Last 12 months across your own repositories
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 h-56 w-full">
          {stats.commitActivity.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.commitActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  interval={1}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="commits"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent commits found for this account.
            </p>
          )}
        </div>
      </motion.div>

      {/* Languages and activity feed */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="rounded-xl border bg-card/50 p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xs">&#123;&#125;</span>
              </span>
              <div>
                <p className="text-sm font-medium">Languages</p>
                <p className="text-xs text-muted-foreground">
                  Top languages across your own repos
                </p>
              </div>
            </div>
          </div>

          {languageEntries.length > 0 ? (
            <div className="mt-4 space-y-3">
              {languageEntries.map(([language, bytes]) => {
                const percentage =
                  totalLanguageBytes === 0
                    ? 0
                    : (bytes / totalLanguageBytes) * 100;

                return (
                  <div key={language} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{language}</span>
                      <span className="text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No language data yet. Once you have some non empty repositories,
              they will show up here.
            </p>
          )}
        </motion.div>

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
                      <span className="font-medium">
                        {labelForActivityType(item.type)}
                      </span>
                      <span className="text-muted-foreground">
                        in{' '}
                        <span className="font-mono">{item.repoName}</span>
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
      </div>
    </div>
  );
};

export default GithubStats;
