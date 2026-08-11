'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  CYCLEREADY_REQUIREMENTS,
  INITIAL_CYCLEREADY_DEFECTS,
  evaluateRelease,
  getDefectsForRequirement,
  getRequirementsForFilter,
  getTraceabilityStats,
  setDefectStatus,
  type CycleReadyDefect,
  type CycleReadyFilter,
} from './cycleready/model';

const RECORDED_METRICS = [
  {
    label: 'Requirements mapped',
    value: '15/15',
  },
  {
    label: 'Manual test cases',
    value: '25',
  },
  {
    label: 'Playwright tests',
    value: '27/27',
  },
  {
    label: 'Requirements automated',
    value: '13/15',
  },
] as const;

const FILTERS: readonly {
  id: CycleReadyFilter;
  label: string;
}[] = [
  {
    id: 'all',
    label: 'All requirements',
  },
  {
    id: 'blockers',
    label: 'Open blockers',
  },
  {
    id: 'manual-only',
    label: 'Manual-only',
  },
];

function defectClass(
  defect: CycleReadyDefect,
): string {
  if (defect.status === 'resolved') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
  }

  return defect.severity === 1
    ? 'border-destructive/40 bg-destructive/10 text-foreground'
    : 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300';
}

export default function CycleReadyDemo() {
  const [defects, setDefects] = useState<
    CycleReadyDefect[]
  >(() =>
    INITIAL_CYCLEREADY_DEFECTS.map(
      (defect) => ({
        ...defect,
        requirementIds: [
          ...defect.requirementIds,
        ],
      }),
    ),
  );

  const [filter, setFilter] =
    useState<CycleReadyFilter>('all');

  const [selectedRequirementId, setSelectedRequirementId] =
    useState(CYCLEREADY_REQUIREMENTS[0].id);

  const [status, setStatus] = useState(
    'Recorded no-go release snapshot loaded.',
  );

  const stats = useMemo(
    () => getTraceabilityStats(),
    [],
  );

  const release = useMemo(
    () => evaluateRelease(defects),
    [defects],
  );

  const visibleRequirements = useMemo(
    () =>
      getRequirementsForFilter(
        filter,
        defects,
      ),
    [defects, filter],
  );

  const selectedRequirement = useMemo(
    () =>
      CYCLEREADY_REQUIREMENTS.find(
        (requirement) =>
          requirement.id ===
          selectedRequirementId,
      ) ?? CYCLEREADY_REQUIREMENTS[0],
    [selectedRequirementId],
  );

  const linkedDefects = useMemo(
    () =>
      getDefectsForRequirement(
        selectedRequirement.id,
        defects,
      ),
    [defects, selectedRequirement.id],
  );

  const updateDefect = (
    defect: CycleReadyDefect,
  ) => {
    const nextStatus =
      defect.status === 'open'
        ? 'resolved'
        : 'open';

    setDefects((current) =>
      setDefectStatus(
        current,
        defect.id,
        nextStatus,
      ),
    );

    setStatus(
      `${defect.id} marked ${nextStatus} in the browser simulation.`,
    );
  };

  const resetDemo = () => {
    setDefects(
      INITIAL_CYCLEREADY_DEFECTS.map(
        (defect) => ({
          ...defect,
          requirementIds: [
            ...defect.requirementIds,
          ],
        }),
      ),
    );
    setFilter('all');
    setSelectedRequirementId(
      CYCLEREADY_REQUIREMENTS[0].id,
    );
    setStatus(
      'Recorded no-go release snapshot restored.',
    );
  };

  return (
    <div className="space-y-5 rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            QA release room
          </p>

          <p className="text-sm leading-6 text-muted-foreground">
            Explore representative requirements,
            mapped test evidence, UAT status, and
            severity-based blockers. Resolve or reopen
            the browser-only defects to see how the
            release decision responds while the recorded
            project snapshot remains unchanged.
          </p>
        </div>

        <button
          type="button"
          onClick={resetDemo}
          className="inline-flex shrink-0 items-center justify-center rounded-control border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors duration-fast hover:border-brand/50 hover:bg-muted"
        >
          Reset release room
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RECORDED_METRICS.map(
          (metric) => (
            <article
              key={metric.label}
              className="rounded-surface border border-border/60 bg-surface/60 p-3"
            >
              <p className="text-xs text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {metric.value}
              </p>
            </article>
          ),
        )}
      </div>

      <p className="text-xs leading-5 text-muted-foreground">
        The counts above are repository-recorded project
        evidence. Requirement titles and defect names in
        this embedded workspace are representative
        portfolio fixtures for demonstrating traceability
        and release-gate behavior.
      </p>

      <div
        className={`rounded-surface border p-4 ${
          release.decision === 'go'
            ? 'border-emerald-500/30 bg-emerald-500/10'
            : 'border-destructive/40 bg-destructive/10'
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Simulated release decision
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {release.decision === 'go'
                ? 'Go'
                : 'No-go'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-pill border border-border/60 bg-background/60 px-2.5 py-1 text-foreground">
              Sev1 open: {release.openSev1}
            </span>
            <span className="rounded-pill border border-border/60 bg-background/60 px-2.5 py-1 text-foreground">
              Sev2 open: {release.openSev2}
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Recorded source state: no-go with one open
          Sev1 and two open Sev2 defects. This control
          surface lets you alter only the representative
          browser state.
        </p>

        {release.reasons.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-foreground">
            {release.reasons.map(
              (reason) => (
                <li key={reason}>{reason}</li>
              ),
            )}
          </ul>
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <aside className="space-y-4 rounded-surface border border-border/60 bg-surface/50 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Traceability view
            </p>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() =>
                    setFilter(item.id)
                  }
                  className={`rounded-control border px-3 py-2 text-xs font-medium transition-colors duration-fast ${
                    filter === item.id
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-border bg-background text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {visibleRequirements.length === 0 ? (
              <p className="rounded-control border border-border/60 bg-background/60 p-3 text-xs leading-5 text-muted-foreground">
                No requirements match this view after
                the current simulated defect changes.
              </p>
            ) : (
              visibleRequirements.map(
                (requirement) => {
                  const blockers =
                    getDefectsForRequirement(
                      requirement.id,
                      defects,
                    ).filter(
                      (defect) =>
                        defect.status === 'open' &&
                        defect.severity <= 2,
                    );

                  return (
                    <button
                      key={requirement.id}
                      type="button"
                      onClick={() => {
                        setSelectedRequirementId(
                          requirement.id,
                        );
                        setStatus(
                          `Loaded ${requirement.id} traceability evidence.`,
                        );
                      }}
                      className={`w-full rounded-control border p-3 text-left transition-colors duration-fast ${
                        selectedRequirement.id ===
                        requirement.id
                          ? 'border-brand bg-brand/10'
                          : 'border-border bg-background/60 hover:border-brand/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-brand">
                            {requirement.id}
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {requirement.title}
                          </p>
                        </div>

                        {blockers.length > 0 && (
                          <span className="rounded-pill border border-destructive/40 bg-destructive/10 px-2 py-1 text-[11px] font-semibold text-foreground">
                            {blockers.length} blocker
                            {blockers.length === 1
                              ? ''
                              : 's'}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {requirement.surface}
                      </p>
                    </button>
                  );
                },
              )
            )}
          </div>
        </aside>

        <section className="space-y-4 rounded-surface border border-border/60 bg-surface/50 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Requirement evidence
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              {selectedRequirement.id} ·{' '}
              {selectedRequirement.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Surface: {selectedRequirement.surface}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-control border border-border/60 bg-background/60 p-3">
              <p className="text-xs text-muted-foreground">
                Manual cases
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {selectedRequirement.manualCases}
              </p>
            </article>

            <article className="rounded-control border border-border/60 bg-background/60 p-3">
              <p className="text-xs text-muted-foreground">
                Automated tests
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {selectedRequirement.automatedTests}
              </p>
            </article>

            <article className="rounded-control border border-border/60 bg-background/60 p-3">
              <p className="text-xs text-muted-foreground">
                UAT evidence
              </p>
              <p className="mt-1 text-lg font-semibold capitalize text-foreground">
                {selectedRequirement.uat}
              </p>
            </article>
          </div>

          {selectedRequirement.automatedTests === 0 && (
            <div className="rounded-control border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-muted-foreground">
              This representative requirement is one of
              the two manual-only requirements in the
              recorded 13-of-15 automation shape.
            </div>
          )}

          <div className="space-y-3 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Linked defects
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Toggle representative blocker status to
                  recalculate the simulated release gate.
                </p>
              </div>
            </div>

            {linkedDefects.length === 0 ? (
              <p className="rounded-control border border-border/60 bg-background/60 p-3 text-xs text-muted-foreground">
                No representative defects are linked to
                this requirement.
              </p>
            ) : (
              linkedDefects.map((defect) => (
                <article
                  key={defect.id}
                  className="rounded-control border border-border/60 bg-background/60 p-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-pill border px-2 py-1 text-[11px] font-semibold ${defectClass(defect)}`}
                        >
                          Sev{defect.severity} ·{' '}
                          {defect.status}
                        </span>
                        <span className="text-xs font-semibold text-brand">
                          {defect.id}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-foreground">
                        {defect.title}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        updateDefect(defect)
                      }
                      className="shrink-0 rounded-control border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors duration-fast hover:border-brand/50 hover:bg-muted"
                    >
                      {defect.status === 'open'
                        ? 'Resolve in simulation'
                        : 'Reopen in simulation'}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-surface border border-border/60 bg-surface/50 p-3">
          <p className="text-xs text-muted-foreground">
            UAT evidence
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {stats.uatPassed}/{stats.requirements}{' '}
            requirements
          </p>
        </article>

        <article className="rounded-surface border border-border/60 bg-surface/50 p-3">
          <p className="text-xs text-muted-foreground">
            Workflow surfaces
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {stats.workflowSurfaces}
          </p>
        </article>

        <article className="rounded-surface border border-border/60 bg-surface/50 p-3">
          <p className="text-xs text-muted-foreground">
            Traceability
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {stats.mappedRequirements}/
            {stats.requirements} mapped
          </p>
        </article>

        <article className="rounded-surface border border-border/60 bg-surface/50 p-3">
          <p className="text-xs text-muted-foreground">
            Playwright run
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {stats.playwrightPassed}/
            {stats.playwrightTests} passing
          </p>
        </article>
      </div>

      <div
        aria-live="polite"
        className="border-t border-border/60 pt-4 text-xs text-muted-foreground"
      >
        {status}
      </div>
    </div>
  );
}
