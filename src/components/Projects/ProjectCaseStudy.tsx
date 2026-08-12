import type { PortfolioProject } from '@/types/project';

import styles from './ProjectCaseStudy.module.css';

interface ProjectCaseStudyProps {
  project: PortfolioProject;
}

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  const caseStudy = project.caseStudy;

  if (!caseStudy) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="case-study-heading"
    >
      <div className={styles.heading}>
        <span>CASE STUDY</span>

        <h2 id="case-study-heading">
          From problem to working system.
        </h2>
      </div>

      <div className={styles.contextGrid}>
        {caseStudy.problem ? (
          <article className={styles.context}>
            <span>01 / PROBLEM</span>

            <p>
              {caseStudy.problem}
            </p>
          </article>
        ) : null}

        {caseStudy.approach ? (
          <article className={styles.context}>
            <span>02 / APPROACH</span>

            <p>
              {caseStudy.approach}
            </p>
          </article>
        ) : null}
      </div>

      {caseStudy.implementation &&
      caseStudy.implementation.length >
        0 ? (
        <div className={styles.implementation}>
          <div
            className={
              styles.implementationIntro
            }
          >
            <span>
              03 / IMPLEMENTATION
            </span>

            <p>
              The decisions that turned
              the approach into a working
              system.
            </p>
          </div>

          <ol
            className={
              styles.implementationList
            }
          >
            {caseStudy.implementation.map(
              (item, index) => (
                <li key={item}>
                  <span aria-hidden="true">
                    {String(
                      index + 1,
                    ).padStart(2, '0')}
                  </span>

                  <p>{item}</p>
                </li>
              ),
            )}
          </ol>
        </div>
      ) : null}

      {caseStudy.outcome ? (
        <div className={styles.outcome}>
          <span>04 / OUTCOME</span>

          <p>
            {caseStudy.outcome}
          </p>
        </div>
      ) : null}
    </section>
  );
}
