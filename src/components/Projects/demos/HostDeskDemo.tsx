'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  addNoteActivity,
  completeCadenceTask,
  getHandoffGate,
  INITIAL_ACTIVITIES,
  INITIAL_PROSPECTS,
  INITIAL_TASKS,
  moveProspectToHandoff,
  QUEUE_LABELS,
  type HostDeskActivity,
  type HostDeskCadenceTask,
  type HostDeskProspect,
  type HostDeskQueueSlice,
} from './hostdesk/model';

type QueueFilter =
  | 'all'
  | HostDeskQueueSlice;

const QUEUE_FILTERS: readonly QueueFilter[] = [
  'all',
  'new-lead',
  'first-touch',
  'follow-up-due',
  'stale',
  'research-needed',
  'meeting-booked',
  'handoff-ready',
  'nurture-disqualified',
];

const EVIDENCE_METRICS = [
  {
    label: 'API routes',
    value: '17',
  },
  {
    label: 'MySQL tables',
    value: '7',
  },
  {
    label: 'Executable tests',
    value: '32',
  },
  {
    label: 'Line coverage',
    value: '71.36%',
  },
] as const;

function cloneProspects(): HostDeskProspect[] {
  return INITIAL_PROSPECTS.map(
    (prospect) => ({
      ...prospect,
    }),
  );
}

function cloneTasks(): HostDeskCadenceTask[] {
  return INITIAL_TASKS.map(
    (task) => ({
      ...task,
    }),
  );
}

function cloneActivities(): HostDeskActivity[] {
  return INITIAL_ACTIVITIES.map(
    (activity) => ({
      ...activity,
    }),
  );
}

function queueLabel(
  queue: QueueFilter,
): string {
  return queue === 'all'
    ? 'All'
    : QUEUE_LABELS[queue];
}

