'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  DQ_SCENARIOS,
  runValidationScenario,
  type DQValidationCheck,
} from '@/components/Projects/demos/dqsentry/model';
import { getProjectById } from '@/data/projects';

import styles from './DQSentryChapter.module.css';

const DQSENTRY_PROJECT = (() => {
  const project = getProjectById('dqsentry');

  if (!project) {
    throw new Error(
      'DQSentry is missing from the project catalog.',
    );
  }

  return project;
})();

const DEFAULT_SCENARIO = (() => {
  const scenario = DQ_SCENARIOS.find(
    (candidate) =>
      candidate.id === 'recorded-shape',
  );

  if (!scenario) {
    throw new Error(
      'DQSentry recorded-shape scenario is missing.',
    );
  }

  return scenario;
})();

function checkCode(
  check: DQValidationCheck,
): string {
  return check.id
    .replace(/^SIM-/, '')
    .replaceAll('-', ' / ');
}

export default function DQSentryChapter() {
  const [scenarioId, setScenarioId] =
    useState(DEFAULT_SCENARIO.id);

  const scenario = useMemo(
    () =>
      DQ_SCENARIOS.find(
        (candidate) =>
          candidate.id === scenarioId,
      ) ?? DEFAULT_SCENARIO,
    [scenarioId],
  );

  const result = useMemo(
    () =>
      runValidationScenario(
        scenario.id,
      ),
    [scenario.id],
  );

  const visibleFailures =
    result.failedChecks.slice(0, 5);

  return (
    <section
      className={styles.chapter}
      aria-labelledby="dqsentry-title"
    >
      <div className={styles.chapterInner}>
        <div className={styles.chapterMeta}>
          <span>03 / 04</span>
          <span>DATA QUALITY</span>
          <span>VALIDATE / SCORE / GATE</span>
        </div>

        <div className={styles.titleGrid}>
          <div>
            <p className={styles.titleKicker}>
              RAW DATA ENTERS. EVIDENCE LEAVES.
            </p>

            <h2
              id="dqsentry-title"
              className={styles.projectName}
            >
              DQSENTRY
            </h2>
          </div>

          <p className={styles.summary}>
            {DQSENTRY_PROJECT.summary}
          </p>
        </div>

        <div className={styles.scenarioBar}>
          <p className={styles.scenarioLabel}>
            VALIDATION STATE
          </p>

          <div
            className={styles.scenarioControls}
            role="group"
            aria-label="DQSentry validation scenarios"
          >
            {DQ_SCENARIOS.map(
              (candidate, index) => {
                const active =
                  candidate.id ===
                  scenario.id;

                return (
                  <button
                    key={candidate.id}
                    type="button"
                    aria-pressed={active}
                    className={[
                      styles.scenarioButton,
                      active
                        ? styles.scenarioButtonActive
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() =>
                      setScenarioId(
                        candidate.id,
                      )
                    }
                  >
                    <span
                      className={
                        styles.scenarioIndex
                      }
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>

                    <span>
                      {candidate.label}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div
          className={styles.validationField}
          aria-live="polite"
        >
          <div className={styles.ingestColumn}>
            <div className={styles.stageHeader}>
              <span>01</span>
              <strong>INGEST</strong>
            </div>

            <div className={styles.rawRows}>
              {[
                'districts.csv',
                'users.csv',
                'resources.csv',
                'events.csv',
                'newsletter.csv',
              ].map((dataset, index) => (
                <div
                  key={dataset}
                  className={styles.rawRow}
                >
                  <span>
                    {String(
                      index + 1,
                    ).padStart(2, '0')}
                  </span>

                  <strong>
                    {dataset}
                  </strong>

                  <span>
                    RAW
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.pipelineTrace}>
              <span>CSV</span>
              <span aria-hidden="true">→</span>
              <span>DUCKDB</span>
              <span aria-hidden="true">→</span>
              <span>PARQUET</span>
            </div>
          </div>

          <div className={styles.checkColumn}>
            <div className={styles.stageHeader}>
              <span>02</span>
              <strong>VALIDATE</strong>
            </div>

            <div className={styles.checkMatrix}>
              {result.scenario.checks.map(
                (check, index) => (
                  <span
                    key={check.id}
                    className={[
                      styles.checkCell,
                      check.status ===
                      'failed'
                        ? styles.checkCellFailed
                        : styles.checkCellPassed,
                    ].join(' ')}
                    title={`${check.label}: ${check.status}`}
                    aria-label={`Check ${index + 1}: ${check.label}, ${check.status}`}
                  >
                    {String(
                      index + 1,
                    ).padStart(2, '0')}
                  </span>
                ),
              )}
            </div>

            <div className={styles.matrixLegend}>
              <span>
                {result.scenario.checks.length}
                {' '}CHECKS
              </span>

              <span>
                {result.failedChecks.length}
                {' '}FAILED
              </span>

              <span>
                {
                  result.scenario.checks
                    .length -
                  result.failedChecks
                    .length
                }
                {' '}PASSED
              </span>
            </div>
          </div>

          <div className={styles.scoreColumn}>
            <div className={styles.stageHeader}>
              <span>03</span>
              <strong>SCORE</strong>
            </div>

            <div className={styles.scoreDisplay}>
              <strong>
                {result.score.toFixed(2)}
              </strong>

              <span>/ 100</span>
            </div>

            <div className={styles.scoreFormula}>
              <span>BASELINE</span>
              <strong>100</strong>

              <span>NORMALIZED PENALTY</span>
              <strong>
                {result.normalizedPenalty.toFixed(
                  4,
                )}
              </strong>
            </div>

            <div
              className={[
                styles.gateResult,
                result.gate.passed
                  ? styles.gatePass
                  : styles.gateBlock,
              ].join(' ')}
            >
              <span>QUALITY GATE</span>

              <strong>
                {result.gate.passed
                  ? 'PASS'
                  : 'BLOCK'}
              </strong>
            </div>
          </div>
        </div>

        <div className={styles.issueSection}>
          <div className={styles.issueIntro}>
            <div className={styles.stageHeader}>
              <span>04</span>
              <strong>EXPLAIN</strong>
            </div>

            <p>
              A failed check is not useful
              unless someone can understand
              what broke and what to do next.
            </p>
          </div>

          {visibleFailures.length > 0 ? (
            <div className={styles.failureList}>
              {visibleFailures.map(
                (check) => (
                  <article
                    key={check.id}
                    className={styles.failure}
                  >
                    <div
                      className={
                        styles.failureTop
                      }
                    >
                      <span
                        className={
                          styles.failureCode
                        }
                      >
                        {checkCode(check)}
                      </span>

                      <span
                        className={
                          styles.failureSeverity
                        }
                      >
                        SEV {check.severity}
                      </span>
                    </div>

                    <h3>{check.label}</h3>

                    <div
                      className={
                        styles.failureDetails
                      }
                    >
                      <div>
                        <span>
                          ROOT CAUSE
                        </span>

                        <p>
                          {check.rootCause ??
                            'No issue explanation required.'}
                        </p>
                      </div>

                      <div>
                        <span>
                          RECOMMENDED FIX
                        </span>

                        <p>
                          {check.recommendedFix ??
                            'No corrective action required.'}
                        </p>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className={styles.cleanState}>
              <span>CLEAN BASELINE</span>

              <strong>
                NO FAILED CHECKS
              </strong>

              <p>
                All representative checks
                passed and the dataset is
                eligible to move through the
                publish gate.
              </p>
            </div>
          )}
        </div>

        <div className={styles.publishBand}>
          <div className={styles.publishIntro}>
            <span>PUBLISH</span>

            <p>
              Cleansed data, issue history,
              exceptions, and scorecard
              artifacts remain reviewable
              after the validation run.
            </p>
          </div>

          <div className={styles.metric}>
            <strong>
              {result.scenario.checks.length}
            </strong>
            <span>VALIDATION CHECKS</span>
          </div>

          <div className={styles.metric}>
            <strong>
              {result.score.toFixed(2)}
            </strong>
            <span>QUALITY SCORE</span>
          </div>

          <div className={styles.metric}>
            <strong>
              {result.failedChecks.length}
            </strong>
            <span>FAILED CHECKS</span>
          </div>
        </div>

        <div className={styles.chapterEnd}>
          <span className={styles.endTrace}>
            INGEST → PROFILE → VALIDATE →
            SCORE → PUBLISH
          </span>

          <Link
            href="/projects/dqsentry"
            className={styles.projectLink}
          >
            Open DQSentry
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
