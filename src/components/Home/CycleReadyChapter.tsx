'use client';

import Link from 'next/link';
import {
  useMemo,
  useState,
} from 'react';

import {
  CYCLEREADY_REQUIREMENTS,
  INITIAL_CYCLEREADY_DEFECTS,
  evaluateRelease,
  getDefectsForRequirement,
  getTraceabilityStats,
  setDefectStatus,
  type CycleReadyDefect,
} from '@/components/Projects/demos/cycleready/model';
import { getProjectById } from '@/data/projects';

import styles from './CycleReadyChapter.module.css';

const CYCLEREADY_PROJECT = (() => {
  const project = getProjectById('cycleready');

  if (!project) {
    throw new Error(
      'CycleReady is missing from the project catalog.',
    );
  }

  return project;
})();

const DEFAULT_REQUIREMENT = (() => {
  const requirement =
    CYCLEREADY_REQUIREMENTS[0];

  if (!requirement) {
    throw new Error(
      'CycleReady requires at least one requirement.',
    );
  }

  return requirement;
})();

function cloneDefects(): CycleReadyDefect[] {
  return INITIAL_CYCLEREADY_DEFECTS.map(
    (defect) => ({
      ...defect,
      requirementIds: [
        ...defect.requirementIds,
      ],
    }),
  );
}

