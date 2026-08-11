export type DQDatasetId =
  | 'districts'
  | 'users'
  | 'resources'
  | 'events'
  | 'newsletter';

export type DQIssueLifecycle =
  | 'new'
  | 'recurring'
  | 'open'
  | 'not-seen';

export interface DQPreviewRow {
  id: string;
  values: readonly {
    field: string;
    value: string;
  }[];
}

export interface DQValidationCheck {
  id: string;
  label: string;
  dataset: DQDatasetId;
  severity: number;
  weight: number;
  penalty: number;
  status: 'passed' | 'failed';
  lifecycle?: DQIssueLifecycle;
  rootCause?: string;
  recommendedFix?: string;
  previewRows?: readonly DQPreviewRow[];
}

export interface DQScenario {
  id: string;
  label: string;
  description: string;
  checks: readonly DQValidationCheck[];
}

export interface DQGateResult {
  passed: boolean;
  scoreThreshold: number;
  blockingSeverity: number;
  reasons: readonly string[];
}

export interface DQValidationResult {
  scenario: DQScenario;
  score: number;
  totalPenalty: number;
  totalWeight: number;
  normalizedPenalty: number;
  failedChecks: readonly DQValidationCheck[];
  gate: DQGateResult;
}

const DATASETS: readonly DQDatasetId[] = [
  'districts',
  'users',
  'resources',
  'events',
  'newsletter',
];

function previewRow(
  id: string,
  values: Record<string, string>,
): DQPreviewRow {
  return {
    id,
    values: Object.entries(values).map(
      ([field, value]) => ({
        field,
        value,
      }),
    ),
  };
}

function passingCheck(
  index: number,
): DQValidationCheck {
  const dataset =
    DATASETS[index % DATASETS.length];

  return {
    id: `SIM-PASS-${String(index + 1).padStart(2, '0')}`,
    label: `Representative ${dataset} integrity check ${index + 1}`,
    dataset,
    severity: 2,
    weight: 3,
    penalty: 0,
    status: 'passed',
  };
}

const RECORDED_SHAPE_FAILURES: readonly DQValidationCheck[] = [
  {
    id: 'SIM-USERS-EMAIL',
    label: 'User contact field completeness',
    dataset: 'users',
    severity: 3,
    weight: 7,
    penalty: 0.36,
    status: 'failed',
    lifecycle: 'recurring',
    rootCause:
      'A small group of representative user rows has an empty contact field after canonicalization.',
    recommendedFix:
      'Backfill the source export when possible and quarantine unresolved rows before downstream outreach use.',
    previewRows: [
      previewRow('USR-1042', {
        user_id: 'USR-1042',
        email: '(missing)',
        status: 'active',
      }),
      previewRow('USR-1188', {
        user_id: 'USR-1188',
        email: '(missing)',
        status: 'active',
      }),
    ],
  },
  {
    id: 'SIM-RESOURCE-DUPLICATE',
    label: 'Resource identifier uniqueness',
    dataset: 'resources',
    severity: 4,
    weight: 8,
    penalty: 0.48,
    status: 'failed',
    lifecycle: 'open',
    rootCause:
      'Representative source rows reuse an identifier that should resolve to one canonical resource.',
    recommendedFix:
      'Deduplicate on the source key, preserve the newest authoritative row, and review references before publishing.',
    previewRows: [
      previewRow('RES-221', {
        resource_id: 'RES-221',
        title: 'Housing referral',
        updated_at: '2026-08-08',
      }),
      previewRow('RES-221-duplicate', {
        resource_id: 'RES-221',
        title: 'Housing referral',
        updated_at: '2026-08-09',
      }),
    ],
  },
  {
    id: 'SIM-EVENTS-TIMESTAMP',
    label: 'Event timestamp parseability',
    dataset: 'events',
    severity: 3,
    weight: 6,
    penalty: 0.34,
    status: 'failed',
    lifecycle: 'new',
    rootCause:
      'A representative event export contains a timestamp outside the expected canonical formats.',
    recommendedFix:
      'Normalize the source timestamp to the accepted format and rerun ingestion so the event can enter the staged table.',
    previewRows: [
      previewRow('EVT-731', {
        event_id: 'EVT-731',
        starts_at: '08/31/26 7ish',
        city: 'Springfield',
      }),
    ],
  },
  {
    id: 'SIM-NEWSLETTER-CONSENT',
    label: 'Newsletter consent completeness',
    dataset: 'newsletter',
    severity: 2,
    weight: 5,
    penalty: 0.28,
    status: 'failed',
    lifecycle: 'recurring',
    rootCause:
      'Representative newsletter rows do not contain a usable consent value after mapping.',
    recommendedFix:
      'Resolve the source mapping and exclude ambiguous consent rows from outbound messaging until corrected.',
    previewRows: [
      previewRow('NEWS-044', {
        subscriber_id: 'NEWS-044',
        consent: '(missing)',
        email: 'sample@example.test',
      }),
    ],
  },
  {
    id: 'SIM-DISTRICTS-MAPPING',
    label: 'District mapping coverage',
    dataset: 'districts',
    severity: 2,
    weight: 8,
    penalty: 0.32,
    status: 'failed',
    lifecycle: 'not-seen',
    rootCause:
      'A representative district value is not present in the current normalization mapping.',
    recommendedFix:
      'Add the reviewed source value to the mapping configuration and regenerate the staged dataset.',
    previewRows: [
      previewRow('DIST-17', {
        district_id: 'DIST-17',
        source_region: 'Western-MA / Other',
        normalized_region: '(unmapped)',
      }),
    ],
  },
];

