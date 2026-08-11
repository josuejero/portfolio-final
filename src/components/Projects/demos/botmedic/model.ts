export type BotMedicCommandName =
  | 'health'
  | 'envcheck'
  | 'permissions'
  | 'latency'
  | 'helpme'
  | 'incident';

export interface BotMedicCommand {
  name: BotMedicCommandName;
  label: string;
  description: string;
}

export type BotMedicIncidentSeverity =
  | 'low'
  | 'medium'
  | 'high';

export interface BotMedicIncidentScenario {
  id: string;
  title: string;
  severity: BotMedicIncidentSeverity;
  symptom: string;
  evidence: readonly string[];
  matchedRule: string;
  diagnosis: string;
  recoverySteps: readonly string[];
  runbook: string;
}

export interface BotMedicCommandResult {
  command: BotMedicCommandName;
  heading: string;
  summary: string;
  details: readonly string[];
  diagnostic?: BotMedicIncidentScenario;
}

export interface BotMedicTelemetryEntry {
  id: string;
  command: BotMedicCommandName;
  outcome: 'ok' | 'diagnosed';
  durationMs: number;
  timestamp: string;
  scenarioId?: string;
}

export interface BotMedicTelemetrySummary {
  total: number;
  diagnosed: number;
  averageDurationMs: number;
}

export const BOTMEDIC_COMMANDS:
  readonly BotMedicCommand[] = [
    {
      name: 'health',
      label: '/health',
      description:
        'Return the worker version, environment, and a current health timestamp.',
    },
    {
      name: 'envcheck',
      label: '/envcheck',
      description:
        'Inspect the deployment environment and surface configuration checks.',
    },
    {
      name: 'permissions',
      label: '/permissions',
      description:
        'Walk through Discord permission checks that can block support flows.',
    },
    {
      name: 'latency',
      label: '/latency',
      description:
        'Inspect response timing and the initial-interaction response budget.',
    },
    {
      name: 'helpme',
      label: '/helpme',
      description:
        'Expose rule-backed troubleshooting options from the shared diagnostic catalog.',
    },
    {
      name: 'incident',
      label: '/incident',
      description:
        'Replay a fixture-backed support scenario and render diagnosis guidance.',
    },
  ];

export const REPRESENTATIVE_INCIDENTS:
  readonly BotMedicIncidentScenario[] = [
    {
      id: 'permissions-blocked',
      title: 'Bot cannot respond in channel',
      severity: 'high',
      symptom:
        'A slash command is accepted, but the bot cannot send the expected follow-up in the target channel.',
      evidence: [
        'Interaction reached the worker.',
        'Response path is available.',
        'Channel action is rejected by the simulated permission check.',
      ],
      matchedRule: 'permission-path-blocked',
      diagnosis:
        'The interaction path is healthy, but the bot lacks a channel permission required for the requested action.',
      recoverySteps: [
        'Review the bot role and channel overrides.',
        'Restore the required permission without widening unrelated access.',
        'Re-run the permissions check and retry the command.',
      ],
      runbook: 'Permission diagnostics',
    },
    {
      id: 'latency-budget',
      title: 'Initial response is approaching timeout',
      severity: 'medium',
      symptom:
        'The interaction succeeds intermittently, but response timing is close to Discord’s initial-response budget.',
      evidence: [
        'Signature verification completed.',
        'Synthetic response timing is elevated.',
        'No configuration failure is present.',
      ],
      matchedRule: 'interaction-latency-elevated',
      diagnosis:
        'The worker path is available, but elevated processing time can threaten the initial Discord response window.',
      recoverySteps: [
        'Acknowledge the interaction quickly before heavier work.',
        'Inspect downstream or telemetry operations contributing to delay.',
        'Re-run latency diagnostics after the slow path is reduced.',
      ],
      runbook: 'Latency diagnostics',
    },
    {
      id: 'environment-mismatch',
      title: 'Deployment environment is incomplete',
      severity: 'high',
      symptom:
        'The worker starts, but a command that depends on deployment configuration cannot complete normally.',
      evidence: [
        'Worker code is reachable.',
        'One required environment value is unavailable in the simulation.',
        'Command routing itself remains healthy.',
      ],
      matchedRule: 'environment-config-missing',
      diagnosis:
        'The command path is valid, but required deployment configuration is incomplete.',
      recoverySteps: [
        'Identify the missing environment value.',
        'Restore it through the deployment secret or configuration path.',
        'Re-run the environment check before retrying dependent commands.',
      ],
      runbook: 'Environment checks',
    },
    {
      id: 'command-registration',
      title: 'Slash command metadata is stale',
      severity: 'low',
      symptom:
        'The deployed worker is healthy, but a user sees command metadata that no longer matches the current support flow.',
      evidence: [
        'Health response is normal.',
        'Shared command metadata has changed.',
        'The simulated registered command snapshot is older.',
      ],
      matchedRule: 'command-registration-stale',
      diagnosis:
        'The runtime is healthy, but Discord command registration needs to be refreshed from the shared command catalog.',
      recoverySteps: [
        'Regenerate or review the current command definitions.',
        'Register the updated command catalog with Discord.',
        'Verify the visible command metadata and retry the workflow.',
      ],
      runbook: 'Command registration',
    },
  ];

