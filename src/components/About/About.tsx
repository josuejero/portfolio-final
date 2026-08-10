import { siteConfig } from '@/config/site';

import AboutGithubActivity from './AboutGithubActivity';
import EducationSection from './EducationSection';
import ProfessionalSummary from './ProfessionalSummary';
import TechnicalSkills from './TechnicalSkills';

export default function About() {
  const username = siteConfig.github.username;

  return (
    <div className="space-y-12 py-8">
      <ProfessionalSummary />
      <EducationSection />
      <AboutGithubActivity username={username} />
      <TechnicalSkills />
    </div>
  );
}
