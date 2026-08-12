import { siteConfig } from '@/config/site';

import ContactForm from './ContactForm';

import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section
      className={styles.page}
      aria-labelledby="contact-heading"
    >
      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span>CONTACT</span>
          <span>DIRECT INQUIRY</span>
          <span>START WITH CONTEXT</span>
        </div>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>
              SOMETHING NEEDS TO WORK.
            </p>

            <h1
              id="contact-heading"
              className={styles.title}
            >
              <span>TELL ME</span>
              <span>WHAT NEEDS</span>
              <span>TO WORK.</span>
            </h1>
          </div>

          <div className={styles.heroAside}>
            <p>
              Share the goal, constraint,
              failure mode, or system you are
              trying to move forward.
            </p>

            <span>
              BUILD / TEST / DATA / PLATFORM
            </span>
          </div>
        </div>
      </header>

      <div className={styles.contactGrid}>
        <div className={styles.formColumn}>
          <div className={styles.sectionHeading}>
            <span>01 / MESSAGE</span>

            <h2>
              Start with the problem.
            </h2>
          </div>

          <ContactForm />
        </div>

        <aside className={styles.contextColumn}>
          <section className={styles.contextSection}>
            <span className={styles.contextLabel}>
              USEFUL CONTEXT
            </span>

            <div className={styles.contextItems}>
              <div>
                <span>01</span>
                <p>
                  What are you trying to
                  build, fix, validate, or
                  understand?
                </p>
              </div>

              <div>
                <span>02</span>
                <p>
                  What constraint, blocker, or
                  deadline matters most?
                </p>
              </div>

              <div>
                <span>03</span>
                <p>
                  What would a successful
                  outcome look like?
                </p>
              </div>
            </div>
          </section>

          <section className={styles.profileSection}>
            <span className={styles.contextLabel}>
              ELSEWHERE
            </span>

            <div className={styles.profileLinks}>
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
            </div>
          </section>
        </aside>
      </div>

      <footer className={styles.pageEnd}>
        <span>
          {siteConfig.person.name}
        </span>

        <span>
          SOFTWARE / QA / DATA / PLATFORM
        </span>

        <span>
          CONTACT
        </span>
      </footer>
    </section>
  );
}
