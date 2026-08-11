'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  BOTMEDIC_COMMANDS,
  INITIAL_TELEMETRY,
  recordTelemetry,
  REPRESENTATIVE_INCIDENTS,
  runBotMedicCommand,
  summarizeTelemetry,
  type BotMedicCommandName,
  type BotMedicTelemetryEntry,
} from './botmedic/model';

const EVIDENCE_METRICS = [
  {
    label: 'Slash commands',
    value: '6',
  },
  {
    label: 'Diagnostic rule cases',
    value: '10',
  },
  {
    label: 'Generated runbooks',
    value: '10',
  },
  {
    label: 'Automated tests',
    value: '28',
  },
] as const;

function cloneTelemetry(): BotMedicTelemetryEntry[] {
  return INITIAL_TELEMETRY.map(
    (entry) => ({ ...entry }),
  );
}

function simulatedDuration(
  command: BotMedicCommandName,
): number {
  switch (command) {
    case 'health':
      return 82;
    case 'envcheck':
      return 96;
    case 'permissions':
      return 104;
    case 'latency':
      return 118;
    case 'helpme':
      return 91;
    case 'incident':
      return 136;
  }
}

export default function BotMedicDemo() {
  const [commandName, setCommandName] =
    useState<BotMedicCommandName>('incident');

  const [scenarioId, setScenarioId] =
    useState(
      REPRESENTATIVE_INCIDENTS[0].id,
    );

  const [telemetry, setTelemetry] =
    useState<BotMedicTelemetryEntry[]>(
      cloneTelemetry,
    );

  const [result, setResult] = useState(
    () =>
      runBotMedicCommand(
        'incident',
        REPRESENTATIVE_INCIDENTS[0].id,
      ),
  );

  const [status, setStatus] = useState(
    'Representative incident fixture loaded.',
  );

  const selectedCommand = useMemo(
    () =>
      BOTMEDIC_COMMANDS.find(
        (command) =>
          command.name === commandName,
      ) ?? BOTMEDIC_COMMANDS[0],
    [commandName],
  );

  const selectedScenario = useMemo(
    () =>
      REPRESENTATIVE_INCIDENTS.find(
        (scenario) =>
          scenario.id === scenarioId,
      ) ?? REPRESENTATIVE_INCIDENTS[0],
    [scenarioId],
  );

  const telemetrySummary = useMemo(
    () => summarizeTelemetry(telemetry),
    [telemetry],
  );

  const runCommand = () => {
    const nextResult = runBotMedicCommand(
      commandName,
      scenarioId,
    );

    setResult(nextResult);

    setTelemetry((current) =>
      recordTelemetry(current, {
        id: `telemetry-${Date.now()}`,
        command: commandName,
        outcome:
          commandName === 'incident'
            ? 'diagnosed'
            : 'ok',
        durationMs:
          simulatedDuration(commandName),
        timestamp: 'Just now',
        ...(commandName === 'incident'
          ? { scenarioId }
          : {}),
      }),
    );

    setStatus(
      `${selectedCommand.label} completed in the browser simulation.`,
    );
  };

  const resetDemo = () => {
    const firstScenario =
      REPRESENTATIVE_INCIDENTS[0];

    setCommandName('incident');
    setScenarioId(firstScenario.id);
    setTelemetry(cloneTelemetry());
    setResult(
      runBotMedicCommand(
        'incident',
        firstScenario.id,
      ),
    );
    setStatus(
      'Representative incident fixture reset.',
    );
  };

  return (
    <div className="space-y-5 rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Incident-triage console
          </p>

          <p className="text-sm leading-6 text-muted-foreground">
            Run BotMedic&apos;s documented command
            surfaces against a compact browser-only
            support simulation. The real project routes
            Discord interactions through a Cloudflare
            Worker, shared command and rule packages,
            incident fixtures, Workers KV telemetry, and
            generated companion documentation.
          </p>
        </div>

        <button
          type="button"
          onClick={resetDemo}
          className="inline-flex shrink-0 items-center justify-center rounded-control border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors duration-fast hover:border-brand/50 hover:bg-muted"
        >
          Reset console
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
        Repository evidence records 28/28 passing tests,
        76.68% line coverage, and 85.71% function
        coverage. Those metrics describe BotMedic&apos;s
        recorded project snapshot, not this embedded
        simulator.
      </p>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <section
          aria-labelledby="botmedic-command-heading"
          className="space-y-3"
        >
          <div>
            <h3
              id="botmedic-command-heading"
              className="text-sm font-semibold text-foreground"
            >
              Slash command surface
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Choose one of the six commands documented
              by the real project.
            </p>
          </div>

          <div
            className="space-y-2"
            role="group"
            aria-label="BotMedic command"
          >
            {BOTMEDIC_COMMANDS.map(
              (command) => {
                const active =
                  command.name === commandName;

                return (
                  <button
                    key={command.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setCommandName(command.name);
                      setStatus(
                        `Selected ${command.label}.`,
                      );
                    }}
                    className={`w-full rounded-surface border p-3 text-left transition-colors duration-fast ${
                      active
                        ? 'border-brand bg-brand/10'
                        : 'border-border/60 bg-surface/60 hover:border-brand/40'
                    }`}
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {command.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {command.description}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </section>

        <section
          aria-labelledby="botmedic-workspace-heading"
          className="space-y-4"
        >
          <div className="rounded-surface border border-border/60 bg-surface/60 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <div>
                  <h3
                    id="botmedic-workspace-heading"
                    className="text-sm font-semibold text-foreground"
                  >
                    Command runner
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {selectedCommand.description}
                  </p>
                </div>

                {commandName === 'incident' && (
                  <label className="block space-y-1.5 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Representative incident fixture
                    </span>
                    <select
                      value={scenarioId}
                      onChange={(event) => {
                        setScenarioId(
                          event.target.value,
                        );
                        setStatus(
                          'Representative incident fixture changed.',
                        );
                      }}
                      className="w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors duration-fast focus:border-brand"
                    >
                      {REPRESENTATIVE_INCIDENTS.map(
                        (scenario) => (
                          <option
                            key={scenario.id}
                            value={scenario.id}
                          >
                            {scenario.title}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                )}
              </div>

              <button
                type="button"
                onClick={runCommand}
                className="shrink-0 rounded-control bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
              >
                Run {selectedCommand.label}
              </button>
            </div>
          </div>

          {commandName === 'incident' && (
            <article className="rounded-surface border border-border/60 bg-card/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                    Selected symptom
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {selectedScenario.title}
                  </p>
                </div>
                <span className="rounded-pill border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                  {selectedScenario.severity} severity
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {selectedScenario.symptom}
              </p>
            </article>
          )}

          <article
            aria-live="polite"
            className="space-y-4 rounded-surface border border-brand/30 bg-brand/5 p-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                Simulated response
              </p>
              <h4 className="mt-1 text-base font-semibold text-foreground">
                {result.heading}
              </h4>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {result.summary}
              </p>
            </div>

            <ul className="space-y-2">
              {result.details.map(
                (detail) => (
                  <li
                    key={detail}
                    className="rounded-control border border-border/60 bg-surface/60 px-3 py-2 text-xs leading-5 text-muted-foreground"
                  >
                    {detail}
                  </li>
                ),
              )}
            </ul>

            {result.diagnostic && (
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="rounded-surface border border-border/60 bg-card/60 p-3">
                  <p className="text-xs font-semibold text-foreground">
                    Matched rule
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-brand">
                    {result.diagnostic.matchedRule}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-foreground">
                    Runbook
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {result.diagnostic.runbook}
                  </p>
                </div>

                <div className="rounded-surface border border-border/60 bg-card/60 p-3">
                  <p className="text-xs font-semibold text-foreground">
                    Recovery sequence
                  </p>
                  <ol className="mt-2 space-y-1.5 text-xs leading-5 text-muted-foreground">
                    {result.diagnostic.recoverySteps.map(
                      (step, index) => (
                        <li key={step}>
                          {index + 1}. {step}
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              </div>
            )}
          </article>
        </section>
      </div>

      <section
        aria-labelledby="botmedic-telemetry-heading"
        className="space-y-3 border-t border-border/60 pt-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3
              id="botmedic-telemetry-heading"
              className="text-sm font-semibold text-foreground"
            >
              Browser telemetry
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
              The real worker records telemetry through
              Workers KV and renders dashboard data.
              These entries exist only in local component
              state and demonstrate the observability
              flow.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-pill border border-border px-2.5 py-1">
              {telemetrySummary.total} runs
            </span>
            <span className="rounded-pill border border-border px-2.5 py-1">
              {telemetrySummary.diagnosed} diagnosed
            </span>
            <span className="rounded-pill border border-border px-2.5 py-1">
              {telemetrySummary.averageDurationMs} ms avg
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-surface border border-border/60">
          <table className="w-full min-w-[560px] text-left text-xs">
            <thead className="bg-surface/80 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">
                  Command
                </th>
                <th className="px-3 py-2 font-medium">
                  Outcome
                </th>
                <th className="px-3 py-2 font-medium">
                  Duration
                </th>
                <th className="px-3 py-2 font-medium">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {telemetry
                .slice(0, 6)
                .map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-t border-border/60"
                  >
                    <td className="px-3 py-2 font-mono text-foreground">
                      /{entry.command}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {entry.outcome}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {entry.durationMs} ms
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {entry.timestamp}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="rounded-surface border border-border/60 bg-surface/50 p-4 text-xs leading-5 text-muted-foreground">
        <span className="font-semibold text-foreground">
          Source-of-truth design:
        </span>{' '}
        BotMedic&apos;s real companion site is generated
        from shared command and rule packages, while
        incident fixtures also feed diagnostics and tests.
        The four scenarios embedded here are deliberately
        representative portfolio fixtures, not a claim
        that they reproduce all ten repository rule cases
        verbatim.
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