export default function HostDeskDemo() {
  const [prospects, setProspects] =
    useState<HostDeskProspect[]>(
      cloneProspects,
    );

  const [tasks, setTasks] =
    useState<HostDeskCadenceTask[]>(
      cloneTasks,
    );

  const [activities, setActivities] =
    useState<HostDeskActivity[]>(
      cloneActivities,
    );

  const [activeProspectId, setActiveProspectId] =
    useState(INITIAL_PROSPECTS[0].id);

  const [filter, setFilter] =
    useState<QueueFilter>('all');

  const [noteDraft, setNoteDraft] =
    useState('');

  const [status, setStatus] = useState(
    'Seeded portfolio workspace loaded.',
  );

  const activeProspect = useMemo(
    () =>
      prospects.find(
        (prospect) =>
          prospect.id ===
          activeProspectId,
      ) ?? prospects[0],
    [activeProspectId, prospects],
  );

  const visibleProspects = useMemo(
    () =>
      filter === 'all'
        ? prospects
        : prospects.filter(
            (prospect) =>
              prospect.queue === filter,
          ),
    [filter, prospects],
  );

  const activeTasks = useMemo(
    () =>
      activeProspect
        ? tasks.filter(
            (task) =>
              task.prospectId ===
              activeProspect.id,
          )
        : [],
    [activeProspect, tasks],
  );

  const activeActivities = useMemo(
    () =>
      activeProspect
        ? activities.filter(
            (activity) =>
              activity.prospectId ===
              activeProspect.id,
          )
        : [],
    [activeProspect, activities],
  );

  const handoffGate = useMemo(
    () =>
      activeProspect
        ? getHandoffGate(
            activeProspect.id,
            tasks,
            activities,
          )
        : null,
    [activeProspect, activities, tasks],
  );

  const selectProspect = (
    prospectId: string,
  ) => {
    setActiveProspectId(prospectId);
    setNoteDraft('');

    const prospect = prospects.find(
      (candidate) =>
        candidate.id === prospectId,
    );

    if (prospect) {
      setStatus(
        `Loaded ${prospect.company}.`,
      );
    }
  };

  const logNote = () => {
    if (!activeProspect) {
      return;
    }

    const note = noteDraft.trim();

    if (!note) {
      setStatus(
        'Enter a note before logging activity.',
      );
      return;
    }

    setActivities((current) =>
      addNoteActivity(
        current,
        {
          id: `note-${Date.now()}`,
          prospectId:
            activeProspect.id,
          note,
          timestamp: 'Just now',
        },
      ),
    );

    setNoteDraft('');
    setStatus(
      `Logged a note for ${activeProspect.company}.`,
    );
  };

  const markTaskComplete = (
    task: HostDeskCadenceTask,
  ) => {
    if (task.completed) {
      return;
    }

    setTasks((current) =>
      completeCadenceTask(
        current,
        task.id,
      ),
    );

    setActivities((current) => [
      {
        id: `task-${task.id}-${Date.now()}`,
        prospectId: task.prospectId,
        type: 'task',
        label: 'Cadence task completed',
        detail: task.label,
        timestamp: 'Just now',
      },
      ...current,
    ]);

    setStatus(
      `Completed "${task.label}".`,
    );
  };

  const attemptHandoff = () => {
    if (
      !activeProspect ||
      !handoffGate
    ) {
      return;
    }

    if (!handoffGate.allowed) {
      setStatus(handoffGate.reason);
      return;
    }

    if (
      activeProspect.queue ===
      'handoff-ready'
    ) {
      setStatus(
        `${activeProspect.company} is already handoff ready.`,
      );
      return;
    }

    setProspects((current) =>
      moveProspectToHandoff(
        current,
        activeProspect.id,
        handoffGate,
      ),
    );

    setActivities((current) => [
      {
        id: `transition-${Date.now()}`,
        prospectId:
          activeProspect.id,
        type: 'transition',
        label: 'Moved to handoff ready',
        detail:
          'Representative portfolio gate passed after note and cadence evidence were present.',
        timestamp: 'Just now',
      },
      ...current,
    ]);

    setStatus(
      `${activeProspect.company} moved to handoff ready.`,
    );
  };

  const resetDemo = () => {
    setProspects(cloneProspects());
    setTasks(cloneTasks());
    setActivities(cloneActivities());
    setActiveProspectId(
      INITIAL_PROSPECTS[0].id,
    );
    setFilter('all');
    setNoteDraft('');
    setStatus(
      'Seeded portfolio workspace reset.',
    );
  };

  return (
    <div className="space-y-5 rounded-panel border border-border/60 bg-card/60 p-5 shadow-soft">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Seeded portfolio workspace
          </p>

          <p className="text-sm leading-6 text-muted-foreground">
            Work a compact prospect queue using
            browser-only state. The interaction mirrors
            HostDesk concepts such as queue slices,
            notes, cadence tasks, activity history, and
            gated workflow motion without connecting to
            the production-style PHP/MySQL runtime.
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
        Evidence snapshot: Lighthouse recorded 100
        performance, 100 accessibility, and 96 best
        practices. These metrics describe the real
        HostDesk repository snapshot, not this embedded
        simulator.
      </p>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Prospect queue filter"
      >
        {QUEUE_FILTERS.map(
          (queue) => {
            const active =
              filter === queue;

            const count =
              queue === 'all'
                ? prospects.length
                : prospects.filter(
                    (prospect) =>
                      prospect.queue ===
                      queue,
                  ).length;

            return (
              <button
                key={queue}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setFilter(queue)
                }
                className={`rounded-control border px-3 py-2 text-xs font-medium transition-colors duration-fast ${
                  active
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-border bg-surface text-muted-foreground hover:text-foreground'
                }`}
              >
                {queueLabel(queue)} · {count}
              </button>
            );
          },
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <section
          aria-labelledby="hostdesk-queue-heading"
          className="space-y-3"
        >
          <div>
            <h3
              id="hostdesk-queue-heading"
              className="text-sm font-semibold text-foreground"
            >
              Prospect queue
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a seeded record to work.
            </p>
          </div>

          <div className="space-y-2">
            {visibleProspects.length ===
            0 ? (
              <p className="rounded-surface border border-dashed border-border p-4 text-xs text-muted-foreground">
                No seeded prospects are in this queue
                slice yet.
              </p>
            ) : (
              visibleProspects.map(
                (prospect) => {
                  const selected =
                    prospect.id ===
                    activeProspect?.id;

                  return (
                    <button
                      key={prospect.id}
                      type="button"
                      aria-pressed={
                        selected
                      }
                      onClick={() =>
                        selectProspect(
                          prospect.id,
                        )
                      }
                      className={`w-full rounded-surface border p-4 text-left transition-colors duration-fast ${
                        selected
                          ? 'border-brand bg-brand/10'
                          : 'border-border/60 bg-surface/60 hover:border-brand/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {
                              prospect.company
                            }
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {
                              prospect.contactName
                            }{' '}
                            · {prospect.role}
                          </p>
                        </div>

                        <span className="rounded-pill border border-border/60 px-2 py-1 text-[11px] font-medium text-muted-foreground">
                          {
                            prospect.fitScore
                          }
                          /100
                        </span>
                      </div>

                      <p className="mt-3 text-xs font-medium text-brand">
                        {
                          QUEUE_LABELS[
                            prospect
                              .queue
                          ]
                        }
                      </p>
                    </button>
                  );
                },
              )
            )}
          </div>
        </section>

        {activeProspect && (
          <section
            aria-labelledby="hostdesk-prospect-heading"
            className="space-y-5 rounded-surface border border-border/60 bg-surface/50 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {
                    QUEUE_LABELS[
                      activeProspect
                        .queue
                    ]
                  }
                </p>

                <h3
                  id="hostdesk-prospect-heading"
                  className="mt-1 text-xl font-semibold tracking-tight text-foreground"
                >
                  {activeProspect.company}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {
                    activeProspect.contactName
                  }{' '}
                  · {activeProspect.role}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                <span className="rounded-pill border border-border/60 px-2.5 py-1">
                  {
                    activeProspect.region
                  }
                </span>
                <span className="rounded-pill border border-border/60 px-2.5 py-1">
                  {
                    activeProspect.segment
                  }
                </span>
                <span className="rounded-pill border border-border/60 px-2.5 py-1">
                  Fit{' '}
                  {
                    activeProspect.fitScore
                  }
                  /100
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-surface border border-border/60 bg-card/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Qualification context
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/90">
                  {
                    activeProspect.summary
                  }
                </p>
              </article>

              <article className="rounded-surface border border-border/60 bg-card/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Next best action
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/90">
                  {
                    activeProspect.nextAction
                  }
                </p>
              </article>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="space-y-3 rounded-surface border border-border/60 bg-card/60 p-4">
                <div>
                  <label
                    htmlFor="hostdesk-note"
                    className="text-sm font-semibold text-foreground"
                  >
                    Activity note
                  </label>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Notes are appended to
                    this browser-only activity
                    history.
                  </p>
                </div>

                <textarea
                  id="hostdesk-note"
                  value={noteDraft}
                  onChange={(event) =>
                    setNoteDraft(
                      event.target.value,
                    )
                  }
                  rows={4}
                  maxLength={300}
                  placeholder="Capture research, outreach, or meeting context..."
                  className="w-full resize-y rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors duration-fast placeholder:text-muted-foreground focus:border-brand"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-muted-foreground">
                    {
                      noteDraft.length
                    }
                    /300
                  </span>

                  <button
                    type="button"
                    onClick={logNote}
                    className="rounded-control bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
                  >
                    Log note
                  </button>
                </div>
              </article>

              <article className="space-y-3 rounded-surface border border-border/60 bg-card/60 p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Cadence tasks
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    HostDesk persists
                    follow-up tasks and task
                    completion in the real
                    application.
                  </p>
                </div>

                {activeTasks.length ===
                0 ? (
                  <p className="text-xs text-muted-foreground">
                    No seeded cadence tasks
                    for this record.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {activeTasks.map(
                      (task) => (
                        <li
                          key={task.id}
                          className="flex items-center justify-between gap-3 rounded-control border border-border/60 bg-surface/60 p-3"
                        >
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              {
                                task.label
                              }
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {
                                task.completed
                                  ? 'Completed'
                                  : task.due
                              }
                            </p>
                          </div>

                          <button
                            type="button"
                            disabled={
                              task.completed
                            }
                            onClick={() =>
                              markTaskComplete(
                                task,
                              )
                            }
                            className="rounded-control border border-border px-2.5 py-1.5 text-[11px] font-semibold text-foreground transition-colors duration-fast hover:border-brand/50 disabled:cursor-default disabled:opacity-50"
                          >
                            {
                              task.completed
                                ? 'Done'
                                : 'Complete'
                            }
                          </button>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </article>
            </div>

            {handoffGate && (
              <article className="rounded-surface border border-brand/30 bg-brand/5 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Representative
                        handoff gate
                      </p>
                      <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                        This embedded demo
                        intentionally uses a
                        simplified portfolio
                        rule: one note and one
                        completed cadence task
                        are required before
                        handoff. HostDesk itself
                        enforces stage-gated
                        motion in both frontend
                        and backend, but this is
                        not presented as a
                        verbatim production
                        prerequisite.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span
                        className={`rounded-pill border px-2.5 py-1 ${
                          handoffGate.noteLogged
                            ? 'border-brand/40 bg-brand/10 text-brand'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {
                          handoffGate.noteLogged
                            ? '✓'
                            : '○'
                        }{' '}
                        Note logged
                      </span>

                      <span
                        className={`rounded-pill border px-2.5 py-1 ${
                          handoffGate.cadenceCompleted
                            ? 'border-brand/40 bg-brand/10 text-brand'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {
                          handoffGate.cadenceCompleted
                            ? '✓'
                            : '○'
                        }{' '}
                        Cadence completed
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={
                      attemptHandoff
                    }
                    className="shrink-0 rounded-control bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
                  >
                    Attempt handoff
                    transition
                  </button>
                </div>
              </article>
            )}

            <article className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Activity history
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  New notes, completed
                  tasks, and successful
                  transitions appear here.
                </p>
              </div>

              {activeActivities.length ===
              0 ? (
                <p className="rounded-surface border border-dashed border-border p-4 text-xs text-muted-foreground">
                  No activity has been
                  recorded for this seeded
                  prospect yet.
                </p>
              ) : (
                <ol className="space-y-2">
                  {activeActivities
                    .slice(0, 6)
                    .map(
                      (activity) => (
                        <li
                          key={
                            activity.id
                          }
                          className="rounded-surface border border-border/60 bg-card/50 p-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-foreground">
                              {
                                activity.label
                              }
                            </p>
                            <span className="text-[11px] text-muted-foreground">
                              {
                                activity.timestamp
                              }
                            </span>
                          </div>

                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {
                              activity.detail
                            }
                          </p>
                        </li>
                      ),
                    )}
                </ol>
              )}
            </article>
          </section>
        )}
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
