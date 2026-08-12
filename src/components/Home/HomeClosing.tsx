import Link from 'next/link';

import { siteConfig } from '@/config/site';

import styles from './HomeClosing.module.css';

export default function HomeClosing() {
  return (
    <footer className={styles.closing}>
      <section
        className={styles.identity}
        aria-labelledby="home-identity-heading"
      >
        <div className={styles.identityMeta}>
          <span>AFTER THE SYSTEMS</span>
          <span>THE ENGINEER</span>
        </div>

        <div className={styles.identityGrid}>
          <h2
            id="home-identity-heading"
            className={styles.identityName}
          >
            {siteConfig.person.name}
          </h2>

          <div className={styles.identityStatement}>
            <p>
              Engineering across software,
              quality, data, and platform
              support.
            </p>

            <span>
              BUILD → TEST → EXPLAIN → SHIP
            </span>
          </div>
        </div>
      </section>

      <section
        className={styles.contact}
        aria-labelledby="home-contact-heading"
      >
        <div className={styles.contactMeta}>
          <span>CONTACT</span>
          <span>05 / NEXT</span>
        </div>

        <div className={styles.contactHeadlineWrap}>
          <p className={styles.contactKicker}>
            HAVE A SYSTEM THAT NEEDS TO WORK?
          </p>

          <h2
            id="home-contact-heading"
            className={styles.contactHeadline}
          >
            <span>LET&apos;S BUILD</span>
            <span>SOMETHING</span>
            <span>THAT HAS TO</span>
            <span>WORK.</span>
          </h2>
        </div>

        <div className={styles.contactActions}>
          <div className={styles.primaryAction}>
            <span className={styles.actionLabel}>
              START HERE
            </span>

            <Link
              href="/contact"
              className={styles.contactLink}
            >
              Start a conversation
              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          <nav
            className={styles.externalLinks}
            aria-label="External profiles"
          >
            <a
              href={siteConfig.github.profileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>

        <div className={styles.footerLine}>
          <span>
            {siteConfig.person.name}
          </span>

          <span>
            SOFTWARE / QA / DATA / PLATFORM
          </span>

          <span>
            PORTFOLIO
          </span>
        </div>
      </section>
    </footer>
  );
}
