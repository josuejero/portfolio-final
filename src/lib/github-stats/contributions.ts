import type { GitHubContributionCalendar, GitHubStreakStats } from '@/types/github';
import { getGitHubHeaders } from '@/lib/github-api';

type GitHubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              weekday: number;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

const API_VERSION_HEADER = {
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function getContributionCalendarAndStreaks(
  username: string,
  token: string,
): Promise<{
  contributionCalendar: GitHubContributionCalendar | null;
  streaks: GitHubStreakStats | null;
}> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: getGitHubHeaders(token, {
      ...API_VERSION_HEADER,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    console.warn('GraphQL contribution calendar fetch failed:', response.status);
    return { contributionCalendar: null, streaks: null };
  }

  const result: GitHubContributionsResponse = await response.json();

  if (result.errors || !result.data?.user?.contributionsCollection?.contributionCalendar) {
    console.warn('GraphQL contribution calendar error:', result.errors);
    return { contributionCalendar: null, streaks: null };
  }

  const calendarData = result.data.user.contributionsCollection.contributionCalendar;

  const contributionCalendar: GitHubContributionCalendar = {
    totalContributions: calendarData.totalContributions,
    weeks: calendarData.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
      })),
    })),
  };

  const allDays = contributionCalendar.weeks.flatMap((week) => week.days);
  allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date().toISOString().split('T')[0];

  for (const day of allDays) {
    if (day.count > 0) {
      if (
        currentStreak === 0 ||
        new Date(day.date).getTime() ===
          new Date(allDays[currentStreak]?.date || today).getTime() - 86400000
      ) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  const dayCounts: Record<number, number> = {};
  allDays.forEach((day) => {
    if (day.count > 0) {
      dayCounts[day.weekday] = (dayCounts[day.weekday] || 0) + day.count;
    }
  });

  const busiestDay = Object.entries(dayCounts).reduce(
    (max, [day, count]) =>
      count > max.count ? { day: parseInt(day, 10), count } : max,
    { day: 0, count: 0 },
  );

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const busiestDayOfWeek = dayNames[busiestDay.day];

  const activeDays = allDays.filter((day) => day.count > 0).length;
  const averageCommitsPerActiveDay = activeDays > 0
    ? contributionCalendar.totalContributions / activeDays
    : 0;

  const streaks: GitHubStreakStats = {
    currentStreak,
    longestStreak,
    busiestDayOfWeek,
    averageCommitsPerActiveDay,
  };

  return { contributionCalendar, streaks };
}
