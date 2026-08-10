'use client';

import useGithubStats from '@/hooks/useGithubStats';

import GithubActivitySection from './GithubActivitySection';

interface AboutGithubActivityProps {
  username: string;
}

export default function AboutGithubActivity({
  username,
}: AboutGithubActivityProps) {
  const stats = useGithubStats(username);

  return (
    <GithubActivitySection
      stats={stats}
      username={username}
    />
  );
}