export default function CycleReadyChapter() {
  const [defects, setDefects] =
    useState<CycleReadyDefect[]>(
      cloneDefects,
    );

  const [
    selectedRequirementId,
    setSelectedRequirementId,
  ] = useState(DEFAULT_REQUIREMENT.id);

  const stats = useMemo(
    () => getTraceabilityStats(),
    [],
  );

  const release = useMemo(
    () => evaluateRelease(defects),
    [defects],
  );

  const selectedRequirement = useMemo(
    () =>
      CYCLEREADY_REQUIREMENTS.find(
        (requirement) =>
          requirement.id ===
          selectedRequirementId,
      ) ?? DEFAULT_REQUIREMENT,
    [selectedRequirementId],
  );

  const linkedDefects = useMemo(
    () =>
      getDefectsForRequirement(
        selectedRequirement.id,
        defects,
      ),
    [defects, selectedRequirement.id],
  );

  const blockedRequirementIds =
    useMemo(() => {
      return new Set(
        defects
          .filter(
            (defect) =>
              defect.status === 'open' &&
              defect.severity <= 2,
          )
          .flatMap(
            (defect) =>
              defect.requirementIds,
          ),
      );
    }, [defects]);

  const toggleDefect = (
    defect: CycleReadyDefect,
  ) => {
    setDefects((current) =>
      setDefectStatus(
        current,
        defect.id,
        defect.status === 'open'
          ? 'resolved'
          : 'open',
      ),
    );
  };

  const restoreRecordedState = () => {
    setDefects(cloneDefects());
    setSelectedRequirementId(
      DEFAULT_REQUIREMENT.id,
    );
  };

  return (
    <section
      className={styles.chapter}
      aria-labelledby="cycleready-title"
    >
      <div className={styles.chapterInner}>
        <div className={styles.chapterMeta}>
          <span>04 / 04</span>
          <span>RELEASE READINESS</span>
          <span>FINAL GATE</span>
        </div>

        <div className={styles.titleGrid}>
          <div>
            <p className={styles.titleKicker}>
              EVIDENCE IS NOT THE DECISION.
              THE GATE IS.
            </p>

            <h2
              id="cycleready-title"
              className={styles.projectName}
            >
              CYCLEREADY
            </h2>
          </div>

          <p className={styles.summary}>
            {CYCLEREADY_PROJECT.summary}
          </p>
        </div>

        <div className={styles.evidenceSequence}>
          <div className={styles.sequenceIntro}>
            <span>RELEASE EVIDENCE</span>

            <p>
              Requirements become cases.
              Cases become automation.
              Automation becomes evidence.
              Evidence still has to clear the
              blocker gate.
            </p>
          </div>

          <article className={styles.evidenceStep}>
            <span>01</span>
            <strong>
              {stats.mappedRequirements}/
              {stats.requirements}
            </strong>
            <p>REQUIREMENTS MAPPED</p>
          </article>

          <article className={styles.evidenceStep}>
            <span>02</span>
            <strong>
              {stats.manualCases}
            </strong>
            <p>MANUAL TEST CASES</p>
          </article>

          <article className={styles.evidenceStep}>
            <span>03</span>
            <strong>
              {stats.playwrightPassed}/
              {stats.playwrightTests}
            </strong>
            <p>PLAYWRIGHT PASSING</p>
          </article>

          <article className={styles.evidenceStep}>
            <span>04</span>
            <strong>
              {stats.automatedRequirements}/
              {stats.requirements}
            </strong>
            <p>REQUIREMENTS AUTOMATED</p>
          </article>
        </div>

        <div className={styles.traceabilitySection}>
          <div className={styles.traceabilityIntro}>
            <span className={styles.sectionLabel}>
              TRACEABILITY
            </span>

            <h3>
              Fifteen requirements.
              One release decision.
            </h3>

            <p>
              Select a requirement to inspect
              its manual, automated, UAT, and
              blocker evidence.
            </p>
          </div>

          <div className={styles.requirementField}>
            <div
              className={styles.requirementGrid}
              role="group"
              aria-label="CycleReady requirements"
            >
              {CYCLEREADY_REQUIREMENTS.map(
                (requirement, index) => {
                  const selected =
                    requirement.id ===
                    selectedRequirement.id;

                  const blocked =
                    blockedRequirementIds.has(
                      requirement.id,
                    );

                  const manualOnly =
                    requirement.automatedTests ===
                    0;

                  return (
                    <button
                      key={requirement.id}
                      type="button"
                      aria-pressed={selected}
                      className={[
                        styles.requirementCell,
                        selected
                          ? styles.requirementCellSelected
                          : '',
                        blocked
                          ? styles.requirementCellBlocked
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() =>
                        setSelectedRequirementId(
                          requirement.id,
                        )
                      }
                    >
                      <span
                        className={
                          styles.requirementNumber
                        }
                        aria-hidden="true"
                      >
                        {String(
                          index + 1,
                        ).padStart(2, '0')}
                      </span>

                      <strong>
                        {requirement.id}
                      </strong>

                      <span
                        className={
                          styles.requirementState
                        }
                      >
                        {blocked
                          ? 'BLOCKED'
                          : manualOnly
                            ? 'MANUAL'
                            : 'MAPPED'}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div className={styles.requirementDetail}>
              <div className={styles.detailHeader}>
                <span>
                  {
                    selectedRequirement.id
                  }
                </span>

                <span>
                  {
                    selectedRequirement.surface
                  }
                </span>
              </div>

              <h3>
                {selectedRequirement.title}
              </h3>

              <div className={styles.detailEvidence}>
                <div>
                  <span>MANUAL</span>
                  <strong>
                    {
                      selectedRequirement.manualCases
                    }
                  </strong>
                </div>

                <div>
                  <span>AUTOMATED</span>
                  <strong>
                    {
                      selectedRequirement.automatedTests
                    }
                  </strong>
                </div>

                <div>
                  <span>UAT</span>
                  <strong>
                    {
                      selectedRequirement.uat
                    }
                  </strong>
                </div>
              </div>

              <div className={styles.linkedDefects}>
                <span className={styles.detailLabel}>
                  LINKED DEFECTS
                </span>

                {linkedDefects.length > 0 ? (
                  linkedDefects.map(
                    (defect) => (
                      <div
                        key={defect.id}
                        className={
                          styles.linkedDefect
                        }
                      >
                        <span>
                          {defect.id}
                        </span>

                        <strong>
                          SEV
                          {defect.severity}
                          {' · '}
                          {defect.status.toUpperCase()}
                        </strong>
                      </div>
                    ),
                  )
                ) : (
                  <p className={styles.noDefects}>
                    No representative defects
                    linked to this requirement.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.blockerSection}>
          <div className={styles.blockerIntro}>
            <span className={styles.sectionLabel}>
              BLOCKER GATE
            </span>

            <h3>
              Passing tests do not erase
              release blockers.
            </h3>

            <p>
              Toggle the representative defects
              to see the browser-only release
              decision recalculate.
            </p>

            <button
              type="button"
              className={styles.restoreButton}
              onClick={restoreRecordedState}
            >
              Restore recorded state
            </button>
          </div>

          <div className={styles.defectList}>
            {defects.map(
              (defect, index) => (
                <article
                  key={defect.id}
                  className={[
                    styles.defect,
                    defect.status === 'open'
                      ? styles.defectOpen
                      : styles.defectResolved,
                  ].join(' ')}
                >
                  <div className={styles.defectIndex}>
                    0{index + 1}
                  </div>

                  <div className={styles.defectBody}>
                    <div className={styles.defectMeta}>
                      <span>
                        {defect.id}
                      </span>

                      <span>
                        SEV {defect.severity}
                      </span>
                    </div>

                    <h4>
                      {defect.title}
                    </h4>

                    <p>
                      {defect.requirementIds.join(
                        ' · ',
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={styles.defectToggle}
                    aria-label={`Mark ${defect.id} ${
                      defect.status === 'open'
                        ? 'resolved'
                        : 'open'
                    }`}
                    onClick={() =>
                      toggleDefect(defect)
                    }
                  >
                    <span>
                      {defect.status}
                    </span>

                    <strong>
                      {defect.status === 'open'
                        ? 'RESOLVE'
                        : 'REOPEN'}
                    </strong>
                  </button>
                </article>
              ),
            )}
          </div>
        </div>

        <div
          className={[
            styles.verdict,
            release.decision === 'go'
              ? styles.verdictGo
              : styles.verdictNoGo,
          ].join(' ')}
          aria-live="polite"
        >
          <div className={styles.verdictMeta}>
            <span>
              SIMULATED RELEASE DECISION
            </span>

            <span>
              {
                release.blockers.length
              }
              {' '}OPEN BLOCKERS
            </span>
          </div>

          <div className={styles.verdictMain}>
            <strong>
              {release.decision === 'go'
                ? 'GO'
                : 'NO GO'}
            </strong>
          </div>

          <div className={styles.verdictCounts}>
            <div>
              <span>OPEN SEV1</span>
              <strong>
                {release.openSev1}
              </strong>
            </div>

            <div>
              <span>OPEN SEV2</span>
              <strong>
                {release.openSev2}
              </strong>
            </div>

            <div>
              <span>PLAYWRIGHT</span>
              <strong>
                {stats.playwrightPassed}/
                {stats.playwrightTests}
              </strong>
            </div>

            <div>
              <span>TRACEABILITY</span>
              <strong>
                {stats.mappedRequirements}/
                {stats.requirements}
              </strong>
            </div>
          </div>

          {release.reasons.length > 0 ? (
            <ul className={styles.verdictReasons}>
              {release.reasons.map(
                (reason) => (
                  <li key={reason}>
                    {reason}
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className={styles.goReason}>
              No representative Sev1 or Sev2
              blockers remain open.
            </p>
          )}
        </div>

        <div className={styles.recordedBand}>
          <div>
            <span>RECORDED SOURCE STATE</span>
            <strong>NO GO</strong>
          </div>

          <div>
            <span>SEV1 OPEN</span>
            <strong>1</strong>
          </div>

          <div>
            <span>SEV2 OPEN</span>
            <strong>2</strong>
          </div>

          <div>
            <span>REQUIREMENTS MAPPED</span>
            <strong>15/15</strong>
          </div>
        </div>

        <div className={styles.chapterEnd}>
          <span className={styles.endTrace}>
            REQUIREMENT → TEST → DEFECT →
            RELEASE
          </span>

          <Link
            href="/projects/cycleready"
            className={styles.projectLink}
          >
            Open CycleReady
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
