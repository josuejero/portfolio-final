'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { defaultUrlTransform } from 'react-markdown';

import ProjectCaseStudy from './ProjectCaseStudy';
import ProjectInteractiveDemo from './demos/ProjectInteractiveDemo';
import ProjectReadme from './ProjectReadme';
import {
  formatDate,
  normalizeRelativePath,
} from './project-detail-utils';
import { useProjectDetail } from './hooks/useProjectDetail';

import styles from './ProjectDetail.module.css';

interface ProjectDetailProps {
  name: string;
}

export default function ProjectDetail({
  name,
}: ProjectDetailProps) {
  const {
    project,
    repo,
    loading,
    error,
    readme,
    readmeLoading,
    readmeError,
  } = useProjectDetail(name);

  const repoName =
    project?.name ?? repo?.name ?? name;

  const repoDescription =
    project?.summary ?? repo?.description;

  const repoUrl =
    project?.links.source ??
    repo?.htmlUrl;

  const liveUrl =
    project?.links.live ??
    repo?.homepage ??
    undefined;

  const supportingEvidence =
    project?.evidence.filter(
      (evidence) =>
        evidence.type !== 'repository',
    ) ?? [];

  const { blobBase, rawBase } =
    useMemo(() => {
      let owner = '';
      let repositoryName = '';

      if (repoUrl) {
        try {
          const parts =
            new URL(repoUrl)
              .pathname
              .split('/')
              .filter(Boolean);

          owner = parts[0] ?? '';
          repositoryName =
            parts[1] ?? '';
        } catch {
          // Ignore malformed repository URLs.
        }
      }

      let branch = 'main';

      if (readme?.sourceUrl) {
        const match =
          readme.sourceUrl.match(
            /\/blob\/([^/]+)\//,
          );

        if (match?.[1]) {
          branch = match[1];
        }
      }

      return {
        blobBase:
          owner && repositoryName
            ? `https://github.com/${owner}/${repositoryName}/blob/${branch}`
            : '',
        rawBase:
          owner && repositoryName
            ? `https://raw.githubusercontent.com/${owner}/${repositoryName}/${branch}`
            : '',
      };
    }, [
      repoUrl,
      readme?.sourceUrl,
    ]);

  const urlTransform = (
    url: string,
    key?: string,
  ) => {
    const safe =
      defaultUrlTransform(url);

    if (safe.startsWith('#')) {
      return safe;
    }

    if (
      /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(
        safe,
      )
    ) {
      return safe;
    }

    if (!blobBase || !rawBase) {
      return safe;
    }

    const relative =
      normalizeRelativePath(safe);

    if (key === 'src') {
      return `${rawBase}/${relative}`;
    }

    if (key === 'href') {
      return `${blobBase}/${relative}`;
    }

    return safe;
  };

  return (
    <div
      className={styles.page}
      data-project={
        project?.id ?? 'repository'
      }
    >
      <header className={styles.hero}>
        <div className={styles.utilityRow}>
          <Link
            href="/projects"
            className={styles.backLink}
          >
            <span aria-hidden="true">
              ←
            </span>
            Work index
          </Link>

          <div className={styles.utilityMeta}>
            <span>
              {project
                ? 'CATALOGUED PROJECT'
                : 'PUBLIC REPOSITORY'}
            </span>

            {repo?.language ? (
              <span>
                {repo.language}
              </span>
            ) : null}

            {repo?.pushedAt ? (
              <span>
                UPDATED{' '}
                {formatDate(
                  repo.pushedAt,
                )}
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles.titleGrid}>
          <div>
            <p className={styles.kicker}>
              SYSTEM / EVIDENCE / SOURCE
            </p>

            <h1 className={styles.title}>
              {repoName}
            </h1>
          </div>

          <div className={styles.heroAside}>
            {repoDescription ? (
              <p>
                {repoDescription}
              </p>
            ) : null}

            <div className={styles.heroActions}>
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : null}

              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live system
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {loading && !repo ? (
          <div
            className={
              styles.statusMessage
            }
          >
            Reading repository metadata…
          </div>
        ) : null}

        {!loading && error ? (
          <div
            className={
              styles.statusMessage
            }
            data-error="true"
          >
            {error}
          </div>
        ) : null}

        {supportingEvidence.length >
        0 ? (
          <section
            className={
              styles.evidenceLedger
            }
            aria-labelledby="project-evidence-heading"
          >
            <div
              className={
                styles.evidenceIntro
              }
            >
              <span
                id="project-evidence-heading"
              >
                EVIDENCE LEDGER
              </span>

              <p>
                Verifiable project claims
                before narrative.
              </p>
            </div>

            <div
              className={
                styles.evidenceEntries
              }
            >
              {supportingEvidence.map(
                (evidence, index) => {
                  const content = (
                    <>
                      <span
                        className={
                          styles.evidenceIndex
                        }
                      >
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          '0',
                        )}
                      </span>

                      <div>
                        <span
                          className={
                            styles.evidenceLabel
                          }
                        >
                          {
                            evidence.label
                          }
                        </span>

                        {evidence.value ? (
                          <strong>
                            {
                              evidence.value
                            }
                          </strong>
                        ) : null}

                        {evidence.description ? (
                          <p>
                            {
                              evidence.description
                            }
                          </p>
                        ) : null}
                      </div>

                      {evidence.href ? (
                        <span
                          className={
                            styles.evidenceArrow
                          }
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      ) : null}
                    </>
                  );

                  return evidence.href ? (
                    <a
                      key={evidence.id}
                      href={evidence.href}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        styles.evidenceEntry
                      }
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={evidence.id}
                      className={
                        styles.evidenceEntry
                      }
                    >
                      {content}
                    </div>
                  );
                },
              )}
            </div>
          </section>
        ) : null}
      </header>

      {project?.caseStudy ? (
        <ProjectCaseStudy
          project={project}
        />
      ) : null}

      {project?.demo ? (
        <ProjectInteractiveDemo
          project={project}
        />
      ) : null}

      <section
        className={styles.documentation}
        aria-labelledby="repository-readme-heading"
      >
        <div className={styles.documentationHeading}>
          <div>
            <span>
              REPOSITORY DOCUMENTATION
            </span>

            <h2
              id="repository-readme-heading"
            >
              README
            </h2>
          </div>

          <p>
            Original repository
            documentation preserved for
            deeper technical inspection.
          </p>
        </div>

        <ProjectReadme
          readme={readme}
          readmeLoading={readmeLoading}
          readmeError={readmeError}
          repoUrl={repoUrl}
          urlTransform={urlTransform}
        />
      </section>

      <footer className={styles.pageEnd}>
        <Link href="/projects">
          <span aria-hidden="true">
            ←
          </span>
          All projects
        </Link>

        <Link href="/contact">
          Discuss this work
          <span aria-hidden="true">
            ↗
          </span>
        </Link>
      </footer>
    </div>
  );
}
