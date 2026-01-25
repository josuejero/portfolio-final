'use client';

import Link from 'next/link';

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: 'Do you meet in person?',
    answer:
      'Sessions are remote-only on Zoom. The link is in your Calendly confirmation so we can share screens and code together.',
  },
  {
    question: 'Do you do clubs?',
    answer:
      'Absolutely—clubs get the same prep, notes, and follow-up. Share the goals and headcount in the contact form so we can tailor the agenda for a Zoom meeting.',
  },
  {
    question: 'Do you offer same-day?',
    answer:
      'Often yes when the schedule allows—shoot me a note and I will confirm within a business day. Same-day slots are limited, so it helps to follow up quickly.',
  },
  {
    question: 'What if we don’t finish?',
    answer:
      'We end with a clear status update, action items, and any blockers I spotted. You are always welcome to book a follow-up or message for quick clarifications.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      'Bring your laptop, charger, and repository or design files. Share screenshots or drafts ahead of time so we can jump right into the Zoom call.',
  },
  {
    question: 'Do you guarantee outcomes?',
    answer:
      'I don’t promise specific offers, but I guarantee honest feedback, clarity on the next moves, and follow-up notes that recap what we covered.',
  },
  {
    question: 'Do you help with homework?',
    answer:
      'Yes—think of it as guided work. I explain concepts, debug code, and coach your next steps without doing the assignment for you.',
  },
  {
    question: 'Can I just ask one quick question for free?',
    answer: 'Quick Fix is built for that. If it’s truly tiny, I’ll tell you in 1 minute.',
  },
];

export default function CampusHelpFAQ() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">FAQ</p>
        <h2 className="text-2xl font-semibold">Need answers before you hit book?</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl border border-border bg-card px-5 py-4">
            <h3 className="text-base font-semibold">{faq.question}</h3>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </article>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Still curious? <Link href="/contact" className="text-primary underline">Let me know what you need</Link> and we will craft the right slot.
      </p>
    </section>
  );
}
