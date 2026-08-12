'use client';

import { CONTACT_FIELD_LIMITS } from '@/lib/contact/validation';
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import type {
  FieldErrors,
  FormState,
} from './types';

import styles from './ContactForm.module.css';

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  message: '',
  website: '',
};

interface ValidationResult {
  valid: boolean;
  errors: FieldErrors;
}

function validateForm(
  form: FormState,
  formElement: HTMLFormElement,
): ValidationResult {
  const errors: FieldErrors = {};

  if (
    form.website.length >
    CONTACT_FIELD_LIMITS.website.max
  ) {
    return {
      valid: false,
      errors,
    };
  }

  if (
    form.name.length <
    CONTACT_FIELD_LIMITS.name.min
  ) {
    errors.name =
      'Please enter your full name.';
  } else if (
    form.name.length >
    CONTACT_FIELD_LIMITS.name.max
  ) {
    errors.name =
      'Name is too long.';
  }

  const emailInput =
    formElement.elements.namedItem(
      'email',
    );

  if (
    !(
      emailInput instanceof
      HTMLInputElement
    ) ||
    emailInput.validity.valueMissing ||
    emailInput.validity.typeMismatch
  ) {
    errors.email =
      'Invalid email address';
  }

  if (
    form.message.length <
    CONTACT_FIELD_LIMITS.message.min
  ) {
    errors.message =
      'Message must be at least 10 characters.';
  } else if (
    form.message.length >
    CONTACT_FIELD_LIMITS.message.max
  ) {
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
        HTMLInputElement |
        HTMLTextAreaElement
      >,
    ) => {
      const value =
        event.target.value;

      setForm((current) => ({
        ...current,
        [field]: value,
      }));

      setErrors((current) => ({
        ...current,
        [field]: undefined,
        general: undefined,
      }));
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

      if (
        response.status === 204
      ) {
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
            detail = data.error;
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
    <div className={styles.wrapper}>
      {sent ? (
        <div
          role="status"
          className={styles.success}
        >
          <span>MESSAGE SENT</span>

          <p>
            Thanks. Your message has been
            submitted successfully.
          </p>
        </div>
      ) : null}

      {errors.general ? (
        <div
          role="alert"
          className={styles.errorBanner}
        >
          <span>SUBMISSION ERROR</span>

          <p>{errors.general}</p>
        </div>
      ) : null}

      <form
        className={styles.form}
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

        <div
          className={styles.field}
          data-invalid={
            errors.name
              ? 'true'
              : undefined
          }
        >
          <div className={styles.fieldTop}>
            <label htmlFor="name">
              Name
            </label>

            <span>01</span>
          </div>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
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
            minLength={
              CONTACT_FIELD_LIMITS.name.min
            }
            maxLength={
              CONTACT_FIELD_LIMITS.name.max
            }
            placeholder="Your name"
          />

          {errors.name ? (
            <p
              id="name-error"
              className={
                styles.fieldError
              }
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div
          className={styles.field}
          data-invalid={
            errors.email
              ? 'true'
              : undefined
          }
        >
          <div className={styles.fieldTop}>
            <label htmlFor="email">
              Email
            </label>

            <span>02</span>
          </div>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
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
            placeholder="you@example.com"
          />

          {errors.email ? (
            <p
              id="email-error"
              className={
                styles.fieldError
              }
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div
          className={styles.field}
          data-invalid={
            errors.message
              ? 'true'
              : undefined
          }
        >
          <div className={styles.fieldTop}>
            <label htmlFor="message">
              Message
            </label>

            <span>03</span>
          </div>

          <textarea
            id="message"
            name="message"
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
            minLength={
              CONTACT_FIELD_LIMITS.message.min
            }
            maxLength={
              CONTACT_FIELD_LIMITS.message.max
            }
            placeholder="What are you trying to build, fix, validate, or understand?"
          />

          <div className={styles.messageMeta}>
            {errors.message ? (
              <p
                id="message-error"
                className={
                  styles.fieldError
                }
              >
                {errors.message}
              </p>
            ) : (
              <span>
                INCLUDE THE CONTEXT THAT
                CHANGES THE PROBLEM.
              </span>
            )}

            <span>
              {form.message.length}/
              {
                CONTACT_FIELD_LIMITS
                  .message.max
              }
            </span>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={submitting}
        >
          <span>
            {submitting
              ? 'SENDING'
              : 'SEND MESSAGE'}
          </span>

          <span aria-hidden="true">
            {submitting ? '…' : '↗'}
          </span>
        </button>
      </form>
    </div>
  );
}
