// src/components/common/ErrorBoundary.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-surface border border-destructive/40 bg-destructive/10 p-6 text-center shadow-soft">
          <p className="text-xl font-semibold text-foreground">
            Something went wrong.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Try the action again. If the problem continues,
            refreshing the page may help.
          </p>

          <Button
            className="mt-4"
            onClick={() =>
              this.setState({
                hasError: false,
              })
            }
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
