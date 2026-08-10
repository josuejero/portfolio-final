'use client';

import { siteConfig } from '@/config/site';
import useGithubStats from '@/hooks/useGithubStats';

import GithubActivitySection from './GithubActivitySection';

export default function AboutGithubActivity() {
  const username = siteConfig.github.username;
  const stats = useGithubStats(username);

  return (
    <GithubActivitySection
      stats={stats}
      username={username}
    />
  );
}
