export function isGitHubPassingCiRequired(): boolean {
  return process.env.GITHUB_REQUIRE_PASSING_CI === 'true';
}
