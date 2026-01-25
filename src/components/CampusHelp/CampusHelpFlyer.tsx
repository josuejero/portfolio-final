'use client';

import Image from 'next/image';

type CampusHelpFlyerProps = {
  qrUrl: string;
  fallbackUrl: string;
};

export default function CampusHelpFlyer({ qrUrl, fallbackUrl }: CampusHelpFlyerProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card p-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Flyer QR</p>
        <h2 className="text-2xl font-semibold">Scan, track, and find campus help</h2>
        <p className="text-sm text-muted-foreground">
          Drop this QR on posters, slides, or signs. Every scan hits <span className="font-semibold text-foreground">/go/campus</span> and redirects with the campaign UTMs so we can see what works.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="rounded-3xl border border-border bg-background/90 p-4 shadow-sm">
          <Image
            src="/qr-campus.png"
            alt="QR code linking to campus help with tracking-ready UTMs"
            width={240}
            height={240}
            className="h-56 w-56 sm:h-60 sm:w-60 object-contain"
          />
          <p className="mt-3 text-xs font-semibold text-foreground">{fallbackUrl}</p>
          <p className="text-xs text-muted-foreground">Error correction H keeps the code scan-friendly with a clean quiet zone.</p>
        </div>
        <div className="flex-1 space-y-2 text-sm text-muted-foreground">
          <p>
            The QR encodes <span className="font-semibold text-foreground">{qrUrl}</span>, which will sit behind the /go/campus vanity URL and carry the utm_source=flyer + utm_medium=qr + utm_campaign=campus_help params.
          </p>
          <p className="text-xs">Print it in high contrast against a wide quiet zone so campus scanners land where the tracking can register.</p>
        </div>
      </div>
    </section>
  );
}
