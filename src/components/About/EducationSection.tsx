import styles from './AboutSections.module.css';

const education = {
  degree:
    'Bachelor of Science in Computer Engineering',
  school:
    'Florida International University (FIU)',
  location: 'Miami, Florida',
  graduation: 'July 2024',
  recognition:
    "Dean's List · Spring 2020",
  relevantCourses: [
    'Data Structures',
    'Operating Systems',
    'Mobile App Development',
    'Systems Programming',
    'Embedded Systems',
    'Computer Architecture',
    'Analytics & Cloud in ECE',
    'IoT Security',
    'Deep Learning in ECE',
  ],
} as const;

export default function EducationSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="education-heading"
    >
      <div className={styles.sectionIntro}>
        <span>02 / EDUCATION</span>

        <h2 id="education-heading">
          Computer Engineering.
        </h2>
      </div>

      <div className={styles.educationGrid}>
        <div className={styles.degree}>
          <strong>
            {education.degree}
          </strong>

          <p>{education.school}</p>
        </div>

        <dl className={styles.educationMeta}>
          <div>
            <dt>LOCATION</dt>
            <dd>
              {education.location}
            </dd>
          </div>

          <div>
            <dt>GRADUATED</dt>
            <dd>
              {education.graduation}
            </dd>
          </div>

          <div>
            <dt>RECOGNITION</dt>
            <dd>
              {education.recognition}
            </dd>
          </div>
        </dl>
      </div>

      <div className={styles.coursework}>
        <span className={styles.subLabel}>
          SELECTED COURSEWORK
        </span>

        <div className={styles.courseList}>
          {education.relevantCourses.map(
            (course, index) => (
              <div key={course}>
                <span>
                  {String(
                    index + 1,
                  ).padStart(2, '0')}
                </span>

                <strong>
                  {course}
                </strong>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
