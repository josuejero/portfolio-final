import proofJson from '../../proof-assets/data.json';

const campaignUtmParams = '?utm_source=flyer&utm_medium=qr&utm_campaign=campus_help';

const calendlyLinks = {
  quickFix: `https://calendly.com/josuejero/30min${campaignUtmParams}`,
  standard: `https://calendly.com/josuejero/60-min-standard${campaignUtmParams}`,
  deepWork: `https://calendly.com/josuejero/120-min-deep-work${campaignUtmParams}`,
} as const;

export type SessionLinks = typeof calendlyLinks;

export type BookingEventType = {
  name: string;
  duration: string;
  priceLabel: string;
  description: string;
  optional?: boolean;
  recommended?: boolean;
};

export type SpecialService = {
  name: string;
  price: string;
  description: string;
};

export type ProofAsset = {
  title: string;
  result: string;
  link: string;
  linkLabel: string;
};

type ProofData = {
  testimonial: string;
  items: ProofAsset[];
};

const proofData = proofJson as ProofData;

export const bookingInfo = {
  calendlyUrl: calendlyLinks.standard,
  domain: 'https://portfolio-josuejero.vercel.app',
  pricingLockedNote: 'Pricing is final for v1. No changes during this phase.',
  eventTypes: [
    {
      name: 'Quick Fix',
      duration: '30 minutes',
      priceLabel: '$25',
      description: 'Surface a single bug or concept, pair for a quick correction, and get back to work.',
    },
    {
      name: 'Standard Session',
      duration: '60 minutes',
      priceLabel: '$45',
      description: 'Pair on a feature, debug an assignment, or build toward a launch with a full hour.',
      recommended: true,
    },
    {
      name: 'Deep Work',
      duration: '120 minutes',
      priceLabel: '$80',
      description: 'Optional extended span for tackling a large build, architecture review, or debugging sprint.',
      optional: true,
    },
  ] satisfies BookingEventType[],
  specialServices: [
    {
      name: 'Resume Tune-Up',
      price: '$60',
      description: 'Polish bullets, clarify outcomes, and export a resume that mirrors the new messaging.',
    },
    {
      name: 'Fast Launch Site',
      price: '$200',
      description: 'Design, build, and deploy a lean marketing page or project site from scratch.',
    },
  ] satisfies SpecialService[],
  addOns: ['Rush +$15', 'After-hours +$10', 'Group $15/person/hour (4 min)'],
  cancelPolicy: 'Cancel free until 12 hours before the session.',
  questions: [
    'What are you trying to accomplish? (1–2 sentences)',
    'Link(s) / file(s) (optional)',
    'Preferred: on campus or online?',
  ],
  confirmationMessage:
    'Bring your laptop + any links/files. We’ll start by clarifying the goal and then execute.',
  meetingMode: 'On campus (public spots) or online.',
  boundaries: "I tutor concepts and debugging; I won’t complete graded work.",
  proofAssets: proofData.items,
  testimonial: proofData.testimonial,
  sessionLinks: calendlyLinks,
} as const;
