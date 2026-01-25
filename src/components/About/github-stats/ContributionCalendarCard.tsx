'use client';

import type { GitHubContributionCalendar } from '@/types/github';
import { motion } from 'framer-motion';

interface Props {
  calendar: GitHubContributionCalendar | null;
  contributionsThisYear: number;
}
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

const levelForCount = (count: number, maxDayCount: number) => {
  if (count === 0) return 0;
  if (!maxDayCount) return 1;
  const ratio = count / maxDayCount;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
};

function computeMaxCount(calendar: GitHubContributionCalendar | null) {
  if (!calendar) return 0;
  return calendar.weeks.reduce((max, week) => {
    const candidate = Math.max(...week.days.map((day) => day.count));
    return Math.max(max, candidate);
  }, 0);
}

export default function ContributionCalendarCard({ calendar, contributionsThisYear }: Props) {
  const maxDayCount = computeMaxCount(calendar);

  return (
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
            {contributionsThisYear.toLocaleString()} contributions
          </span>
        )}
      </div>

      {calendar ? (
        <div className="mt-3">
          <div
            className="grid grid-rows-7 gap-0.5 rounded-md bg-muted/40 p-2"
            style={{
              gridTemplateColumns: `repeat(${Math.max(calendar.weeks.length, 1)}, minmax(3px, 1fr))`,
            }}
          >
            {calendar.weeks.flatMap((week, weekIndex) =>
              week.days.map((day) => {
                const level = levelForCount(day.count, maxDayCount);
                return (
                  <div
                    key={`${weekIndex}-${day.date}`}
                    className={`h-3 w-3 rounded-[2px] ${levelClass(level)}`}
                    style={{
                      gridColumnStart: weekIndex + 1,
                      gridRowStart: day.weekday + 1,
                    }}
                    title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  />
                );
              }),
            )}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Calendar data is not available. Check that your GitHub token includes GraphQL read access.
        </p>
      )}
    </motion.div>
  );
}
