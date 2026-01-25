'use client';

import { bookingInfo } from '@/lib/booking';

const { eventTypes, addOns, calendlyUrl, domain, pricingLockedNote, specialServices, cancelPolicy, questions, confirmationMessage, meetingMode, boundaries } =
  bookingInfo;

const eventTypeClass = (recommended?: boolean) =>
  [
    'flex flex-col gap-2 rounded-2xl border p-3 shadow-sm transition-colors',
    recommended
      ? 'border-slate-300 bg-slate-50 dark:border-slate-500 dark:bg-slate-900'
      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/50',
  ].join(' ');

export default function BookingDetails() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-widest text-slate-500">Booking</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Calendly flow</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Primary domain confirmed on Vercel:{' '}
          <a className="font-medium text-slate-900 underline dark:text-slate-100" href={domain} rel="noreferrer" target="_blank">
            {domain}
          </a>
        </p>
        <a
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          href={calendlyUrl}
          rel="noreferrer"
          target="_blank"
        >
          Book on Calendly
        </a>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">All event types work through that link.</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{pricingLockedNote}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Event types</h4>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Locked pricing
          </span>
        </div>
        <div className="mt-3 space-y-3">
          {eventTypes.map((event) => (
            <div key={event.name} className={eventTypeClass(event.recommended)}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{event.name}</p>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{event.duration}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{event.priceLabel}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {event.recommended && <span className="rounded-full border border-teal-400 px-2 py-0.5 text-teal-700">Recommended</span>}
                {event.optional && <span className="rounded-full border border-slate-300 px-2 py-0.5 text-slate-600 dark:text-slate-300">Optional</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Service add-ons</h4>
        <ul className="mt-2 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          {specialServices.map((service) => (
            <li key={service.name}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900 dark:text-slate-100">{service.name}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{service.price}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Add-ons & policy</h4>
          <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Extras</span>
        </div>
        <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {addOns.map((addOn) => (
            <li key={addOn}>{addOn}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{cancelPolicy}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Booking questions</h4>
        <ol className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {questions.map((question) => (
            <li key={question} className="flex items-start gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">•</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Confirmation message</h4>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{confirmationMessage}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Meeting mode</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{meetingMode}</p>
        <h4 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Boundaries</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{boundaries}</p>
      </div>
    </div>
  );
}