const RECORDED_SHAPE_PASSES = Array.from(
  { length: 22 },
  (_, index) => passingCheck(index),
);

const CRITICAL_FAILURE: DQValidationCheck = {
  id: 'SIM-USERS-PRIMARY-KEY',
  label: 'Primary identifier completeness',
  dataset: 'users',
  severity: 5,
  weight: 8,
  penalty: 0.5,
  status: 'failed',
  lifecycle: 'new',
  rootCause:
    'A representative staged user row has no primary identifier, so downstream joins cannot resolve it safely.',
  recommendedFix:
    'Reject the row from the publishable dataset, repair the source identifier, and rerun the validation pipeline.',
  previewRows: [
    previewRow('ROW-88', {
      user_id: '(missing)',
      email: 'critical@example.test',
      status: 'active',
    }),
  ],
};

export const DQ_SCENARIOS: readonly DQScenario[] = [
  {
    id: 'recorded-shape',
    label: 'Recorded-shape snapshot',
    description:
      'Representative browser fixtures reproduce the repository-recorded shape: 27 checks, five failures, and a 98.22 score.',
    checks: [
      ...RECORDED_SHAPE_FAILURES,
      ...RECORDED_SHAPE_PASSES,
    ],
  },
  {
    id: 'critical-blocker',
    label: 'Critical blocker',
    description:
      'A severity-5 identifier failure demonstrates why the gate can block publication even when the numeric score remains above 90.',
    checks: [
      CRITICAL_FAILURE,
      ...Array.from(
        { length: 26 },
        (_, index) => passingCheck(index),
      ),
    ],
  },
  {
    id: 'clean-baseline',
    label: 'Clean baseline',
    description:
      'All representative checks pass, producing a clean score and publishable gate decision.',
    checks: Array.from(
      { length: 27 },
      (_, index) => passingCheck(index),
    ),
  },
];

export const DQ_ARTIFACTS = [
  {
    label: 'Cleansed dataset ZIP',
    description:
      'Canonicalized tables ready for downstream inspection.',
  },
  {
    label: 'Issues CSV',
    description:
      'Failed checks and issue lifecycle records.',
  },
  {
    label: 'Exceptions CSV',
    description:
      'Rows excluded or requiring manual review.',
  },
  {
    label: 'Scorecard',
    description:
      'Quality score, gate result, trends, and review context.',
  },
] as const;

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateQualityScore(
  checks: readonly DQValidationCheck[],
  baseline = 100,
  minimum = 0,
): {
  score: number;
  totalPenalty: number;
  totalWeight: number;
  normalizedPenalty: number;
} {
  const totalPenalty = checks.reduce(
    (total, check) => total + check.penalty,
    0,
  );

  const totalWeight = checks.reduce(
    (total, check) => total + check.weight,
    0,
  );

  const normalizedPenalty =
    totalWeight === 0
      ? 0
      : totalPenalty / totalWeight;

  const score = Math.max(
    minimum,
    baseline - 100 * normalizedPenalty,
  );

  return {
    score: round(score),
    totalPenalty: round(totalPenalty),
    totalWeight: round(totalWeight),
    normalizedPenalty:
      Math.round(normalizedPenalty * 10000) /
      10000,
  };
}

export function evaluateQualityGate(
  score: number,
  checks: readonly DQValidationCheck[],
  scoreThreshold = 90,
  blockingSeverity = 5,
): DQGateResult {
  const reasons: string[] = [];

  if (score < scoreThreshold) {
    reasons.push(
      `Score ${score.toFixed(2)} is below the ${scoreThreshold} threshold.`,
    );
  }

  const criticalFailures = checks.filter(
    (check) =>
      check.status === 'failed' &&
      check.severity >= blockingSeverity,
  );

  if (criticalFailures.length > 0) {
    reasons.push(
      `${criticalFailures.length} failed check${criticalFailures.length === 1 ? '' : 's'} at severity ${blockingSeverity} or higher.`,
    );
  }

  return {
    passed: reasons.length === 0,
    scoreThreshold,
    blockingSeverity,
    reasons,
  };
}

export function runValidationScenario(
  scenarioId: string,
): DQValidationResult {
  const scenario =
    DQ_SCENARIOS.find(
      (candidate) =>
        candidate.id === scenarioId,
    ) ?? DQ_SCENARIOS[0];

  const metrics = calculateQualityScore(
    scenario.checks,
  );

  const failedChecks = scenario.checks.filter(
    (check) => check.status === 'failed',
  );

  return {
    scenario,
    ...metrics,
    failedChecks,
    gate: evaluateQualityGate(
      metrics.score,
      scenario.checks,
    ),
  };
}
