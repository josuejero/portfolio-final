'use client';

import Link from 'next/link';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getDefaultRoleLens,
  getRoleLensBySlug,
  ROLE_LENSES,
} from '@/data/role-lenses';
import { getFeaturedProjects } from '@/data/projects';
import { partitionRepositoriesForRoleLens } from '@/lib/projects/role-lens';
import { toRepositoryProjectViewModel } from '@/lib/projects/view-model';
import type { GitHubRepositorySummary } from '@/types/github';
import type { RoleLens } from '@/types/role-lens';

import { formatDate } from './project-detail-utils';
import styles from './ProjectsExplorer.module.css';

const orderedRoleLenses = [
  ...ROLE_LENSES,
].sort(
  (left, right) =>
    left.presentation.order -
    right.presentation.order,
);

const defaultRoleLens =
  getDefaultRoleLens() ??
  orderedRoleLenses[0];

const featuredProjectCount =
  getFeaturedProjects().length;

export default function ProjectsExplorer() {
  const [repos, setRepos] =
    useState<GitHubRepositorySummary[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [activeLens, setActiveLens] =
    useState<RoleLens | undefined>(
      defaultRoleLens,
    );

  useEffect(() => {
    const requestedSlug =
      new URLSearchParams(
        window.location.search,
      ).get('lens');

    if (!requestedSlug) {
      return;
    }

    const requestedLens =
      getRoleLensBySlug(requestedSlug);

    if (requestedLens) {
      setActiveLens(requestedLens);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          '/api/github-projects/repos',
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load repositories (status ${response.status})`,
          );
        }

        const data:
          GitHubRepositorySummary[] =
          await response.json();

        if (!cancelled) {
          setRepos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load repositories from GitHub.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const partition = useMemo(() => {
    if (!activeLens) {
      return {
        matched: [],
        other: repos,
      };
    }

    return partitionRepositoriesForRoleLens(
      repos,
      activeLens,
    );
  }, [activeLens, repos]);

  const selectLens = (
    lens: RoleLens,
  ) => {
    setActiveLens(lens);

    const url =
      new URL(window.location.href);

    url.searchParams.set(
      'lens',
      lens.slug,
    );

    window.history.replaceState(
      null,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    );
  };

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <span>WORK INDEX</span>

          <span>
            {featuredProjectCount}
            {' '}FLAGSHIP SYSTEMS
          </span>

          <span>
            LIVE GITHUB DATA
          </span>
        </div>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.heroKicker}>
              SHIPPED WORK / EVIDENCE /
              SOURCE
            </p>

            <h1 className={styles.heroTitle}>
              PROJECTS
            </h1>
          </div>

          <div className={styles.heroAside}>
            <p>
              A role-aware index of systems,
              QA evidence, data tooling, and
              public engineering work.
            </p>

            <div className={styles.repoCount}>
              <strong>
                {loading
                  ? '—'
                  : repos.length}
              </strong>

              <span>
                PUBLIC REPOSITORIES
              </span>
            </div>
          </div>
        </div>
      </header>

      <section
        className={styles.lensSection}
        aria-labelledby="project-lens-heading"
      >
        <div className={styles.lensIntro}>
          <span
            id="project-lens-heading"
            className={styles.sectionLabel}
          >
            ROLE LENS
          </span>

          <p>
            Reorder the index around the
            work most relevant to a hiring
            context.
          </p>
        </div>

        <div
          className={styles.lensGrid}
          role="group"
          aria-label="Project role lens"
        >
          {orderedRoleLenses.map(
            (lens, index) => {
              const selected =
                activeLens?.id === lens.id;

              return (
                <button
                  key={lens.id}
                  type="button"
                  aria-pressed={selected}
                  className={[
                    styles.lensButton,
                    selected
                      ? styles.lensButtonActive
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() =>
                    selectLens(lens)
                  }
                >
                  <span
                    className={
                      styles.lensIndex
                    }
                    aria-hidden="true"
                  >
                    {String(
                      index + 1,
                    ).padStart(2, '0')}
                  </span>

                  <strong>
                    {lens.shortLabel}
                  </strong>

                  <span
                    className={
                      styles.lensArrow
                    }
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </button>
              );
            },
          )}
        </div>

        {activeLens ? (
          <div className={styles.lensSummary}>
            <span>
              {activeLens.label}
            </span>

            <p>
              {activeLens.summary}
            </p>
          </div>
        ) : null}
      </section>

      {error ? (
        <div
          className={styles.error}
          role="status"
        >
          <span>
            GITHUB FEED UNAVAILABLE
          </span>

          <p>{error}</p>
        </div>
      ) : null}

      {loading ? (
        <div className={styles.loading}>
          <span>READING WORK INDEX</span>
          <strong>LOADING…</strong>
        </div>
      ) : repos.length === 0 ? (
        <div className={styles.loading}>
          <span>WORK INDEX</span>
          <strong>
            NO REPOSITORIES AVAILABLE
          </strong>
        </div>
      ) : (
        <>
          <section
            className={styles.selectedSection}
            aria-labelledby="selected-work-heading"
          >
            <div className={styles.sectionHeading}>
              <div>
                <span
                  className={
                    styles.sectionLabel
                  }
                >
                  SELECTED WORK
                </span>

                <h2 id="selected-work-heading">
                  {activeLens
                    ? `Best matches for ${activeLens.shortLabel}`
                    : 'Curated work'}
                </h2>
              </div>

              <span
                className={
                  styles.sectionCount
                }
              >
                {String(
                  partition.matched.length,
                ).padStart(2, '0')}
              </span>
            </div>

            {partition.matched.length >
            0 ? (
              <div
                className={
                  styles.projectIndex
                }
              >
                {partition.matched.map(
                  (repo, index) => (
                    <ProjectIndexRow
                      key={repo.id}
                      repo={repo}
                      index={index}
                      featured
                    />
                  ),
                )}
              </div>
            ) : (
              <div className={styles.emptyMatch}>
                <strong>
                  No catalogued matches are
                  present in the current
                  GitHub feed.
                </strong>

                <p>
                  Public repositories remain
                  available in the full index
                  below.
                </p>
              </div>
            )}
          </section>

          {partition.other.length > 0 ? (
            <section
              className={styles.repositorySection}
              aria-labelledby="repository-index-heading"
            >
              <div className={styles.sectionHeading}>
                <div>
                  <span
                    className={
                      styles.sectionLabel
                    }
                  >
                    PUBLIC SOURCE
                  </span>

                  <h2
                    id="repository-index-heading"
                  >
                    Repository index
                  </h2>
                </div>

                <span
                  className={
                    styles.sectionCount
                  }
                >
                  {String(
                    partition.other.length,
                  ).padStart(2, '0')}
                </span>
              </div>

              <div
                className={
                  styles.repositoryIndex
                }
              >
                {partition.other.map(
                  (repo, index) => (
                    <ProjectIndexRow
                      key={repo.id}
                      repo={repo}
                      index={index}
                    />
                  ),
                )}
              </div>
            </section>
          ) : null}
        </>
      )}

      <footer className={styles.pageEnd}>
        <span>
          SELECT → INSPECT → VERIFY
        </span>

        <Link href="/contact">
          Discuss the work
          <span aria-hidden="true">
            ↗
          </span>
        </Link>
      </footer>
    </section>
  );
}

function ProjectIndexRow({
  repo,
  index,
  featured = false,
}: {
  repo: GitHubRepositorySummary;
  index: number;
  featured?: boolean;
}) {
  const project =
    toRepositoryProjectViewModel(repo);

  const evidence =
    project.catalogProject?.evidence
      .filter(
        (item) =>
          typeof item.value === 'string' &&
          item.value.trim().length > 0,
      )
      .slice(0, 2) ?? [];

  return (
    <article
      className={[
        styles.projectRow,
        featured
          ? styles.projectRowFeatured
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.projectNumber}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className={styles.projectMain}>
        <div className={styles.projectTitleLine}>
          <h3>
            <Link
              prefetch={false}
              href={`/projects/${encodeURIComponent(
                project.slug,
              )}`}
            >
              {project.name}
            </Link>
          </h3>

          {project.catalogProject
            ?.presentation?.featured ? (
            <span
              className={
                styles.flagshipLabel
              }
            >
              FLAGSHIP
            </span>
          ) : null}
        </div>

        {project.description ? (
          <p className={styles.projectDescription}>
            {project.description}
          </p>
        ) : null}

        {featured &&
        evidence.length > 0 ? (
          <div className={styles.evidenceStrip}>
            {evidence.map((item) => (
              <div key={item.id}>
                <span>
                  {item.label}
                </span>

                <strong>
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.projectMeta}>
        <div className={styles.metaStack}>
          {project.language ? (
            <span>
              {project.language.name}
            </span>
          ) : (
            <span>—</span>
          )}

          <span>
            {project.updatedAt
              ? `UPDATED ${formatDate(
                  project.updatedAt,
                )}`
              : 'UPDATE UNKNOWN'}
          </span>
        </div>

        <div className={styles.projectActions}>
          <Link
            prefetch={false}
            href={`/projects/${encodeURIComponent(
              project.slug,
            )}`}
          >
            Inspect
            <span aria-hidden="true">
              →
            </span>
          </Link>

          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Source
            <span aria-hidden="true">
              ↗
            </span>
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live
              <span aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
