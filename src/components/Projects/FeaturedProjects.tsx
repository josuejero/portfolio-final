import {
  ArrowRightIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import { getFeaturedProjects } from '@/data/projects';

const featuredProjects = getFeaturedProjects();

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="featured-projects-heading"
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Featured work
          </p>

          <h2
            id="featured-projects-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Evidence-backed project work
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            Selected projects with repository and README
            evidence behind the technologies, architecture,
            and implementation described here.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-fast hover:text-brand-hover"
        >
          Explore all projects
          <ArrowRightIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project, index) => {
          const readmeEvidence =
            project.evidence.find(
              (evidence) =>
                evidence.type === 'readme',
            );

          const implementation =
            project.caseStudy?.implementation ?? [];

          return (
            <article
              key={project.id}
              className="flex h-full flex-col rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Featured {index + 1}
                </p>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors duration-fast hover:text-brand"
                    >
                      {project.name}
                    </Link>
                  </h3>

                  {project.summary && (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {project.summary}
                    </p>
                  )}
                </div>
              </div>

              {project.caseStudy?.approach && (
                <div className="mt-5 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Approach
                  </p>

                  <p className="mt-2 text-sm leading-6 text-foreground/90">
                    {project.caseStudy.approach}
                  </p>
                </div>
              )}

              {implementation.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Implementation
                  </p>

                  <ul className="space-y-2 text-sm leading-5 text-muted-foreground">
                    {implementation
                      .slice(0, 3)
                      .map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-brand"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-border/60 pt-5 text-xs font-medium">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-brand transition-colors duration-fast hover:text-brand-hover"
                >
                  Project details
                  <ArrowRightIcon
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </Link>

                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors duration-fast hover:text-foreground"
                >
                  <CodeBracketIcon
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Source
                </a>

                {readmeEvidence?.href && (
                  <a
                    href={readmeEvidence.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors duration-fast hover:text-foreground"
                  >
                    <DocumentTextIcon
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    README
                  </a>
                )}

                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors duration-fast hover:text-foreground"
                  >
                    <GlobeAltIcon
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Live
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
