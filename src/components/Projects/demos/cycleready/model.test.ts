import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  INITIAL_CYCLEREADY_DEFECTS,
  evaluateRelease,
  getDefectsForRequirement,
  getRequirementsForFilter,
  getTraceabilityStats,
  setDefectStatus,
} from './model';

describe('CycleReady demo model', () => {
  it('preserves the recorded traceability and manual QA shape', () => {
    const stats = getTraceabilityStats();

    expect(stats.requirements).toBe(15);
    expect(stats.mappedRequirements).toBe(15);
    expect(stats.manualCases).toBe(25);
  });

  it('preserves the recorded automation shape', () => {
    const stats = getTraceabilityStats();

    expect(stats.playwrightTests).toBe(27);
    expect(stats.playwrightPassed).toBe(27);
    expect(stats.automatedRequirements).toBe(13);
  });

  it('keeps UAT evidence mapped across all requirements', () => {
    expect(getTraceabilityStats().uatPassed).toBe(15);
  });

  it('spans the recorded eight workflow surfaces', () => {
    expect(getTraceabilityStats().workflowSurfaces).toBe(8);
  });

  it('reproduces the recorded no-go blocker counts', () => {
    const decision = evaluateRelease(
      INITIAL_CYCLEREADY_DEFECTS,
    );

    expect(decision.decision).toBe('no-go');
    expect(decision.openSev1).toBe(1);
    expect(decision.openSev2).toBe(2);
  });

  it('stays no-go while any representative blocker remains open', () => {
    const defects = INITIAL_CYCLEREADY_DEFECTS.map(
      (defect, index) => ({
        ...defect,
        status:
          index === 0
            ? ('resolved' as const)
            : defect.status,
      }),
    );

    expect(evaluateRelease(defects).decision).toBe(
      'no-go',
    );
  });

  it('turns go after every representative Sev1 and Sev2 blocker is resolved', () => {
    const defects = INITIAL_CYCLEREADY_DEFECTS.map(
      (defect) => ({
        ...defect,
        status: 'resolved' as const,
      }),
    );

    expect(evaluateRelease(defects)).toMatchObject({
      decision: 'go',
      openSev1: 0,
      openSev2: 0,
    });
  });

  it('filters manual-only and blocked requirements without mutating the seed', () => {
    const original = INITIAL_CYCLEREADY_DEFECTS[0];
    const updated = setDefectStatus(
      INITIAL_CYCLEREADY_DEFECTS,
      original.id,
      'resolved',
    );

    expect(
      getRequirementsForFilter(
        'manual-only',
        updated,
      ).map((requirement) => requirement.id),
    ).toEqual(['REQ-14', 'REQ-15']);

    expect(
      getRequirementsForFilter(
        'blockers',
        INITIAL_CYCLEREADY_DEFECTS,
      ).length,
    ).toBeGreaterThan(0);

    expect(
      getDefectsForRequirement(
        'REQ-15',
        INITIAL_CYCLEREADY_DEFECTS,
      ).map((defect) => defect.id),
    ).toEqual(['SIM-DEF-03']);

    expect(original.status).toBe('open');
  });
});
