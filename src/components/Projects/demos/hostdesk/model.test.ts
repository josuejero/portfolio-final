import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  addNoteActivity,
  completeCadenceTask,
  getHandoffGate,
  INITIAL_ACTIVITIES,
  INITIAL_PROSPECTS,
  INITIAL_TASKS,
  moveProspectToHandoff,
  QUEUE_LABELS,
} from './model';

describe('HostDesk demo model', () => {
  it('keeps every seeded task attached to a seeded prospect', () => {
    const prospectIds = new Set(
      INITIAL_PROSPECTS.map(
        (prospect) => prospect.id,
      ),
    );

    for (const task of INITIAL_TASKS) {
      expect(
        prospectIds.has(task.prospectId),
      ).toBe(true);
    }
  });

  it('keeps every seeded activity attached to a seeded prospect', () => {
    const prospectIds = new Set(
      INITIAL_PROSPECTS.map(
        (prospect) => prospect.id,
      ),
    );

    for (const activity of INITIAL_ACTIVITIES) {
      expect(
        prospectIds.has(activity.prospectId),
      ).toBe(true);
    }
  });

  it('labels every queue slice used by seeded prospects', () => {
    for (const prospect of INITIAL_PROSPECTS) {
      expect(
        QUEUE_LABELS[prospect.queue],
      ).toBeTruthy();
    }
  });

  it('blocks the representative handoff gate before prerequisites are complete', () => {
    const gate = getHandoffGate(
      'prospect-harbor',
      INITIAL_TASKS,
      INITIAL_ACTIVITIES,
    );

    expect(gate.allowed).toBe(false);
    expect(gate.noteLogged).toBe(false);
    expect(gate.cadenceCompleted).toBe(false);
    expect(gate.reason).toMatch(
      /portfolio demo gate/i,
    );
  });

  it('allows the representative handoff after a note and completed cadence task', () => {
    const activities = addNoteActivity(
      INITIAL_ACTIVITIES,
      {
        id: 'note-test',
        prospectId: 'prospect-harbor',
        note: 'Meeting recap captured.',
        timestamp: 'Now',
      },
    );

    const tasks = completeCadenceTask(
      INITIAL_TASKS,
      'task-harbor-recap',
    );

    const gate = getHandoffGate(
      'prospect-harbor',
      tasks,
      activities,
    );

    expect(gate.allowed).toBe(true);
    expect(gate.noteLogged).toBe(true);
    expect(gate.cadenceCompleted).toBe(true);
  });

  it('moves a prospect only when the gate allows it', () => {
    const blocked = getHandoffGate(
      'prospect-harbor',
      INITIAL_TASKS,
      INITIAL_ACTIVITIES,
    );

    expect(
      moveProspectToHandoff(
        INITIAL_PROSPECTS,
        'prospect-harbor',
        blocked,
      ).find(
        (prospect) =>
          prospect.id === 'prospect-harbor',
      )?.queue,
    ).toBe('meeting-booked');

    const activities = addNoteActivity(
      INITIAL_ACTIVITIES,
      {
        id: 'note-test',
        prospectId: 'prospect-harbor',
        note: 'Meeting recap captured.',
        timestamp: 'Now',
      },
    );

    const tasks = completeCadenceTask(
      INITIAL_TASKS,
      'task-harbor-recap',
    );

    const allowed = getHandoffGate(
      'prospect-harbor',
      tasks,
      activities,
    );

    expect(
      moveProspectToHandoff(
        INITIAL_PROSPECTS,
        'prospect-harbor',
        allowed,
      ).find(
        (prospect) =>
          prospect.id === 'prospect-harbor',
      )?.queue,
    ).toBe('handoff-ready');
  });

  it('ignores blank notes rather than creating fake activity', () => {
    expect(
      addNoteActivity(
        INITIAL_ACTIVITIES,
        {
          id: 'blank-note',
          prospectId: 'prospect-harbor',
          note: '   ',
          timestamp: 'Now',
        },
      ),
    ).toEqual(INITIAL_ACTIVITIES);
  });
});
