'use client';

import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
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
    project?.links.source ?? repo?.htmlUrl;

  const liveUrl =
    project?.links.live ?? repo?.homepage ?? undefined;

  const { blobBase, rawBase } = useMemo(() => {
    let owner = '';
    let repositoryName = '';

    if (repoUrl) {
      try {
        const parts = new URL(repoUrl)
          .pathname
          .split('/')
          .filter(Boolean);

        owner = parts[0] ?? '';
        repositoryName = parts[1] ?? '';
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

    const blob =
      owner && repositoryName
        ? `https://github.com/${owner}/${repositoryName}/blob/${branch}`
        : '';

    const raw =
      owner && repositoryName
        ? `https://raw.githubusercontent.com/${owner}/${repositoryName}/${branch}`
        : '';

    return {
      blobBase: blob,
      rawBase: raw,
    };
  }, [repoUrl, readme?.sourceUrl]);

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
    <div className="space-y-12">
      <header className="space-y-6 border-b border-border/60 pb-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Project
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {repoName}
            </h1>

            {repoDescription && (
              <p className="text-base leading-7 text-muted-foreground">
                {repoDescription}
              </p>
            )}

            {repo && (
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="rounded-pill border border-border/60 bg-muted/60 px-2.5 py-1">
                    {repo.language}
                  </span>
                )}

                <span className="rounded-pill border border-border/60 bg-muted/60 px-2.5 py-1">
                  Updated{' '}
                  {formatDate(repo.pushedAt)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-control border border-border bg-surface-raised/70 px-3 py-2 text-xs font-medium text-foreground transition-colors duration-fast hover:border-brand/50 hover:bg-muted"
              >
                <CodeBracketIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Source
                <ArrowTopRightOnSquareIcon
                  className="h-3 w-3"
                  aria-hidden="true"
                />
              </a>
            )}

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-control bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
              >
                <GlobeAltIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Live application
                <ArrowTopRightOnSquareIcon
                  className="h-3 w-3"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </div>

        {loading && !repo && (
          <div className="rounded-surface border border-border/70 bg-card/50 p-4 text-sm text-muted-foreground">
            Loading repository metadata…
          </div>
        )}

        {!loading && error && (
          <div className="rounded-surface border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            {error}
          </div>
        )}
      </header>

      {project && (
        <ProjectCaseStudy
          project={project}
        />
      )}

      {project?.demo && (
        <ProjectInteractiveDemo
          project={project}
        />
      )}

      <section
        aria-labelledby="repository-readme-heading"
        className="space-y-5"
      >
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Repository documentation
          </p>

          <h2
            id="repository-readme-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            README
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            Original repository documentation is
            preserved below for deeper technical
            inspection.
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
    </div>
  );
}
