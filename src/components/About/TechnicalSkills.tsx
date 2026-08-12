import {
  ABOUT_SKILL_GROUPS,
  getAboutSkillsForGroup,
} from '@/data/skills';

import styles from './AboutSections.module.css';

export default function TechnicalSkills() {
  return (
    <section
      className={styles.section}
      aria-labelledby="skills-heading"
    >
      <div className={styles.sectionIntro}>
        <span>03 / TECHNICAL RANGE</span>

        <h2 id="skills-heading">
          Tools organized by the work
          they enable.
        </h2>
      </div>

      <div className={styles.skillGroups}>
        {ABOUT_SKILL_GROUPS.map(
          (group, groupIndex) => {
            const skills =
              getAboutSkillsForGroup(
                group.id,
              );

            return (
              <section
                key={group.id}
                className={
                  styles.skillGroup
                }
              >
                <div
                  className={
                    styles.skillGroupHeading
                  }
                >
                  <span>
                    {String(
                      groupIndex + 1,
                    ).padStart(2, '0')}
                  </span>

                  <h3>
                    {group.label}
                  </h3>
                </div>

                <div
                  className={
                    styles.skillList
                  }
                >
                  {skills.map((skill) => {
                    const about =
                      skill.presentation
                        ?.about;

                    if (!about) {
                      return null;
                    }

                    return (
                      <div
                        key={skill.id}
                        className={
                          styles.skillRow
                        }
                      >
                        <strong>
                          {about.label ??
                            skill.name}
                        </strong>

                        <p>
                          {about.details}
                        </p>

                        <span>
                          {
                            skill.yearsOfExperience
                          }{' '}
                          {skill.yearsOfExperience ===
                          1
                            ? 'YEAR'
                            : 'YEARS'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          },
        )}
      </div>
    </section>
  );
}
