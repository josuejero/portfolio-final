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
      <main className={`
        flex-1 
        p-8 
        transition-all 
        duration-300
        ml-16 lg:ml-20  // Adjust margin based on sidebar width
        overflow-x-hidden
        w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)]  // Adjust width to account for sidebar
      `}>
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