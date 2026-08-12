'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  INITIAL_PROSPECTS,
  QUEUE_LABELS,
  type HostDeskQueueSlice,
} from '@/components/Projects/demos/hostdesk/model';
import { getProjectById } from '@/data/projects';

import styles from './HostDeskChapter.module.css';

const FLOW = [
  'research-needed',
  'first-touch',
  'meeting-booked',
  'handoff-ready',
] as const satisfies readonly HostDeskQueueSlice[];

const HOSTDESK_PROJECT = (() => {
  const project = getProjectById('hostdesk');

  if (!project) {
    throw new Error(
      'HostDesk is missing from the project catalog.',
    );
  }

  return project;
})();

const systemScope =
  HOSTDESK_PROJECT.evidence.find(
    (item) =>
      item.id === 'hostdesk-system-scope',
  );

const testScope =
  HOSTDESK_PROJECT.evidence.find(
    (item) =>
      item.id === 'hostdesk-test-scope',
  );

function firstMetricSegment(
  value: string | undefined,
): string | null {
  if (!value) {
    return null;
  }

  return value.split(' · ')[0] ?? value;
}

const systemMetric =
  firstMetricSegment(systemScope?.value);

const testMetric =
  firstMetricSegment(testScope?.value);

export default function HostDeskChapter() {
  const [activeStep, setActiveStep] =
    useState(2);

  const activeQueue = FLOW[activeStep];

  const exactProspect =
    INITIAL_PROSPECTS.find(
      (prospect) =>
        prospect.queue === activeQueue,
    );

  const handoffCandidate =
    INITIAL_PROSPECTS.find(
      (prospect) =>
        prospect.id ===
        'prospect-harbor',
    );

  const activeProspect =
    exactProspect ??
    handoffCandidate ??
    INITIAL_PROSPECTS[0];

  if (!activeProspect) {
    return null;
  }

  const progress =
    FLOW.length > 1
      ? (activeStep / (FLOW.length - 1)) *
        100
      : 0;

  return (
    <section
      className={styles.chapter}
      aria-labelledby="hostdesk-title"
    >
      <div className={styles.chapterInner}>
        <div className={styles.chapterMeta}>
          <span>01 / 04</span>
          <span>OPERATIONS SYSTEM</span>
          <span>HOSTDESK</span>
        </div>

        <div className={styles.titleGrid}>
          <h2
            id="hostdesk-title"
            className={styles.projectName}
          >
            HOSTDESK
          </h2>

          <div
            className={styles.summaryBlock}
          >
            <p className={styles.summaryLabel}>
              AUTHENTICATED WORKFLOW /
              PERSISTED STATE
            </p>

            <p className={styles.summary}>
              {HOSTDESK_PROJECT.summary}
            </p>
          </div>
        </div>

        <div className={styles.systemGrid}>
          <div className={styles.flowPanel}>
            <p className={styles.panelLabel}>
              Representative workflow
            </p>

            <div
              className={styles.flowSteps}
              role="group"
              aria-label="HostDesk workflow states"
            >
              {FLOW.map(
                (queue, index) => {
                  const isActive =
                    index === activeStep;

                  return (
                    <button
                      key={queue}
                      type="button"
                      aria-pressed={
                        isActive
                      }
                      className={[
                        styles.flowButton,
                        isActive
                          ? styles.flowButtonActive
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() =>
                        setActiveStep(index)
                      }
                    >
                      <span
                        className={
                          styles.flowIndex
                        }
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>

                      <span
                        className={
                          styles.flowLabel
                        }
                      >
                        {
                          QUEUE_LABELS[
                            queue
                          ]
                        }
                      </span>

                      <span
                        className={
                          styles.flowState
                        }
                        aria-hidden="true"
                      >
                        {isActive
                          ? 'ACTIVE'
                          : '—'}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div
              className={styles.progressTrack}
              aria-hidden="true"
            >
              <span
                className={
                  styles.progressFill
                }
                style={{
                  width: `${progress}%`,
                }}
              />

              <span
                className={
                  styles.progressMarker
                }
                style={{
                  left: `${progress}%`,
                }}
              />
            </div>

            <div className={styles.proofRow}>
              {systemMetric ? (
                <div
                  className={styles.proof}
                >
                  <strong>
                    {systemMetric.replace(
                      /[^0-9/]/g,
                      '',
                    )}
                  </strong>
                  <span>
                    API ROUTES
                  </span>
                </div>
              ) : null}

              {testMetric ? (
                <div
                  className={styles.proof}
                >
                  <strong>
                    {testMetric.replace(
                      /[^0-9/]/g,
                      '',
                    )}
                  </strong>
                  <span>
                    EXECUTABLE TESTS
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.workspace}>
            <div
              className={
                styles.workspaceHeader
              }
            >
              <div>
                <span
                  className={
                    styles.workspaceEyebrow
                  }
                >
                  ACTIVE RECORD
                </span>

                <h3>
                  {activeProspect.company}
                </h3>
              </div>

              <div
                className={styles.queueBadge}
              >
                <span>QUEUE</span>
                <strong>
                  {
                    QUEUE_LABELS[
                      activeQueue
                    ]
                  }
                </strong>
              </div>
            </div>

            <div
              className={
                styles.workspaceBody
              }
            >
              <div
                className={
                  styles.contactBlock
                }
              >
                <span
                  className={
                    styles.dataLabel
                  }
                >
                  CONTACT
                </span>

                <strong>
                  {activeProspect.contactName}
                </strong>

                <span
                  className={
                    styles.dataSecondary
                  }
                >
                  {activeProspect.role}
                </span>
              </div>

              <div
                className={styles.scoreBlock}
              >
                <span
                  className={
                    styles.dataLabel
                  }
                >
                  FIT SCORE
                </span>

                <strong
                  className={styles.score}
                >
                  {activeProspect.fitScore}
                </strong>

                <span
                  className={
                    styles.scoreScale
                  }
                >
                  / 100
                </span>
              </div>

              <div
                className={
                  styles.attributeGrid
                }
              >
                <div>
                  <span
                    className={
                      styles.dataLabel
                    }
                  >
                    REGION
                  </span>

                  <strong>
                    {activeProspect.region}
                  </strong>
                </div>

                <div>
                  <span
                    className={
                      styles.dataLabel
                    }
                  >
                    SEGMENT
                  </span>

                  <strong>
                    {activeProspect.segment}
                  </strong>
                </div>
              </div>

              <div
                className={
                  styles.systemNote
                }
              >
                <span
                  className={
                    styles.dataLabel
                  }
                >
                  NEXT ACTION
                </span>

                <p>
                  {
                    activeProspect.nextAction
                  }
                </p>
              </div>
            </div>

            <div
              className={
                styles.workspaceFooter
              }
            >
              <span>
                PERSISTED WORKFLOW DATA
              </span>
              <span>
                AUTHENTICATED MUTATIONS
              </span>
              <span>
                STAGE GATES
              </span>
            </div>
          </div>
        </div>

        <div className={styles.chapterEnd}>
          <div>
            <p className={styles.endLabel}>
              FULL SYSTEM
            </p>

            <p className={styles.endCopy}>
              Queue management, notes,
              cadence work, security controls,
              persistence, and handoff logic.
            </p>
          </div>

          <Link
            href="/projects/hostdesk"
            className={styles.caseStudyLink}
          >
            Open HostDesk
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
