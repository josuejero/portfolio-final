'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { z } from 'zod';
import ContactForm from './ContactForm';
import type { FieldErrors, FormState } from './types';

const ContactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.').max(100, 'Name is too long.'),
  email: z.string().email(),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(5000, 'Message is too long.'),
  website: z.string().max(0).optional(),
});

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    };

  const validate = (): boolean => {
    const parsed = ContactSchema.safeParse(form);
    if (parsed.success) return true;

    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const pathKey = issue.path[0] as keyof FormState | undefined;
      if (pathKey && pathKey !== 'website') {
        fieldErrors[pathKey] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          // ignore
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

      <ContactForm
        form={form}
        errors={errors}
        submitting={submitting}
        onChange={onChange}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
