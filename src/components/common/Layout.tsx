// src/components/common/Layout.tsx
'use client';

import { ReactNode, Suspense } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-20">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;