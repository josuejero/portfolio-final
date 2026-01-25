'use client';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

interface StickyBookingBarProps {
  href: string;
}

export default function StickyBookingBar({ href }: StickyBookingBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-live="polite"
    >
      <div className="mx-4 rounded-t-3xl border border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <span>Book a session</span>
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
