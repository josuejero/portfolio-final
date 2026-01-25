'use client';

import { ClipboardDocumentIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export type ContactDetail = {
  label: string;
  value: string;
  helper?: string;
};

interface ContactStripProps {
  details: ContactDetail[];
}

export default function ContactStrip({ details }: ContactStripProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (value: string) => {
    if (!navigator?.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => {
        setCopied((current) => (current === value ? null : current));
      }, 1800);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="flex flex-col gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-sm shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{detail.label}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="flex-1 truncate font-semibold text-foreground">{detail.value}</p>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              onClick={() => copyToClipboard(detail.value)}
              aria-label={`Copy ${detail.label}`}
            >
              {copied === detail.value ? (
                <CheckCircleIcon className="h-4 w-4 text-emerald-500" aria-hidden />
              ) : (
                <ClipboardDocumentIcon className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {copied === detail.value ? 'Copied!' : detail.helper ?? 'Tap to copy'}
          </p>
        </div>
      ))}
    </div>
  );
}
