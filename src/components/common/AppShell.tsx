'use client';

import {
  Suspense,
  useState,
  type ReactNode,
} from 'react';

import Sidebar from '@/components/Sidebar/Sidebar';

import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-control bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-raised transition-transform duration-fast ease-standard focus:translate-y-0"
      >
        Skip to content
      </a>

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className={[
          'min-h-dvh w-full',
          'pb-[calc(5rem+env(safe-area-inset-bottom))]',
          'transition-[padding] duration-normal ease-standard',
          'md:pb-0',
          isSidebarCollapsed
            ? 'md:pl-16'
            : 'md:pl-64',
        ].join(' ')}
      >
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <div className="min-w-0 overflow-x-clip px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
