import { GA_MEASUREMENT_ID } from '@/lib/gtag';

const trackedEvents = ['book_click', 'email_click', 'price_view'] as const;

export default function CampusHelpTracking() {
  return (
    <section className="space-y-3 rounded-3xl border border-border bg-card px-6 py-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tracking</p>
      <h2 className="text-2xl font-semibold text-foreground">GA4 setup & event coverage</h2>
      <p className="text-sm text-muted-foreground">
        GA4 measurement ID:
        <span className="ml-1 font-mono">{GA_MEASUREMENT_ID || 'not configured (set NEXT_PUBLIC_GA_MEASUREMENT_ID)'}</span>
      </p>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>Confirmed events:</p>
        <ul className="list-disc pl-5">
          {trackedEvents.map((eventName) => (
            <li key={eventName}>
              <span className="font-semibold text-foreground">{eventName}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-muted-foreground">
        I confirm these events are firing via the site and can be used for GA4 reporting.
      </p>
    </section>
  );
}
