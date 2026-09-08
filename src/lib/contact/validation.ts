export const CONTACT_FIELD_LIMITS = {
  name: {
    min: 2,
    max: 100,
  },
  message: {
    min: 10,
    max: 5000,
  },
  website: {
    // The hidden honeypot must accept a bounded non-empty value so
    // server-side bot handling can silently discard the submission.
    max: 200,
  },
} as const;
