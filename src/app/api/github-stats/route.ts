import { NextResponse } from 'next/server';
import {
  buildCommitActivity,
  fetchRepos,
  fetchUser,
} from '@/lib/github-stats/rest';
import { getContributionCalendarAndStreaks } from '@/lib/github-stats/contributions';
import { getActivityFeed } from '@/lib/github-stats/activity';
import type { GitHubStats } from '@/types/github';

function setCacheHeaders(response: NextResponse, maxAge = 900) {
  response.headers.set(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  );
  response.headers.set('Vary', 'Accept-Encoding');
  return response;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'josuejero';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('GITHUB_TOKEN environment variable is not set');
    return NextResponse.json(
      {
        error: 'GitHub token not configured',
        loading: false,
        errorMessage: 'GitHub integration not configured',
      },
      { status: 500 }
    );
  }

  try {
    const [user, repos, { contributionCalendar, streaks }, activity] =
      await Promise.all([
        fetchUser(username, token),
        fetchRepos(username, token),
        getContributionCalendarAndStreaks(username, token),
        getActivityFeed(username, token),
      ]);

    const languageStats: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size;
      }
    });

    const topLanguages = Object.entries(languageStats)
      .sort(([, aSize], [, bSize]) => bSize - aSize)
      .slice(0, 5)
      .reduce((acc, [lang, size]) => {
        acc[lang] = size;
        return acc;
      }, {} as Record<string, number>);

    const commitActivity = await buildCommitActivity(username, repos, token);

    const snapshotMetrics = repos.reduce(
      (acc, repo) => ({
        totalStars: acc.totalStars + repo.stargazers_count,
        totalForks: acc.totalForks + repo.forks_count,
        totalOpenIssues: acc.totalOpenIssues + repo.open_issues_count,
      }),
      { totalStars: 0, totalForks: 0, totalOpenIssues: 0 }
    );

    const stats: GitHubStats = {
      totalRepos: user.public_repos,
      totalCommits: commitActivity.reduce((sum, month) => sum + month.commits, 0),
      followers: user.followers,
      following: user.following,
      topLanguages,
      commitActivity,
      totalStars: snapshotMetrics.totalStars,
      totalForks: snapshotMetrics.totalForks,
      totalOpenIssues: snapshotMetrics.totalOpenIssues,
      contributionsThisYear: contributionCalendar?.totalContributions || 0,
      contributionCalendar,
      streaks,
      activity,
      avatarUrl: user.avatar_url,
      name: user.name || user.login,
      bio: user.bio || '',
      location: user.location || '',
      company: user.company || '',
      profileUrl: user.html_url,
      memberSinceYear: new Date(user.created_at).getFullYear(),
      loading: false,
      error: null,
    };

    const response = NextResponse.json(stats);
    return setCacheHeaders(response, 900);
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);

    const emptyStats: GitHubStats = {
      totalRepos: 0,
      totalCommits: 0,
      followers: 0,
      following: 0,
      topLanguages: {},
      commitActivity: [],
      totalStars: 0,
      totalForks: 0,
      totalOpenIssues: 0,
      contributionsThisYear: 0,
      contributionCalendar: null,
      streaks: null,
      activity: [],
      avatarUrl: '',
      name: username,
      bio: '',
      location: '',
      company: '',
      profileUrl: `https://github.com/${username}`,
      memberSinceYear: new Date().getFullYear(),
      loading: false,
      error: 'Failed to fetch GitHub stats',
    };

    const response = NextResponse.json(emptyStats);
    return setCacheHeaders(response, 60);
  }
}
