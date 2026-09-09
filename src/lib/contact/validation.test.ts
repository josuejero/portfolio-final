import { describe, expect, it } from 'vitest';

import { CONTACT_FIELD_LIMITS } from './validation';

describe('contact field limits', () => {
  it('allows a bounded honeypot value to reach server-side bot handling', () => {
    expect(
      CONTACT_FIELD_LIMITS.website.max,
    ).toBeGreaterThanOrEqual(
      'filled-by-bot'.length,
    );
  });
});
