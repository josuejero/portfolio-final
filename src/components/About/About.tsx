import Link from 'next/link';

import { siteConfig } from '@/config/site';

import AboutGithubActivity from './AboutGithubActivity';
import EducationSection from './EducationSection';
import ProfessionalSummary from './ProfessionalSummary';
import TechnicalSkills from './TechnicalSkills';

import styles from './About.module.css';

export default function About() {
  const username =
    siteConfig.github.username;

  return (
    <section
      className={styles.page}
      aria-labelledby="about-heading"
    >
      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span>ABOUT</span>
          <span>ENGINEERING PROFILE</span>
          <span>BACKGROUND / PRACTICE</span>
        </div>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>
              THE PERSON BEHIND THE SYSTEMS.
            </p>

            <h1
              id="about-heading"
              className={styles.title}
            >
              ABOUT
            </h1>
          </div>

          <div className={styles.heroAside}>
            <strong>
              {siteConfig.person.name}
            </strong>

            <p>
              Computer Engineering graduate
              working across software,
              quality, data, and platform
              problems.
            </p>

            <div className={styles.heroLinks}>
              <a
                href={siteConfig.github.profileUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <span aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <ProfessionalSummary />
      <EducationSection />
      <TechnicalSkills />
      <AboutGithubActivity
        username={username}
      />

      <footer className={styles.pageEnd}>
        <span>
          PROFILE → EVIDENCE → WORK
        </span>

        <div className={styles.endLinks}>
          <Link href="/projects">
            View work
            <span aria-hidden="true">
              ↗
            </span>
          </Link>

          <Link href="/contact">
            Contact
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </footer>
    </section>
  );
}
