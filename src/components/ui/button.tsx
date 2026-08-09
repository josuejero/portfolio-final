import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'whitespace-nowrap font-medium',
    'transition-colors duration-fast ease-standard',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-brand',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-brand text-brand-foreground shadow-soft hover:bg-brand-hover',

        outline:
          'border border-border bg-background text-foreground hover:bg-muted',

        subtle:
          'border border-brand/40 bg-brand/10 text-brand hover:bg-brand/15',

        ghost:
          'text-foreground hover:bg-muted',

        link:
          'text-brand underline-offset-4 hover:underline',
      },

      size: {
        default: 'h-10 rounded-pill px-5 text-sm',
        sm: 'h-8 rounded-pill px-3 text-xs',
        lg: 'h-11 rounded-pill px-6 text-sm',
        icon: 'h-9 w-9 rounded-control',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      type = 'button',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
