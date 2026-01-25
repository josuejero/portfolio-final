'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/gtag';

export default function PricingViewTracker() {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) {
      return;
    }

    let hasTracked = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (hasTracked) {
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            trackEvent('price_view');
            hasTracked = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={triggerRef} className="pointer-events-none h-px" />;
}
