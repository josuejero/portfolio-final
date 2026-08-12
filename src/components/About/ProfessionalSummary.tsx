import { ROLE_LENSES } from '@/data/role-lenses';

import styles from './AboutSections.module.css';

const roleLenses = [
  ...ROLE_LENSES,
].sort(
  (left, right) =>
    left.presentation.order -
    right.presentation.order,
);

export default function ProfessionalSummary() {
  return (
    <section
      className={styles.section}
      aria-labelledby="background-heading"
    >
      <div className={styles.sectionIntro}>
        <span>01 / BACKGROUND</span>

        <h2 id="background-heading">
          Engineering with a practical
          bias.
        </h2>
      </div>

      <div className={styles.statement}>
        <p>
          Computer Engineering graduate
          with hands-on work spanning
          software development, cloud
          computing, and automation.
          The through-line is practical:
          build systems that can be tested,
          explained, and maintained.
        </p>
      </div>

      <div className={styles.roleIndex}>
        {roleLenses.map(
          (lens, index) => (
            <div key={lens.id}>
              <span>
                {String(
                  index + 1,
                ).padStart(2, '0')}
              </span>

              <strong>
                {lens.shortLabel}
              </strong>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
