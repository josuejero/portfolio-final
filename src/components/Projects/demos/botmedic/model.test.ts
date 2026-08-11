import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  BOTMEDIC_COMMANDS,
  getIncidentScenario,
  INITIAL_TELEMETRY,
  recordTelemetry,
  REPRESENTATIVE_INCIDENTS,
  runBotMedicCommand,
  summarizeTelemetry,
} from './model';

describe('BotMedic demo model', () => {
  it('preserves the six documented slash command surfaces', () => {
    expect(
      BOTMEDIC_COMMANDS.map(
        (command) => command.name,
      ),
    ).toEqual([
      'health',
      'envcheck',
      'permissions',
      'latency',
      'helpme',
      'incident',
    ]);
  });

  it('keeps representative incident identifiers unique', () => {
    const ids = REPRESENTATIVE_INCIDENTS.map(
      (scenario) => scenario.id,
    );

    expect(new Set(ids).size).toBe(
      ids.length,
    );
  });

  it('keeps every representative incident actionable', () => {
    for (const scenario of REPRESENTATIVE_INCIDENTS) {
      expect(scenario.evidence.length).toBeGreaterThan(0);
      expect(
        scenario.recoverySteps.length,
      ).toBeGreaterThan(0);
      expect(scenario.matchedRule).toBeTruthy();
      expect(scenario.runbook).toBeTruthy();
    }
  });

  it('resolves a selected incident scenario', () => {
    expect(
      getIncidentScenario(
        'latency-budget',
      )?.matchedRule,
    ).toBe(
      'interaction-latency-elevated',
    );
  });

  it('returns a rule-backed diagnostic for /incident', () => {
    const result = runBotMedicCommand(
      'incident',
      'environment-mismatch',
    );

    expect(result.diagnostic?.id).toBe(
      'environment-mismatch',
    );
    expect(result.summary).toMatch(
      /configuration/i,
    );
  });

  it('records new telemetry without mutating prior entries', () => {
    const next = recordTelemetry(
      INITIAL_TELEMETRY,
      {
        id: 'new-entry',
        command: 'latency',
        outcome: 'ok',
        durationMs: 118,
        timestamp: 'Just now',
      },
    );

    expect(next[0].id).toBe('new-entry');
    expect(next).toHaveLength(
      INITIAL_TELEMETRY.length + 1,
    );
    expect(INITIAL_TELEMETRY).toHaveLength(2);
  });

  it('summarizes telemetry volume, diagnoses, and duration', () => {
    expect(
      summarizeTelemetry(INITIAL_TELEMETRY),
    ).toEqual({
      total: 2,
      diagnosed: 1,
      averageDurationMs: 108,
    });
  });
});
