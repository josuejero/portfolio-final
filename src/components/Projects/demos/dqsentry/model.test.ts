import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  calculateQualityScore,
  DQ_ARTIFACTS,
  DQ_SCENARIOS,
  evaluateQualityGate,
  runValidationScenario,
} from './model';

describe('DQSentry demo model', () => {
  it('reproduces the recorded snapshot shape with representative fixtures', () => {
    const result = runValidationScenario(
      'recorded-shape',
    );

    expect(result.scenario.checks).toHaveLength(27);
    expect(result.failedChecks).toHaveLength(5);
    expect(result.score).toBe(98.22);
  });

  it('applies the documented normalized-penalty score formula', () => {
    expect(
      calculateQualityScore([
        {
          id: 'a',
          label: 'A',
          dataset: 'users',
          severity: 2,
          weight: 75,
          penalty: 3,
          status: 'failed',
        },
        {
          id: 'b',
          label: 'B',
          dataset: 'events',
          severity: 1,
          weight: 25,
          penalty: 0,
          status: 'passed',
        },
      ]).score,
    ).toBe(97);
  });

  it('passes the recorded-shape fixture through the default gate', () => {
    const result = runValidationScenario(
      'recorded-shape',
    );

    expect(result.gate.passed).toBe(true);
    expect(result.gate.reasons).toEqual([]);
  });

  it('blocks a severity-5 failure even when the score remains above threshold', () => {
    const result = runValidationScenario(
      'critical-blocker',
    );

    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.gate.passed).toBe(false);
    expect(result.gate.reasons.join(' ')).toMatch(
      /severity 5/i,
    );
  });

  it('blocks scores below the default threshold independently of severity', () => {
    const gate = evaluateQualityGate(
      89.99,
      [],
    );

    expect(gate.passed).toBe(false);
    expect(gate.reasons.join(' ')).toMatch(
      /below the 90 threshold/i,
    );
  });

  it('keeps explainability fields on every representative failure', () => {
    const result = runValidationScenario(
      'recorded-shape',
    );

    for (const check of result.failedChecks) {
      expect(check.rootCause).toBeTruthy();
      expect(check.recommendedFix).toBeTruthy();
      expect(check.lifecycle).toBeTruthy();
      expect(check.previewRows?.length).toBeGreaterThan(
        0,
      );
    }
  });

  it('models the four browser-visible output artifacts', () => {
    expect(
      DQ_ARTIFACTS.map(
        (artifact) => artifact.label,
      ),
    ).toEqual([
      'Cleansed dataset ZIP',
      'Issues CSV',
      'Exceptions CSV',
      'Scorecard',
    ]);
  });

  it('keeps all scenarios at the 27-check project scope', () => {
    expect(
      DQ_SCENARIOS.every(
        (scenario) =>
          scenario.checks.length === 27,
      ),
    ).toBe(true);
  });
});
