import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

import type { PortfolioProject } from '@/types/project';

interface ProjectCaseStudyProps {
  project: PortfolioProject;
}

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  const caseStudy = project.caseStudy;

  const supportingEvidence = project.evidence.filter(
    (evidence) =>
      evidence.type !== 'repository',
  );

  if (!caseStudy && supportingEvidence.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="case-study-heading"
      className="space-y-6"
    >
      <div className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Case study
        </p>

        <h2
          id="case-study-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Project context and implementation
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Curated project information backed by the
          repository and supporting project evidence.
        </p>
      </div>

      {caseStudy && (
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudy.problem && (
            <article className="rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Problem
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground/90">
                {caseStudy.problem}
              </p>
            </article>
          )}

          {caseStudy.approach && (
            <article className="rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Approach
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground/90">
                {caseStudy.approach}
              </p>
            </article>
          )}
        </div>
      )}

      {caseStudy?.implementation &&
        caseStudy.implementation.length > 0 && (
          <article className="rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Implementation
            </p>

            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {caseStudy.implementation.map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircleIcon
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />

                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </article>
        )}

      {caseStudy?.outcome && (
        <article className="rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Outcome
          </p>

          <p className="mt-3 text-sm leading-6 text-foreground/90">
            {caseStudy.outcome}
          </p>
        </article>
      )}

      {supportingEvidence.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Supporting evidence
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            {supportingEvidence.map(
              (evidence) => (
                <article
                  key={evidence.id}
                  className="rounded-surface border border-border/60 bg-surface/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <DocumentTextIcon
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />

                    <div className="min-w-0 space-y-1">
                      {evidence.href ? (
                        <a
                          href={evidence.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-fast hover:text-brand"
                        >
                          {evidence.label}

                          <ArrowTopRightOnSquareIcon
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-foreground">
                          {evidence.label}
                        </p>
                      )}

                      {evidence.description && (
                        <p className="text-xs leading-5 text-muted-foreground">
                          {evidence.description}
                        </p>
                      )}

                      {evidence.value && (
                        <p className="text-xs font-medium text-foreground">
                          {evidence.value}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      )}
    </section>
  );
}
