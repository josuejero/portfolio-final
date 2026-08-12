'use client';

import type {
  GitHubGist,
  GitHubGistFile,
} from '@/types/github';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import styles from './SnippetsGallery.module.css';

function formatDate(
  value: string,
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return 'UNKNOWN';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )
    .format(date)
    .toUpperCase();
}

function gistTitle(
  gist: GitHubGist,
): string {
  const description =
    gist.description?.trim();

  if (description) {
    return description;
  }

  return (
    Object.values(gist.files)[0]
      ?.filename ??
    'Untitled gist'
  );
}

function gistLanguages(
  gist: GitHubGist,
): string[] {
  return Array.from(
    new Set(
      Object.values(gist.files)
        .map(
          (file) =>
            file.language,
        )
        .filter(
          (
            language,
          ): language is string =>
            Boolean(language),
        ),
    ),
  );
}

function filePreview(
  file:
    | GitHubGistFile
    | undefined,
): string {
  const content =
    file?.content?.trim();

  if (!content) {
    return 'Open on GitHub to inspect the source.';
  }

  return content.length > 260
    ? `${content.slice(0, 260)}…`
    : content;
}

export default function SnippetsGallery() {
  const [gists, setGists] =
    useState<GitHubGist[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [
    selectedGist,
    setSelectedGist,
  ] =
    useState<GitHubGist | null>(
      null,
    );

  useEffect(() => {
    let cancelled = false;

    const fetchGists =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const response =
            await fetch(
              '/api/github-projects/gists',
            );

          if (!response.ok) {
            throw new Error(
              `Gist request failed with status ${response.status}.`,
            );
          }

          const data =
            (await response.json()) as
              GitHubGist[];

          if (!cancelled) {
            setGists(data);
          }
        } catch (caught) {
          if (!cancelled) {
            setError(
              caught instanceof Error
                ? caught.message
                : 'Unable to load GitHub Gists.',
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    void fetchGists();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedGist) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      'hidden';

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === 'Escape'
      ) {
        setSelectedGist(null);
      }
    };

    window.addEventListener(
      'keydown',
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        onKeyDown,
      );
    };
  }, [selectedGist]);

  const totalFiles =
    useMemo(
      () =>
        gists.reduce(
          (total, gist) =>
            total +
            Object.keys(
              gist.files,
            ).length,
          0,
        ),
      [gists],
    );

  return (
    <section
      className={styles.page}
      aria-labelledby="snippets-heading"
    >
      <header
        className={styles.hero}
      >
        <div
          className={
            styles.heroMeta
          }
        >
          <span>CODE NOTES</span>

          <span>
            LIVE GITHUB GISTS
          </span>

          <span>
            SOURCE / FRAGMENTS
          </span>
        </div>

        <div
          className={
            styles.heroGrid
          }
        >
          <div>
            <p
              className={
                styles.kicker
              }
            >
              SMALL PIECES / REAL SOURCE
            </p>

            <h1
              id="snippets-heading"
              className={styles.title}
            >
              <span>CODE</span>
              <span>NOTES.</span>
            </h1>
          </div>

          <div
            className={
              styles.heroAside
            }
          >
            <p>
              Public Gists for utilities,
              experiments, fragments, and
              implementation notes that
              do not need a full project
              case study.
            </p>

            <div
              className={
                styles.counts
              }
            >
              <div>
                <strong>
                  {loading
                    ? '—'
                    : gists.length}
                </strong>

                <span>GISTS</span>
              </div>

              <div>
                <strong>
                  {loading
                    ? '—'
                    : totalFiles}
                </strong>

                <span>FILES</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        className={
          styles.indexSection
        }
        aria-labelledby="gist-index-heading"
      >
        <div
          className={
            styles.sectionHeading
          }
        >
          <div>
            <span>
              LIVE INDEX
            </span>

            <h2
              id="gist-index-heading"
            >
              GitHub Gists
            </h2>
          </div>

          <p>
            Inspect inline source when
            available, or open the
            original Gist on GitHub.
          </p>
        </div>

        {loading ? (
          <div
            className={
              styles.state
            }
            role="status"
          >
            <span>
              READING GITHUB
            </span>

            <strong>
              LOADING GISTS…
            </strong>
          </div>
        ) : error ? (
          <div
            className={
              styles.state
            }
            role="alert"
          >
            <span>
              GIST FEED ERROR
            </span>

            <strong>
              Unable to read the
              feed.
            </strong>

            <p>{error}</p>
          </div>
        ) : gists.length === 0 ? (
          <div
            className={
              styles.state
            }
          >
            <span>
              LIVE INDEX
            </span>

            <strong>
              No public Gists are
              currently available.
            </strong>
          </div>
        ) : (
          <div
            className={
              styles.gistIndex
            }
          >
            {gists.map(
              (gist, index) => {
                const files =
                  Object.values(
                    gist.files,
                  );

                const languages =
                  gistLanguages(gist);

                const preview =
                  filePreview(
                    files[0],
                  );

                const canInspect =
                  files.some(
                    (file) =>
                      Boolean(
                        file.content
                          ?.trim(),
                      ),
                  );

                return (
                  <article
                    key={gist.id}
                    className={
                      styles.gistRow
                    }
                  >
                    <span
                      className={
                        styles.index
                      }
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <div
                      className={
                        styles.gistMain
                      }
                    >
                      {canInspect ? (
                        <button
                          type="button"
                          className={
                            styles.gistTitle
                          }
                          onClick={() =>
                            setSelectedGist(
                              gist,
                            )
                          }
                        >
                          {gistTitle(
                            gist,
                          )}
                        </button>
                      ) : (
                        <a
                          className={
                            styles.gistTitle
                          }
                          href={gist.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {gistTitle(
                            gist,
                          )}
                        </a>
                      )}

                      <pre
                        className={
                          styles.preview
                        }
                      >
                        {preview}
                      </pre>

                      {gist.tags &&
                      gist.tags.length >
                        0 ? (
                        <div
                          className={
                            styles.tags
                          }
                        >
                          {gist.tags.map(
                            (tag) => (
                              <span
                                key={tag}
                              >
                                #{tag}
                              </span>
                            ),
                          )}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className={
                        styles.gistMeta
                      }
                    >
                      <span>
                        {formatDate(
                          gist.updated_at,
                        )}
                      </span>

                      <span>
                        {
                          files.length
                        }{' '}
                        {files.length ===
                        1
                          ? 'FILE'
                          : 'FILES'}
                      </span>

                      <span>
                        {languages.length >
                        0
                          ? languages.join(
                              ' / ',
                            )
                          : 'LANGUAGE UNKNOWN'}
                      </span>

                      <div
                        className={
                          styles.actions
                        }
                      >
                        {canInspect ? (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedGist(
                                gist,
                              )
                            }
                          >
                            Inspect
                            <span
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </button>
                        ) : null}

                        <a
                          href={
                            gist.html_url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                          <span
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        )}
      </section>

      {selectedGist ? (
        <div
          className={
            styles.dialogBackdrop
          }
          role="presentation"
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedGist(
                null,
              );
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="gist-dialog-title"
            className={
              styles.dialog
            }
          >
            <header
              className={
                styles.dialogHeader
              }
            >
              <div>
                <span>
                  SOURCE INSPECTOR
                </span>

                <h2
                  id="gist-dialog-title"
                >
                  {gistTitle(
                    selectedGist,
                  )}
                </h2>
              </div>

              <button
                type="button"
                className={
                  styles.closeButton
                }
                onClick={() =>
                  setSelectedGist(
                    null,
                  )
                }
                aria-label="Close source inspector"
              >
                CLOSE
                <span
                  aria-hidden="true"
                >
                  ×
                </span>
              </button>
            </header>

            <div
              className={
                styles.dialogMeta
              }
            >
              <span>
                CREATED{' '}
                {formatDate(
                  selectedGist.created_at,
                )}
              </span>

              <span>
                UPDATED{' '}
                {formatDate(
                  selectedGist.updated_at,
                )}
              </span>

              <a
                href={
                  selectedGist.html_url
                }
                target="_blank"
                rel="noreferrer"
              >
                OPEN ON GITHUB ↗
              </a>
            </div>

            <div
              className={
                styles.files
              }
            >
              {Object.entries(
                selectedGist.files,
              ).map(
                ([
                  filename,
                  file,
                ],
                fileIndex) => (
                  <section
                    key={filename}
                    className={
                      styles.file
                    }
                  >
                    <div
                      className={
                        styles.fileHeading
                      }
                    >
                      <span>
                        {String(
                          fileIndex + 1,
                        ).padStart(
                          2,
                          '0',
                        )}
                      </span>

                      <strong>
                        {filename}
                      </strong>

                      <span>
                        {file.language ??
                          'TEXT'}
                      </span>

                      <span>
                        {file.size.toLocaleString()}
                        {' '}BYTES
                      </span>
                    </div>

                    <pre
                      className={
                        styles.code
                      }
                    >
                      {file.content ||
                        'Open this Gist on GitHub to inspect the complete source file.'}
                    </pre>
                  </section>
                ),
              )}
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
