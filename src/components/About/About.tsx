'use client';

import { siteConfig } from '@/config/site';
import useGithubStats from '@/hooks/useGithubStats';
import ProfessionalSummary from './ProfessionalSummary';
import EducationSection from './EducationSection';
import GithubActivitySection from './GithubActivitySection';
import TechnicalSkills from './TechnicalSkills';

export default function About() {
  const username = siteConfig.github.username;
  const stats = useGithubStats(username);

  return (
    <div className="space-y-12 py-8">
      <ProfessionalSummary />
      <EducationSection />
      <GithubActivitySection stats={stats} username={username} />
      <TechnicalSkills />
    </div>
  );
}
