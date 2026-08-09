import { siteConfig } from '@/config/site';

export function resolveGitHubUsername(): string {
  const configuredUsername =
    process.env.GITHUB_USERNAME ?? process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (configuredUsername?.trim()) {
    return configuredUsername.trim();
  }

  return siteConfig.github.username;
}
