'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  REPRESENTATIVE_INCIDENTS,
} from '@/components/Projects/demos/botmedic/model';
import { getProjectById } from '@/data/projects';

import styles from './BotMedicChapter.module.css';

const BOTMEDIC_PROJECT = (() => {
  const project = getProjectById('botmedic');

  if (!project) {
    throw new Error(
      'BotMedic is missing from the project catalog.',
    );
  }

  return project;
})();

const DEFAULT_INCIDENT = (() => {
  const incident = REPRESENTATIVE_INCIDENTS[0];

  if (!incident) {
    throw new Error(
      'BotMedic requires at least one incident fixture.',
    );
  }

  return incident;
})();

function getMetric(
  evidenceId: string,
  contains: string,
): string | null {
  const evidence =
    BOTMEDIC_PROJECT.evidence.find(
      (item) => item.id === evidenceId,
    );

  const segment = evidence?.value
    ?.split(' · ')
    .find((part) =>
      part
        .toLowerCase()
        .includes(contains.toLowerCase()),
    );

  return segment?.match(/[\d.]+%?/)?.[0] ?? null;
}

const ruleCount = getMetric(
  'botmedic-product-scope',
  'diagnostic rule',
);

const runbookCount = getMetric(
  'botmedic-product-scope',
  'runbook',
);

const testCount = getMetric(
  'botmedic-test-scope',
  'tests',
);

export default function BotMedicChapter() {
  const [incidentId, setIncidentId] =
    useState(DEFAULT_INCIDENT.id);

  const incident =
    REPRESENTATIVE_INCIDENTS.find(
      (candidate) =>
        candidate.id === incidentId,
    ) ?? DEFAULT_INCIDENT;

  return (
    <section
      className={styles.chapter}
      aria-labelledby="botmedic-title"
    >
      <div className={styles.chapterInner}>
        <div className={styles.chapterMeta}>
          <span>02 / 04</span>
          <span>INCIDENT TRIAGE</span>
          <span>/INCIDENT</span>
        </div>

        <div className={styles.titleRow}>
          <div>
            <p className={styles.titleKicker}>
              SIGNAL → EVIDENCE → RECOVERY
            </p>

            <h2
              id="botmedic-title"
              className={styles.projectName}
            >
              BOTMEDIC
            </h2>
          </div>

          <p className={styles.summary}>
            {BOTMEDIC_PROJECT.summary}
          </p>
        </div>

        <div className={styles.incidentRail}>
          <p className={styles.railLabel}>
            REPLAY INCIDENT
          </p>

          <div
            className={styles.incidentChoices}
            role="group"
            aria-label="Representative BotMedic incidents"
          >
            {REPRESENTATIVE_INCIDENTS.map(
              (candidate, index) => {
                const active =
                  candidate.id === incident.id;

                return (
                  <button
                    key={candidate.id}
                    type="button"
                    aria-pressed={active}
                    className={[
                      styles.incidentButton,
                      active
                        ? styles.incidentButtonActive
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() =>
                      setIncidentId(candidate.id)
                    }
                  >
                    <span
                      className={styles.choiceIndex}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={styles.choiceTitle}
                    >
                      {candidate.title}
                    </span>

                    <span
                      className={styles.choiceSeverity}
                      data-severity={
                        candidate.severity
                      }
                    >
                      {candidate.severity}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div
          className={styles.diagnosticSurface}
          aria-live="polite"
        >
          <div className={styles.signalPanel}>
            <div className={styles.stageHeading}>
              <span>01</span>
              <strong>SIGNAL</strong>
            </div>

            <div className={styles.severityLine}>
              <span
                className={styles.severityDot}
                data-severity={incident.severity}
                aria-hidden="true"
              />

              <span>
                {incident.severity.toUpperCase()}
                {' '}SEVERITY
              </span>
            </div>

            <h3>{incident.title}</h3>

            <p className={styles.symptom}>
              {incident.symptom}
            </p>
          </div>

          <div className={styles.evidencePanel}>
            <div className={styles.stageHeading}>
              <span>02</span>
              <strong>EVIDENCE</strong>
            </div>

            <ol className={styles.evidenceList}>
              {incident.evidence.map(
                (item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">
                      0{index + 1}
                    </span>
                    <p>{item}</p>
                  </li>
                ),
              )}
            </ol>
          </div>

          <div className={styles.diagnosisPanel}>
            <div className={styles.stageHeading}>
              <span>03</span>
              <strong>DIAGNOSIS</strong>
            </div>

            <p className={styles.ruleLabel}>
              MATCHED RULE
            </p>

            <p className={styles.rule}>
              {incident.matchedRule}
            </p>

            <p className={styles.diagnosis}>
              {incident.diagnosis}
            </p>

            <div className={styles.runbook}>
              <span>RUNBOOK</span>
              <strong>
                {incident.runbook}
              </strong>
            </div>
          </div>
        </div>

        <div className={styles.recovery}>
          <div className={styles.recoveryIntro}>
            <div className={styles.stageHeading}>
              <span>04</span>
              <strong>RECOVERY</strong>
            </div>

            <p>
              Turn the diagnosis into a bounded
              recovery sequence, then verify the
              support path again.
            </p>
          </div>

          <ol className={styles.recoverySteps}>
            {incident.recoverySteps.map(
              (step, index) => (
                <li key={step}>
                  <span
                    className={styles.recoveryNumber}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>

                  <p>{step}</p>
                </li>
              ),
            )}
          </ol>
        </div>

        <div className={styles.proofBand}>
          <div className={styles.proofIntro}>
            <span>RECORDED SCOPE</span>
            <p>
              Shared rules drive command behavior,
              regression fixtures, and generated
              support documentation.
            </p>
          </div>

          {ruleCount ? (
            <div className={styles.metric}>
              <strong>{ruleCount}</strong>
              <span>DIAGNOSTIC RULES</span>
            </div>
          ) : null}

          {runbookCount ? (
            <div className={styles.metric}>
              <strong>{runbookCount}</strong>
              <span>GENERATED RUNBOOKS</span>
            </div>
          ) : null}

          {testCount ? (
            <div className={styles.metric}>
              <strong>{testCount}</strong>
              <span>AUTOMATED TESTS</span>
            </div>
          ) : null}
        </div>

        <div className={styles.chapterEnd}>
          <span className={styles.endTrace}>
            DISCORD → WORKER → RULE → RUNBOOK
          </span>

          <Link
            href="/projects/botmedic"
            className={styles.projectLink}
          >
            Open BotMedic
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
