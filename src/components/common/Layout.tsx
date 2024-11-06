// src/components/common/Layout.tsx
'use client';

import { ReactNode, Suspense, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <main 
        className={`flex-1 relative
                    w-full max-w-[100vw] min-h-screen
                    px-4 sm:px-6 lg:px-8 
                    py-4 sm:py-6 lg:py-8
                    transition-all duration-300
                    md:ml-16
                    ${isMobile ? 'mb-16' : ''}`} // Add bottom margin on mobile for navigation bar
      >
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <div className="max-w-full overflow-x-hidden">
              {children}
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;