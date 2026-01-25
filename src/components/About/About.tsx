'use client';

import useGithubStats from '@/hooks/useGithubStats';
import ProfessionalSummary from './ProfessionalSummary';
import EducationSection from './EducationSection';
import GithubActivitySection from './GithubActivitySection';
import TechnicalSkills from './TechnicalSkills';

export default function About() {
  const username = 'josuejero';
  const stats = useGithubStats(username);

  return (
    <div className="max-w-[calc(100vw-5rem)] mx-auto space-y-12 py-8 px-4">
      <ProfessionalSummary />
      <EducationSection />
      <GithubActivitySection stats={stats} username={username} />
      <TechnicalSkills />
    </div>
  );
}
