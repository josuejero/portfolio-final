'use client';

import { Button } from '@/components/ui/button';
import type { ChangeEvent, FormEvent } from 'react';

import type { FieldErrors, FormState } from './types';

interface Props {
  form: FormState;
  errors: FieldErrors;
  submitting: boolean;
  onChange: (
    field: keyof FormState,
  ) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const fieldClassName = [
  'w-full rounded-control border border-input',
  'bg-background px-3 py-2 text-sm text-foreground',
  'transition-colors duration-fast ease-standard',
  'placeholder:text-muted-foreground',
  'focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-brand',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  'aria-[invalid=true]:border-destructive',
  'aria-[invalid=true]:focus-visible:ring-destructive',
].join(' ');

export default function ContactForm({
  form,
  errors,
  submitting,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
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
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClassName}
          value={form.name}
          onChange={onChange('name')}
          aria-invalid={!!errors.name}
          aria-describedby={
            errors.name ? 'name-error' : undefined
          }
          required
          minLength={2}
          maxLength={100}
        />

        {errors.name && (
          <p
            id="name-error"
            className="mt-1 text-sm text-destructive"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClassName}
          value={form.email}
          onChange={onChange('email')}
          aria-invalid={!!errors.email}
          aria-describedby={
            errors.email ? 'email-error' : undefined
          }
          required
        />

        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-destructive"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          className={`${fieldClassName} min-h-[140px] resize-y`}
          value={form.message}
          onChange={onChange('message')}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? 'message-error' : undefined
          }
          required
          minLength={10}
          maxLength={5000}
        />

        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-destructive"
          >
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
