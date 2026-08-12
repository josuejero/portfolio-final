import {
  lazy,
  Suspense,
} from 'react';

import type { PortfolioProject } from '@/types/project';

import styles from './ProjectInteractiveDemo.module.css';

const FrameCastDemo = lazy(
  () => import('./FrameCastDemo'),
);

const HostDeskDemo = lazy(
  () => import('./HostDeskDemo'),
);

const BotMedicDemo = lazy(
  () => import('./BotMedicDemo'),
);

const DQSentryDemo = lazy(
  () => import('./DQSentryDemo'),
);

const CycleReadyDemo = lazy(
  () => import('./CycleReadyDemo'),
);

function DemoLoadingState() {
  return (
    <div className={styles.loading}>
      Loading interactive workspace…
    </div>
  );
}

interface ProjectInteractiveDemoProps {
  project: PortfolioProject;
}

export default function ProjectInteractiveDemo({
  project,
}: ProjectInteractiveDemoProps) {
  const demo = project.demo;

  if (!demo) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="interactive-demo-heading"
    >
      <div className={styles.heading}>
        <div>
          <span>INTERACTIVE SYSTEM</span>

          <h2
            id="interactive-demo-heading"
          >
            {demo.label}
          </h2>
        </div>

        <div className={styles.description}>
          <p>
            {demo.description}
          </p>

          {demo.disclaimer ? (
            <small>
              {demo.disclaimer}
            </small>
          ) : null}
        </div>
      </div>

      <div className={styles.demoSurface}>
        {demo.type ===
        'framecast-configurator' ? (
          <Suspense
            fallback={
              <DemoLoadingState />
            }
          >
            <FrameCastDemo />
          </Suspense>
        ) : null}

        {demo.type ===
        'hostdesk-operations' ? (
          <Suspense
            fallback={
              <DemoLoadingState />
            }
          >
            <HostDeskDemo />
          </Suspense>
        ) : null}

        {demo.type ===
        'botmedic-triage' ? (
          <Suspense
            fallback={
              <DemoLoadingState />
            }
          >
            <BotMedicDemo />
          </Suspense>
        ) : null}

        {demo.type ===
        'dqsentry-validator' ? (
          <Suspense
            fallback={
              <DemoLoadingState />
            }
          >
            <DQSentryDemo />
          </Suspense>
        ) : null}

        {demo.type ===
        'cycleready-release-room' ? (
          <Suspense
            fallback={
              <DemoLoadingState />
            }
          >
            <CycleReadyDemo />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
}
