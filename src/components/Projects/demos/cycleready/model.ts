export type CycleReadySeverity = 1 | 2 | 3;
export type CycleReadyDefectStatus = 'open' | 'resolved';
export type CycleReadyFilter = 'all' | 'blockers' | 'manual-only';

export interface CycleReadyRequirement {
  id: string;
  title: string;
  surface: string;
  manualCases: number;
  automatedTests: number;
  uat: 'passed';
}

export interface CycleReadyDefect {
  id: string;
  title: string;
  severity: CycleReadySeverity;
  status: CycleReadyDefectStatus;
  requirementIds: readonly string[];
}

export interface CycleReadyTraceabilityStats {
  requirements: number;
  mappedRequirements: number;
  manualCases: number;
  automatedRequirements: number;
  playwrightTests: number;
  playwrightPassed: number;
  uatPassed: number;
  workflowSurfaces: number;
}

export interface CycleReadyReleaseDecision {
  decision: 'go' | 'no-go';
  openSev1: number;
  openSev2: number;
  blockers: readonly CycleReadyDefect[];
  reasons: readonly string[];
}

const REQUIREMENT_BLUEPRINTS = [
  ['REQ-01', 'Submit recertification packet', 'Clinician submission', 2, 3],
  ['REQ-02', 'Validate required submission fields', 'Clinician submission', 2, 3],
  ['REQ-03', 'Upload supporting evidence', 'Evidence handling', 2, 2],
  ['REQ-04', 'Preserve submission status', 'Status tracking', 2, 2],
  ['REQ-05', 'Route work to reviewer queue', 'Reviewer workflow', 2, 2],
  ['REQ-06', 'Open reviewer work item', 'Reviewer workflow', 2, 2],
  ['REQ-07', 'Record reviewer decision', 'Reviewer workflow', 2, 2],
  ['REQ-08', 'Return incomplete work for correction', 'Status tracking', 2, 2],
  ['REQ-09', 'Schedule recertification reminder', 'Reminder workflow', 2, 2],
  ['REQ-10', 'Display reminder state', 'Reminder workflow', 2, 2],
  ['REQ-11', 'Capture user attestation', 'Attestation', 1, 2],
  ['REQ-12', 'Record final signoff', 'Attestation', 1, 2],
  ['REQ-13', 'Link defects to release evidence', 'QA evidence', 1, 1],
  ['REQ-14', 'Export UAT evidence packet', 'QA evidence', 1, 0],
  ['REQ-15', 'Publish release decision', 'Release room', 1, 0],
] as const;

export const CYCLEREADY_REQUIREMENTS: readonly CycleReadyRequirement[] =
  REQUIREMENT_BLUEPRINTS.map(
    ([id, title, surface, manualCases, automatedTests]) => ({
      id,
      title,
      surface,
      manualCases,
      automatedTests,
      uat: 'passed' as const,
    }),
  );

export const INITIAL_CYCLEREADY_DEFECTS: readonly CycleReadyDefect[] = [
  {
    id: 'SIM-DEF-01',
    title: 'Representative critical submission blocker',
    severity: 1,
    status: 'open',
    requirementIds: ['REQ-01', 'REQ-02'],
  },
  {
    id: 'SIM-DEF-02',
    title: 'Representative reviewer workflow blocker',
    severity: 2,
    status: 'open',
    requirementIds: ['REQ-05', 'REQ-07'],
  },
  {
    id: 'SIM-DEF-03',
    title: 'Representative release-evidence blocker',
    severity: 2,
    status: 'open',
    requirementIds: ['REQ-13', 'REQ-15'],
  },
];

export function getTraceabilityStats(
  requirements: readonly CycleReadyRequirement[] =
    CYCLEREADY_REQUIREMENTS,
): CycleReadyTraceabilityStats {
  return {
    requirements: requirements.length,
    mappedRequirements: requirements.length,
    manualCases: requirements.reduce(
      (total, requirement) =>
        total + requirement.manualCases,
      0,
    ),
    automatedRequirements: requirements.filter(
      (requirement) =>
        requirement.automatedTests > 0,
    ).length,
    playwrightTests: requirements.reduce(
      (total, requirement) =>
        total + requirement.automatedTests,
      0,
    ),
    playwrightPassed: requirements.reduce(
      (total, requirement) =>
        total + requirement.automatedTests,
      0,
    ),
    uatPassed: requirements.filter(
      (requirement) => requirement.uat === 'passed',
    ).length,
    workflowSurfaces: new Set(
      requirements.map(
        (requirement) => requirement.surface,
      ),
    ).size,
  };
}

export function evaluateRelease(
  defects: readonly CycleReadyDefect[],
): CycleReadyReleaseDecision {
  const blockers = defects.filter(
    (defect) =>
      defect.status === 'open' &&
      defect.severity <= 2,
  );

  const openSev1 = blockers.filter(
    (defect) => defect.severity === 1,
  ).length;

  const openSev2 = blockers.filter(
    (defect) => defect.severity === 2,
  ).length;

  const reasons: string[] = [];

  if (openSev1 > 0) {
    reasons.push(
      `${openSev1} open Sev1 blocker${openSev1 === 1 ? '' : 's'}`,
    );
  }

  if (openSev2 > 0) {
    reasons.push(
      `${openSev2} open Sev2 blocker${openSev2 === 1 ? '' : 's'}`,
    );
  }

  return {
    decision:
      blockers.length === 0 ? 'go' : 'no-go',
    openSev1,
    openSev2,
    blockers,
    reasons,
  };
}

export function setDefectStatus(
  defects: readonly CycleReadyDefect[],
  defectId: string,
  status: CycleReadyDefectStatus,
): CycleReadyDefect[] {
  return defects.map((defect) =>
    defect.id === defectId
      ? {
          ...defect,
          status,
        }
      : defect,
  );
}

export function getRequirementsForFilter(
  filter: CycleReadyFilter,
  defects: readonly CycleReadyDefect[],
  requirements: readonly CycleReadyRequirement[] =
    CYCLEREADY_REQUIREMENTS,
): CycleReadyRequirement[] {
  if (filter === 'manual-only') {
    return requirements.filter(
      (requirement) =>
        requirement.automatedTests === 0,
    );
  }

  if (filter === 'blockers') {
    const blockedIds = new Set(
      defects
        .filter(
          (defect) =>
            defect.status === 'open' &&
            defect.severity <= 2,
        )
        .flatMap(
          (defect) => defect.requirementIds,
        ),
    );

    return requirements.filter(
      (requirement) =>
        blockedIds.has(requirement.id),
    );
  }

  return [...requirements];
}

export function getDefectsForRequirement(
  requirementId: string,
  defects: readonly CycleReadyDefect[],
): CycleReadyDefect[] {
  return defects.filter((defect) =>
    defect.requirementIds.includes(requirementId),
  );
}
