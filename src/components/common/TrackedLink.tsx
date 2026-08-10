'use client';

import Link from 'next/link';
import type {
  AnchorHTMLAttributes,
  MouseEvent,
} from 'react';

import {
  trackEvent,
  type TrackEventSpec,
} from '@/lib/gtag';

interface TrackedLinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  > {
  href: string;
  events?: TrackEventSpec[];
}

export default function TrackedLink({
  href,
  events,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    events?.forEach(({ name, params }) => {
      trackEvent(name, params);
    });

    onClick?.(event);
  };

  const isInternalRoute =
    href.startsWith('/') && !href.startsWith('//');

  if (isInternalRoute) {
    return (
      <Link
        href={href}
        {...props}
        onClick={handleClick}
      />
    );
  }

  return (
    <a
      href={href}
      {...props}
      onClick={handleClick}
    />
  );
}
