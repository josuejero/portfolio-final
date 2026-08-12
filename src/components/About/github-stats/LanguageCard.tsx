'use client';

import styles from '../GithubActivity.module.css';

interface Props {
  topLanguages:
    Record<string, number>;
}

export default function LanguageCard({
  topLanguages,
}: Props) {
  const languageEntries =
    Object.entries(topLanguages)
      .sort(
        ([, a], [, b]) =>
          b - a,
      )
      .slice(0, 6);

  const totalLanguageBytes =
    languageEntries.reduce(
      (sum, [, bytes]) =>
        sum + bytes,
      0,
    );

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeading}>
        <span>LANGUAGES</span>
        <strong>TOP 06</strong>
      </div>

      {languageEntries.length > 0 ? (
        <div className={styles.languageList}>
          {languageEntries.map(
            ([language, bytes]) => {
              const percentage =
                totalLanguageBytes === 0
                  ? 0
                  : (
                      bytes /
                      totalLanguageBytes
                    ) * 100;

              return (
                <div key={language}>
                  <div
                    className={
                      styles.languageMeta
                    }
                  >
                    <strong>
                      {language}
                    </strong>

                    <span>
                      {percentage.toFixed(
                        1,
                      )}
                      %
                    </span>
                  </div>

                  <div
                    className={
                      styles.languageTrack
                    }
                  >
                    <span
                      style={{
                        width:
                          `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      ) : (
        <p className={styles.empty}>
          No language data available.
        </p>
      )}
    </section>
  );
}
