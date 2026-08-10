import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section className="mx-auto max-w-reading space-y-10 py-6 lg:py-10">
      <div className="space-y-10">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            Contact
          </h1>

          <ContactForm />
        </div>

        <div className="space-y-4 rounded-panel border border-border/60 bg-card/60 p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground">
            What to expect next
          </h2>

          <p className="text-sm text-muted-foreground">
            I read every message and usually respond within two business days. If relevant materials can help explain the
            request, share them in the form above so I can jump in with context.
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Describe the goal, deliverables, or blockers you are trying to solve.
            </li>
            <li>
              • Let me know your preferred tone for the engagement (strategy session, code review, etc.).
            </li>
            <li>
              • If you have a deadline, include the most helpful date to hear back.
            </li>
          </ul>
        </div>

        <div className="space-y-4 rounded-panel border border-border/60 bg-surface-raised/60 p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground">
            Need a faster website refresh?
          </h2>

          <p className="text-sm text-muted-foreground">
            Visit the Website Help page to book a 60-minute review that sharpens copy, layout, and CTAs before launch.
          </p>

          <Link
            href="/website-help"
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'default',
              }),
              'w-fit font-semibold',
            )}
          >
            Explore Website Help
          </Link>
        </div>
      </div>
    </section>
  );
}
