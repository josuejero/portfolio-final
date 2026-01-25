'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackEvent, type TrackEventSpec } from '@/lib/gtag';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  events?: TrackEventSpec[];
}

export default function TrackedLink({ events, onClick, ...props }: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    events?.forEach(({ name, params }) => {
      trackEvent(name, params);
    });

    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}
