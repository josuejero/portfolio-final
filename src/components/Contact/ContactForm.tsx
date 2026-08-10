'use client';

import { Button } from '@/components/ui/button';
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import type {
  FieldErrors,
  FormState,
} from './types';

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  message: '',
  website: '',
};

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

interface ValidationResult {
  valid: boolean;
  errors: FieldErrors;
}

function validateForm(
  form: FormState,
  formElement: HTMLFormElement,
): ValidationResult {
  const errors: FieldErrors = {};

  // Preserve the existing honeypot behavior:
  // populated bot submissions fail silently.
  if (form.website.length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  if (form.name.length < 2) {
    errors.name =
      'Please enter your full name.';
  } else if (form.name.length > 100) {
    errors.name =
      'Name is too long.';
  }

  const emailInput =
    formElement.elements.namedItem('email');

  if (
    !(emailInput instanceof HTMLInputElement)
    || emailInput.validity.valueMissing
    || emailInput.validity.typeMismatch
  ) {
    errors.email =
      'Invalid email address';
  }

  if (form.message.length < 10) {
    errors.message =
      'Message must be at least 10 characters.';
  } else if (form.message.length > 5000) {
    errors.message =
      'Message is too long.';
  }

  return {
    valid:
      Object.keys(errors).length === 0,
    errors,
  };
}

export default function ContactForm() {
  const [form, setForm] =
    useState<FormState>(EMPTY_FORM);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [submitting, setSubmitting] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const onChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      const value =
        event.target.value;

      setForm(
        (current) => ({
          ...current,
          [field]: value,
        }),
      );

      setErrors(
        (current) => ({
          ...current,
          [field]: undefined,
          general: undefined,
        }),
      );
    };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrors({});
    setSent(false);

    const validation =
      validateForm(
        form,
        event.currentTarget,
      );

    if (!validation.valid) {
      setErrors(
        validation.errors,
      );

      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(form),
        },
      );

      if (response.status === 204) {
        setSent(true);
        setForm(EMPTY_FORM);
        return;
      }

      if (!response.ok) {
        let detail =
          'Failed to send message.';

        try {
          const data =
            await response.json();

          if (data?.error) {
            detail =
              data.error;
          }
        } catch {
          // Ignore invalid error payloads.
        }

        setErrors({
          general: detail,
        });

        return;
      }

      setSent(true);
      setForm(EMPTY_FORM);
    } catch {
      setErrors({
        general:
          'Network error. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {sent && (
        <div
          role="status"
          className="rounded-control border border-success/40 bg-success/10 p-3 text-sm text-foreground"
        >
          Thanks! Your message has been sent.
        </div>
      )}

      {errors.general && (
        <div
          role="alert"
          className="rounded-control border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground"
        >
          {errors.general}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
      >
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
          <label htmlFor="website">
            Leave this field empty
          </label>

          <input
            id="website"
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            value={form.website}
            onChange={
              onChange('website')
            }
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
            onChange={
              onChange('name')
            }
            aria-invalid={
              !!errors.name
            }
            aria-describedby={
              errors.name
                ? 'name-error'
                : undefined
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
            onChange={
              onChange('email')
            }
            aria-invalid={
              !!errors.email
            }
            aria-describedby={
              errors.email
                ? 'email-error'
                : undefined
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
            onChange={
              onChange('message')
            }
            aria-invalid={
              !!errors.message
            }
            aria-describedby={
              errors.message
                ? 'message-error'
                : undefined
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
          {submitting
            ? 'Sending…'
            : 'Send message'}
        </Button>
      </form>
    </>
  );
}
