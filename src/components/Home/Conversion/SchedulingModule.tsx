'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/gtag';

const BASE_CALENDLY_URL = 'https://calendly.com/josuejero/60-min-standard';

type IntakeForm = {
  siteType: string;
  deadline: string;
  currentLink: string;
  mustHavePages: string;
};

const initialForm: IntakeForm = {
  siteType: '',
  deadline: '',
  currentLink: '',
  mustHavePages: ''
};

export default function SchedulingModule() {
  const [formData, setFormData] = useState(initialForm);
  const [iframeSrc, setIframeSrc] = useState(BASE_CALENDLY_URL);
  const [status, setStatus] = useState(
    'Share a few details so the scheduler loads with context and I can prep the right questions.'
  );
  const [lastSubmitted, setLastSubmitted] = useState<IntakeForm | null>(null);

  const summary = useMemo(() => {
    if (!lastSubmitted) return 'No intake yet; feel free to pick a slot and I will follow up.';
    const scenario = lastSubmitted.siteType || 'project';
    const deadline = lastSubmitted.deadline ? ` by ${lastSubmitted.deadline}` : '';
    return `Captured: ${scenario}${deadline}. I will review the link and must-haves before our call.`;
  }, [lastSubmitted]);

  const createQuery = (data: IntakeForm) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value.trim()) {
        params.set(key, value);
      }
    });
    return params.toString() ? `${BASE_CALENDLY_URL}?${params.toString()}` : BASE_CALENDLY_URL;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextUrl = createQuery(formData);
    setIframeSrc(nextUrl);
    setLastSubmitted(formData);
    setStatus('Context saved. The scheduler now carries your intake data.');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intakeData', JSON.stringify(formData));
    }
  };

  const handleOpenScheduler = () => {
    trackEvent('footer_cta_click', { location: 'footer', name: 'open-calendly' });

    if (typeof window !== 'undefined') {
      window.open(iframeSrc, '_blank', 'noopener,noreferrer');
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <section
      id="schedule"
      className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm shadow-slate-900/5 backdrop-blur"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Schedule</p>
          <h2 className="text-2xl font-semibold text-foreground">Mini intake + inline Calendly</h2>
          <p className="text-sm text-muted-foreground">
            Drop in a few project facts so the booking call is focused on the right outcomes.
          </p>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{status}</p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Site type</span>
            <select
              name="siteType"
              value={formData.siteType}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/60 bg-background/80 px-4 py-2 text-sm focus:border-sky-500 focus:outline-none"
            >
              <option value="">Pick a category</option>
              <option value="portfolio">Portfolio / personal brand</option>
              <option value="club">Community / club site</option>
              <option value="business">Small business</option>
              <option value="product">Product / SaaS</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Deadline</span>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/60 bg-background/80 px-4 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Current link</span>
            <input
              type="url"
              name="currentLink"
              placeholder="https://example.com"
              value={formData.currentLink}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/60 bg-background/80 px-4 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Must-have pages</span>
            <textarea
              name="mustHavePages"
              rows={2}
              placeholder="List the key pages you can’t launch without"
              value={formData.mustHavePages}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/60 bg-background/80 px-4 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-sky-950 shadow-sm transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            Refresh scheduler
          </button>
          <button
            type="button"
            data-cta-location="footer"
            data-cta-name="schedule-call"
            onClick={handleOpenScheduler}
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            Open Calendly (mobile ready)
          </button>
        </div>
      </form>

      <div className="mt-6 rounded-3xl border border-border/60 bg-slate-900/80">
        <iframe
          title="Schedulable meeting"
          src={iframeSrc}
          className="h-[480px] w-full min-h-[480px] border-0"
          loading="lazy"
          scrolling="no"
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{summary}</p>
    </section>
  );
}
