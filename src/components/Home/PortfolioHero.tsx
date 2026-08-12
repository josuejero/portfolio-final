'use client';

import Link from 'next/link';
import { useState } from 'react';

import { siteConfig } from '@/config/site';
import { ROLE_LENSES } from '@/data/role-lenses';

import EngineeringTrace from './EngineeringTrace';

import styles from './PortfolioHero.module.css';

const MODE_IDS = [
  'software-engineering',
  'quality-engineering',
  'data-quality',
  'platform-support',
] as const;

type ModeId = (typeof MODE_IDS)[number];

const traceCopy: Record<
  ModeId,
  {
    eyebrow: string;
    steps: readonly [
      string,
      string,
      string,
      string,
    ];
  }
> = {
  'software-engineering': {
    eyebrow: 'Application flow',
    steps: [
      'REQUEST',
      'ROUTE',
      'STATE',
      'SHIP',
    ],
  },
  'quality-engineering': {
    eyebrow: 'Quality gate',
    steps: [
      'REQUIREMENT',
      'TEST',
      'EVIDENCE',
      'RELEASE',
    ],
  },
  'data-quality': {
    eyebrow: 'Data flow',
    steps: [
      'INGEST',
      'VALIDATE',
      'SCORE',
      'REPORT',
    ],
  },
  'platform-support': {
    eyebrow: 'Incident flow',
    steps: [
      'SIGNAL',
      'DIAGNOSE',
      'RECOVER',
      'VERIFY',
    ],
  },
};

function getLens(id: ModeId) {
  const lens = ROLE_LENSES.find(
    (candidate) => candidate.id === id,
  );

  if (!lens) {
    throw new Error(
      `Missing public role lens: ${id}`,
    );
  }

  return lens;
}

export default function PortfolioHero() {
  const [activeMode, setActiveMode] =
    useState<ModeId>(
      'software-engineering',
    );

  const activeIndex =
    MODE_IDS.indexOf(activeMode);
  const activeLens = getLens(activeMode);
  const trace = traceCopy[activeMode];

  return (
    <section
      className={styles.hero}
      aria-labelledby="portfolio-hero-title"
    >
      <div className={styles.heroInner}>
        <div className={styles.titleBlock}>
          <div className={styles.kickerRow}>
            <p className={styles.kicker}>
              Engineering portfolio / 2026
            </p>

            <p
              className={styles.modeIndex}
              aria-hidden="true"
            >
              0{activeIndex + 1} / 04
            </p>
          </div>

          <h1
            id="portfolio-hero-title"
            className={styles.title}
          >
            <span className={styles.name}>
              {siteConfig.person.name}
            </span>

            <span
              className={styles.statement}
            >
              I BUILD SYSTEMS
            </span>

            <span
              className={[
                styles.statement,
                styles.statementOffset,
              ].join(' ')}
            >
              THAT HAVE TO WORK.
            </span>
          </h1>
        </div>

        <div className={styles.lowerGrid}>
          <div
            className={styles.modePanel}
            aria-label="Portfolio role lens"
          >
            <p className={styles.panelLabel}>
              Change the system lens
            </p>

            <div
              className={styles.modeList}
              role="group"
              aria-label="Engineering modes"
            >
              {MODE_IDS.map(
                (modeId, index) => {
                  const lens =
                    getLens(modeId);
                  const isActive =
                    modeId === activeMode;

                  return (
                    <button
                      key={modeId}
                      type="button"
                      className={[
                        styles.modeButton,
                        isActive
                          ? styles.modeButtonActive
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-pressed={
                        isActive
                      }
                      onClick={() =>
                        setActiveMode(
                          modeId,
                        )
                      }
                    >
                      <span
                        className={
                          styles.modeButtonIndex
                        }
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>

                      <span>
                        {lens.shortLabel}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div
              className={
                styles.activeModeMeta
              }
              aria-live="polite"
            >
              <span
                className={
                  styles.activeModeDot
                }
                aria-hidden="true"
              />

              <div>
                <p
                  className={
                    styles.activeModeTitle
                  }
                >
                  {activeLens.label}
                </p>

                <p
                  className={
                    styles.activeModeFlow
                  }
                >
                  {trace.eyebrow}
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <Link
                href="/projects"
                className={
                  styles.primaryAction
                }
              >
                Explore the work
                <span aria-hidden="true">
                  ↗
                </span>
              </Link>

              <Link
                href="/contact"
                className={
                  styles.secondaryAction
                }
              >
                Start a conversation
              </Link>
            </div>
          </div>

          <div className={styles.traceFrame}>
            <div className={styles.traceMeta}>
              <span>
                SYSTEM TRACE
              </span>

              <span>
                {trace.eyebrow}
              </span>
            </div>

            <EngineeringTrace
              modeIndex={activeIndex}
              steps={trace.steps}
            />

            <div
              className={styles.traceLegend}
              aria-hidden="true"
            >
              <span>
                INPUT
              </span>
              <span>
                STATE
              </span>
              <span>
                OUTPUT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
