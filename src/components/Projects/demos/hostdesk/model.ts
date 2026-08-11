export type HostDeskQueueSlice =
  | 'new-lead'
  | 'research-needed'
  | 'first-touch'
  | 'follow-up-due'
  | 'stale'
  | 'meeting-booked'
  | 'handoff-ready'
  | 'nurture-disqualified';

export type HostDeskActivityType =
  | 'note'
  | 'task'
  | 'transition';

export interface HostDeskProspect {
  id: string;
  company: string;
  contactName: string;
  role: string;
  region: string;
  segment: string;
  queue: HostDeskQueueSlice;
  fitScore: number;
  summary: string;
  nextAction: string;
}

export interface HostDeskCadenceTask {
  id: string;
  prospectId: string;
  label: string;
  due: string;
  completed: boolean;
}

export interface HostDeskActivity {
  id: string;
  prospectId: string;
  type: HostDeskActivityType;
  label: string;
  detail: string;
  timestamp: string;
}

export interface HandoffGate {
  noteLogged: boolean;
  cadenceCompleted: boolean;
  allowed: boolean;
  reason: string;
}

export const QUEUE_LABELS: Record<
  HostDeskQueueSlice,
  string
> = {
  'new-lead': 'New leads',
  'research-needed': 'Research needed',
  'first-touch': 'First touch',
  'follow-up-due': 'Follow-up due',
  stale: 'Stale',
  'meeting-booked': 'Meeting booked',
  'handoff-ready': 'Handoff ready',
  'nurture-disqualified': 'Nurture / disqualified',
};

export const INITIAL_PROSPECTS:
  readonly HostDeskProspect[] = [
    {
      id: 'prospect-northstar',
      company: 'Northstar Logistics',
      contactName: 'Maya Chen',
      role: 'IT Operations Manager',
      region: 'Northeast',
      segment: 'Mid-market',
      queue: 'research-needed',
      fitScore: 86,
      summary:
        'Growing operations team evaluating a more consistent device and support workflow across multiple locations.',
      nextAction:
        'Confirm environment details and capture the first outreach note.',
    },
    {
      id: 'prospect-cedar',
      company: 'Cedar Health Group',
      contactName: 'Andre Lewis',
      role: 'Systems Administrator',
      region: 'New England',
      segment: 'Commercial',
      queue: 'follow-up-due',
      fitScore: 91,
      summary:
        'Prior conversation established a support-process pain point and a follow-up is due today.',
      nextAction:
        'Complete the due cadence task and record the outcome.',
    },
    {
      id: 'prospect-harbor',
      company: 'Harborline Foods',
      contactName: 'Priya Nair',
      role: 'Technology Director',
      region: 'Mid-Atlantic',
      segment: 'Mid-market',
      queue: 'meeting-booked',
      fitScore: 94,
      summary:
        'Discovery meeting is booked and the record is close to handoff readiness.',
      nextAction:
        'Document meeting context and clear the portfolio handoff gate.',
    },
    {
      id: 'prospect-riverbend',
      company: 'Riverbend Manufacturing',
      contactName: 'Elena Ortiz',
      role: 'Infrastructure Lead',
      region: 'Northeast',
      segment: 'Commercial',
      queue: 'first-touch',
      fitScore: 79,
      summary:
        'Initial qualification is complete and the first-touch workflow is in progress.',
      nextAction:
        'Log outreach activity and schedule the next follow-up.',
    },
  ];

export const INITIAL_TASKS:
  readonly HostDeskCadenceTask[] = [
    {
      id: 'task-northstar-research',
      prospectId: 'prospect-northstar',
      label: 'Review account research',
      due: 'Due today',
      completed: false,
    },
    {
      id: 'task-cedar-followup',
      prospectId: 'prospect-cedar',
      label: 'Send scheduled follow-up',
      due: 'Due today',
      completed: false,
    },
    {
      id: 'task-harbor-recap',
      prospectId: 'prospect-harbor',
      label: 'Complete meeting recap',
      due: 'Due today',
      completed: false,
    },
    {
      id: 'task-riverbend-first-touch',
      prospectId: 'prospect-riverbend',
      label: 'Record first-touch outcome',
      due: 'Tomorrow',
      completed: false,
    },
  ];

export const INITIAL_ACTIVITIES:
  readonly HostDeskActivity[] = [
    {
      id: 'activity-harbor-meeting',
      prospectId: 'prospect-harbor',
      type: 'transition',
      label: 'Meeting booked',
      detail:
        'Workflow moved into the meeting-booked queue slice.',
      timestamp: 'Today · 9:20 AM',
    },
    {
      id: 'activity-cedar-touch',
      prospectId: 'prospect-cedar',
      type: 'task',
      label: 'First touch completed',
      detail:
        'Initial outreach was recorded and a follow-up task was scheduled.',
      timestamp: 'Yesterday · 3:45 PM',
    },
    {
      id: 'activity-riverbend-research',
      prospectId: 'prospect-riverbend',
      type: 'transition',
      label: 'Research completed',
      detail:
        'Research review cleared the record for first-touch work.',
      timestamp: 'Yesterday · 11:10 AM',
    },
  ];

export function getHandoffGate(
  prospectId: string,
  tasks: readonly HostDeskCadenceTask[],
  activities: readonly HostDeskActivity[],
): HandoffGate {
  const noteLogged = activities.some(
    (activity) =>
      activity.prospectId === prospectId &&
      activity.type === 'note',
  );

  const cadenceCompleted = tasks.some(
    (task) =>
      task.prospectId === prospectId &&
      task.completed,
  );

  const allowed =
    noteLogged && cadenceCompleted;

  return {
    noteLogged,
    cadenceCompleted,
    allowed,
    reason: allowed
      ? 'Representative handoff prerequisites are satisfied.'
      : 'Portfolio demo gate: log a note and complete at least one cadence task before moving this record to handoff ready.',
  };
}

export function completeCadenceTask(
  tasks: readonly HostDeskCadenceTask[],
  taskId: string,
): HostDeskCadenceTask[] {
  return tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          completed: true,
        }
      : task,
  );
}

export function addNoteActivity(
  activities: readonly HostDeskActivity[],
  {
    id,
    prospectId,
    note,
    timestamp,
  }: {
    id: string;
    prospectId: string;
    note: string;
    timestamp: string;
  },
): HostDeskActivity[] {
  const trimmed = note.trim();

  if (!trimmed) {
    return [...activities];
  }

  return [
    {
      id,
      prospectId,
      type: 'note',
      label: 'Note added',
      detail: trimmed,
      timestamp,
    },
    ...activities,
  ];
}

export function moveProspectToHandoff(
  prospects: readonly HostDeskProspect[],
  prospectId: string,
  gate: HandoffGate,
): HostDeskProspect[] {
  if (!gate.allowed) {
    return [...prospects];
  }

  return prospects.map((prospect) =>
    prospect.id === prospectId
      ? {
          ...prospect,
          queue: 'handoff-ready',
          nextAction:
            'Review the record for downstream handoff.',
        }
      : prospect,
  );
}
