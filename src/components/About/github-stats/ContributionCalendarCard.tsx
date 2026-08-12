'use client';

import type { GitHubContributionCalendar } from '@/types/github';

import styles from '../GithubActivity.module.css';

interface Props {
  calendar:
    GitHubContributionCalendar | null;
  contributionsThisYear: number;
}

const levelForCount = (
  count: number,
  maxDayCount: number,
) => {
  if (count === 0) return 0;
  if (!maxDayCount) return 1;

  const ratio =
    count / maxDayCount;

  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;

  return 4;
};

function computeMaxCount(
  calendar:
    GitHubContributionCalendar | null,
) {
  if (!calendar) return 0;

  return calendar.weeks.reduce(
    (max, week) => {
      const candidate = Math.max(
        ...week.days.map(
          (day) => day.count,
        ),
      );

      return Math.max(
        max,
        candidate,
      );
    },
    0,
  );
}

export default function ContributionCalendarCard({
  calendar,
  contributionsThisYear,
}: Props) {
  const maxDayCount =
    computeMaxCount(calendar);

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeading}>
        <span>CONTRIBUTION CALENDAR</span>

        {calendar ? (
          <strong>
            {contributionsThisYear.toLocaleString()}
          </strong>
        ) : null}
      </div>

      {calendar ? (
        <div
          className={styles.calendar}
          style={{
            gridTemplateColumns:
              `repeat(${Math.max(
                calendar.weeks.length,
                1,
              )}, minmax(3px, 1fr))`,
          }}
        >
          {calendar.weeks.flatMap(
            (week, weekIndex) =>
              week.days.map((day) => {
                const level =
                  levelForCount(
                    day.count,
                    maxDayCount,
                  );

                return (
                  <div
                    key={`${weekIndex}-${day.date}`}
                    className={
                      styles.calendarDay
                    }
                    data-level={level}
                    style={{
                      gridColumnStart:
                        weekIndex + 1,
                      gridRowStart:
                        day.weekday + 1,
                    }}
                    title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  />
                );
              }),
          )}
        </div>
      ) : (
        <p className={styles.empty}>
          Contribution calendar data is
          currently unavailable.
        </p>
      )}
    </section>
  );
}
