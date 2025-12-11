'use client';

import React from 'react';
import { z } from 'zod';

type FormState = {
  name: string;
  email: string;
  message: string;
  // Honeypot (should stay empty)
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>> & { general?: string; };

const ContactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.').max(100, 'Name is too long.'),
  email: z.string().email(),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(5000, 'Message is too long.'),
  // Honeypot: allow empty only (bots tend to fill it). We won't show client error if they do.
  website: z.string().max(0).optional(),
});

export default function Contact() {
  const [form, setForm] = React.useState<FormState>({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot — leave empty
  });

  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [field]: value }));
      // Live-clear error for this field
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    };

  const validate = (): boolean => {
    const parsed = ContactSchema.safeParse(form);
    if (parsed.success) return true;

    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const pathKey = issue.path[0] as keyof FormState | undefined;
      if (pathKey && pathKey !== 'website') {
        // Do not surface honeypot errors to real users
        fieldErrors[pathKey] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSent(false);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // Server may return:
      // - 200 { ok: true } on success
      // - 204 (no content) if honeypot trips — treat as success silently
      // - 400 { error } on validation
      // - 429 { error } on rate-limit
      // - 502 { error } on upstream failure
      if (res.status === 204) {
        setSent(true);
        setForm({ name: '', email: '', message: '', website: '' });
        return;
      }

      if (!res.ok) {
        let detail = 'Failed to send message.';
        try {
          const data = await res.json();
          if (data?.error) detail = data.error;
        } catch {
          // ignore JSON parse errors
        }
        setErrors({ general: detail });
        return;
      }

      setSent(true);
      setForm({ name: '', email: '', message: '', website: '' });
    } catch {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>

      {sent && (
        <div
          role="status"
          className="mb-4 rounded-md border border-green-300 bg-green-50 p-3 text-green-800"
        >
          Thanks! Your message has been sent.
        </div>
      )}

      {errors.general && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-800"
        >
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot: visually hidden but still present in DOM */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            value={form.website}
            onChange={onChange('website')}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-md border p-2"
            value={form.name}
            onChange={onChange('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
            minLength={2}
            maxLength={100}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border p-2"
            value={form.email}
            onChange={onChange('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="mb-1 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="min-h-[140px] w-full rounded-md border p-2"
            value={form.message}
            onChange={onChange('message')}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            required
            minLength={10}
            maxLength={5000}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 font-medium disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </section>
  );
}
