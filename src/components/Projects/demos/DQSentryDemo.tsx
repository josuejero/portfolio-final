'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  DQ_ARTIFACTS,
  DQ_SCENARIOS,
  runValidationScenario,
  type DQValidationCheck,
} from './dqsentry/model';

const PIPELINE_STAGES = [
  'Ingest',
  'Profile',
  'Validate + score',
  'Publish',
] as const;

const EVIDENCE_METRICS = [
  {
    label: 'Validation checks',
    value: '27',
  },
  {
    label: 'Recorded score',
    value: '98.22',
  },
  {
    label: 'Failed checks',
    value: '5',
  },
  {
    label: 'Review artifacts',
    value: '14',
  },
] as const;

function statusClass(
  status: DQValidationCheck['status'],
): string {
  return status === 'passed'
    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    : 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300';
}

export default function DQSentryDemo() {
  const [scenarioId, setScenarioId] =
    useState(DQ_SCENARIOS[0].id);

  const [result, setResult] = useState(
    () =>
      runValidationScenario(
        DQ_SCENARIOS[0].id,
      ),
  );

  const [selectedCheckId, setSelectedCheckId] =
    useState(
      result.failedChecks[0]?.id ??
        result.scenario.checks[0].id,
    );

  const [status, setStatus] = useState(
    'Recorded-shape representative fixture loaded.',
  );

  const selectedScenario = useMemo(
    () =>
      DQ_SCENARIOS.find(
        (scenario) =>
          scenario.id === scenarioId,
      ) ?? DQ_SCENARIOS[0],
    [scenarioId],
  );

  const selectedCheck = useMemo(
    () =>
      result.scenario.checks.find(
        (check) =>
          check.id === selectedCheckId,
      ) ?? result.scenario.checks[0],
    [result, selectedCheckId],
  );

  const runValidation = () => {
    const next = runValidationScenario(
      scenarioId,
    );

    setResult(next);
    setSelectedCheckId(
      next.failedChecks[0]?.id ??
        next.scenario.checks[0].id,
    );
    setStatus(
      `Validation finished: ${next.failedChecks.length} failed check${next.failedChecks.length === 1 ? '' : 's'}, score ${next.score.toFixed(2)}.`,
    );
  };

  const resetDemo = () => {
    const first = DQ_SCENARIOS[0];
    const next = runValidationScenario(first.id);

    setScenarioId(first.id);
    setResult(next);
    setSelectedCheckId(
      next.failedChecks[0]?.id ??
        next.scenario.checks[0].id,
    );
    setStatus(
      'Recorded-shape representative fixture reset.',
    );
  };

  return (
    <div className="space-y-5 rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Data-quality validation workspace
          </p>

          <p className="text-sm leading-6 text-muted-foreground">
            Run representative CSV-quality scenarios
            through the same high-level DQSentry flow:
            ingest, profile, validate and score, then
            publish review artifacts. The browser model
            uses DQSentry&apos;s documented score formula,
            quality-gate thresholds, dataset names, and
            issue-lifecycle vocabulary.
          </p>
        </div>

        <button
          type="button"
          onClick={resetDemo}
          className="inline-flex shrink-0 items-center justify-center rounded-control border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors duration-fast hover:border-brand/50 hover:bg-muted"
        >
          Reset workspace
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {EVIDENCE_METRICS.map(
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
        The values above are repository-recorded project
        evidence. Check names and row values inside this
        embedded workspace are representative portfolio
        fixtures, not copied production or source data.
      </p>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <aside className="space-y-4 rounded-surface border border-border/60 bg-surface/50 p-4">
          <div className="space-y-2">
            <label
              htmlFor="dqsentry-scenario"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Synthetic validation run
            </label>

            <select
              id="dqsentry-scenario"
              value={scenarioId}
              onChange={(event) => {
                setScenarioId(
                  event.target.value,
                );
                setStatus(
                  'Scenario changed. Run validation to apply it.',
                );
              }}
              className="w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand"
            >
              {DQ_SCENARIOS.map(
                (scenario) => (
                  <option
                    key={scenario.id}
                    value={scenario.id}
                  >
                    {scenario.label}
                  </option>
                ),
              )}
            </select>

            <p className="text-xs leading-5 text-muted-foreground">
              {selectedScenario.description}
            </p>
          </div>

          <button
            type="button"
            onClick={runValidation}
            className="w-full rounded-control bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
          >
            Run validation
          </button>

          <div className="space-y-2 border-t border-border/60 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Pipeline
            </p>

            <ol className="space-y-2">
              {PIPELINE_STAGES.map(
                (stage, index) => (
                  <li
                    key={stage}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-xs font-semibold text-brand">
                      {index + 1}
                    </span>
                    <span className="text-foreground">
                      {stage}
                    </span>
                  </li>
                ),
              )}
            </ol>
          </div>

          <div className="space-y-2 border-t border-border/60 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Default quality gate
            </p>
            <p className="text-sm leading-6 text-foreground">
              Score ≥ {result.gate.scoreThreshold} and no
              failed severity-
              {result.gate.blockingSeverity}-or-higher
              checks.
            </p>
          </div>
        </aside>

        <div className="space-y-5">
          <section className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-surface border border-border/60 bg-surface/60 p-4">
              <p className="text-xs text-muted-foreground">
                Quality score
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {result.score.toFixed(2)}
              </p>
            </article>

            <article className="rounded-surface border border-border/60 bg-surface/60 p-4">
              <p className="text-xs text-muted-foreground">
                Failed checks
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {result.failedChecks.length}
                <span className="text-sm font-normal text-muted-foreground">
                  {' '}/ {result.scenario.checks.length}
                </span>
              </p>
            </article>

            <article className="rounded-surface border border-border/60 bg-surface/60 p-4">
              <p className="text-xs text-muted-foreground">
                Quality gate
              </p>
              <p
                className={`mt-1 text-2xl font-semibold ${
                  result.gate.passed
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-destructive'
                }`}
              >
                {result.gate.passed
                  ? 'Pass'
                  : 'Block'}
              </p>
            </article>
          </section>

          <section className="rounded-surface border border-border/60 bg-surface/50 p-4">
            <div className="flex flex-col gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Scoring trace
                </p>
                <p className="mt-1 text-sm text-foreground">
                  baseline − 100 × normalized penalty
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                {result.totalPenalty.toFixed(2)} penalty /
                {' '}
                {result.totalWeight.toFixed(2)} weight =
                {' '}
                {result.normalizedPenalty.toFixed(4)}
              </p>
            </div>

            {!result.gate.passed && (
              <div className="mt-4 rounded-control border border-destructive/30 bg-destructive/10 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
                  Gate reasons
                </p>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {result.gate.reasons.map(
                    (reason) => (
                      <li key={reason}>• {reason}</li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Validation checks
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  Review failed checks first
                </h3>
              </div>

              <p className="text-xs text-muted-foreground">
                {result.scenario.checks.length} total
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {result.scenario.checks
                .filter(
                  (check, index) =>
                    check.status === 'failed' ||
                    index < 3,
                )
                .map((check) => (
                  <button
                    key={check.id}
                    type="button"
                    onClick={() =>
                      setSelectedCheckId(check.id)
                    }
                    className={`rounded-surface border p-3 text-left transition-colors duration-fast ${
                      selectedCheck?.id === check.id
                        ? 'border-brand bg-brand/5'
                        : 'border-border/60 bg-surface/60 hover:border-brand/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {check.label}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {check.dataset} · severity
                          {' '}
                          {check.severity}
                        </p>
                      </div>

                      <span
                        className={`rounded-pill border px-2 py-1 text-[11px] font-semibold ${statusClass(check.status)}`}
                      >
                        {check.status}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </section>

          {selectedCheck && (
            <section className="rounded-surface border border-border/60 bg-surface/50 p-4">
              <div className="flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Check inspector
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {selectedCheck.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {selectedCheck.id} ·
                    {' '}
                    {selectedCheck.dataset} · severity
                    {' '}
                    {selectedCheck.severity}
                  </p>
                </div>

                {selectedCheck.lifecycle && (
                  <span className="w-fit rounded-pill border border-border/60 bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground">
                    lifecycle: {selectedCheck.lifecycle}
                  </span>
                )}
              </div>

              {selectedCheck.status === 'passed' ? (
                <p className="pt-4 text-sm leading-6 text-muted-foreground">
                  This representative check passed and
                  produced no issue preview.
                </p>
              ) : (
                <div className="grid gap-4 pt-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Root cause
                      </p>
                      <p className="mt-1 text-sm leading-6 text-foreground">
                        {selectedCheck.rootCause}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Recommended fix
                      </p>
                      <p className="mt-1 text-sm leading-6 text-foreground">
                        {selectedCheck.recommendedFix}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Representative issue rows
                    </p>

                    <div className="mt-2 space-y-2">
                      {selectedCheck.previewRows?.map(
                        (row) => (
                          <article
                            key={row.id}
                            className="rounded-control border border-border/60 bg-background/70 p-3"
                          >
                            <p className="text-xs font-semibold text-foreground">
                              {row.id}
                            </p>
                            <dl className="mt-2 space-y-1">
                              {row.values.map(
                                (value) => (
                                  <div
                                    key={value.field}
                                    className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-2 text-xs"
                                  >
                                    <dt className="text-muted-foreground">
                                      {value.field}
                                    </dt>
                                    <dd className="break-words text-foreground">
                                      {value.value}
                                    </dd>
                                  </div>
                                ),
                              )}
                            </dl>
                          </article>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          <section className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Publishable outputs
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                Review artifacts
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {DQ_ARTIFACTS.map(
                (artifact) => (
                  <article
                    key={artifact.label}
                    className="rounded-surface border border-border/60 bg-surface/60 p-3"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {artifact.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {artifact.description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </section>
        </div>
      </div>

      <div
        aria-live="polite"
        className="border-t border-border/60 pt-4 text-xs text-muted-foreground"
      >
        {status} Changes stay inside this browser
        simulation.
      </div>
    </div>
  );
}