export const INITIAL_TELEMETRY:
  readonly BotMedicTelemetryEntry[] = [
    {
      id: 'telemetry-health',
      command: 'health',
      outcome: 'ok',
      durationMs: 84,
      timestamp: 'Seed · 09:14',
    },
    {
      id: 'telemetry-incident',
      command: 'incident',
      outcome: 'diagnosed',
      durationMs: 132,
      timestamp: 'Seed · 09:16',
      scenarioId: 'permissions-blocked',
    },
  ];

export function getCommand(
  name: BotMedicCommandName,
): BotMedicCommand {
  const command = BOTMEDIC_COMMANDS.find(
    (candidate) => candidate.name === name,
  );

  if (!command) {
    throw new Error(
      `Unknown BotMedic command: ${name}`,
    );
  }

  return command;
}

export function getIncidentScenario(
  scenarioId: string,
): BotMedicIncidentScenario | undefined {
  return REPRESENTATIVE_INCIDENTS.find(
    (scenario) => scenario.id === scenarioId,
  );
}

export function runBotMedicCommand(
  commandName: BotMedicCommandName,
  scenarioId: string =
    REPRESENTATIVE_INCIDENTS[0].id,
): BotMedicCommandResult {
  switch (commandName) {
    case 'health':
      return {
        command: commandName,
        heading: 'Worker health looks normal',
        summary:
          'The simulated worker is available and ready to accept Discord interactions.',
        details: [
          'Environment: portfolio-simulation',
          'Version: evidence-snapshot',
          'Interaction endpoint: available',
        ],
      };

    case 'envcheck':
      return {
        command: commandName,
        heading: 'Environment check completed',
        summary:
          'The simulation checks the same category of deployment configuration surfaced by BotMedic’s environment workflow.',
        details: [
          'Discord public key: configured',
          'Telemetry binding: configured',
          'Bot version / environment metadata: configured',
        ],
      };

    case 'permissions':
      return {
        command: commandName,
        heading: 'Permission path reviewed',
        summary:
          'The simulated bot role can read interactions and respond in the selected support channel.',
        details: [
          'View channel: allowed',
          'Send messages: allowed',
          'Use application commands: allowed',
        ],
      };

    case 'latency':
      return {
        command: commandName,
        heading: 'Response timing is within budget',
        summary:
          'The embedded run stays comfortably below the Discord initial-response budget used by BotMedic’s synthetic response-budget test.',
        details: [
          'Synthetic interaction: 118 ms',
          'Signature verification: included in request path',
          'Initial response budget: under 3 seconds',
        ],
      };

    case 'helpme':
      return {
        command: commandName,
        heading: 'Diagnostic catalog loaded',
        summary:
          'BotMedic’s real /helpme flow is populated from shared rule metadata. This portfolio view exposes representative troubleshooting categories without claiming to reproduce all ten production-style rule cases verbatim.',
        details: REPRESENTATIVE_INCIDENTS.map(
          (scenario) =>
            `${scenario.runbook}: ${scenario.title}`,
        ),
      };

    case 'incident': {
      const scenario =
        getIncidentScenario(scenarioId) ??
        REPRESENTATIVE_INCIDENTS[0];

      return {
        command: commandName,
        heading: scenario.title,
        summary: scenario.diagnosis,
        details: scenario.evidence,
        diagnostic: scenario,
      };
    }
  }
}

export function recordTelemetry(
  entries: readonly BotMedicTelemetryEntry[],
  entry: BotMedicTelemetryEntry,
): BotMedicTelemetryEntry[] {
  return [entry, ...entries];
}

export function summarizeTelemetry(
  entries: readonly BotMedicTelemetryEntry[],
): BotMedicTelemetrySummary {
  if (entries.length === 0) {
    return {
      total: 0,
      diagnosed: 0,
      averageDurationMs: 0,
    };
  }

  const duration = entries.reduce(
    (total, entry) =>
      total + entry.durationMs,
    0,
  );

  return {
    total: entries.length,
    diagnosed: entries.filter(
      (entry) =>
        entry.outcome === 'diagnosed',
    ).length,
    averageDurationMs: Math.round(
      duration / entries.length,
    ),
  };
}
