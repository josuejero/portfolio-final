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
    max: 0,
  },
} as const;
