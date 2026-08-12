import {
  Suspense,
  type ReactNode,
} from 'react';

import SiteHeader from '@/components/common/SiteHeader';

import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';

import styles from './PortfolioShell.module.css';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <a
        href="#main-content"
        className={styles.skipLink}
      >
        Skip to content
      </a>

      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className={styles.main}
      >
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
