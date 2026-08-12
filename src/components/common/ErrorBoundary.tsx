'use client';

import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react';

import styles from './SystemState.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  Props,
  State
> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(
    _: Error,
  ): State {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ) {
    console.error(
      'Uncaught error:',
      error,
      errorInfo,
    );
  }

  public render() {
    if (
      this.state.hasError
    ) {
      return (
        <section
          className={
            styles.boundary
          }
          role="alert"
        >
          <div
            className={
              styles.errorTop
            }
          >
            <span
              className={
                styles.label
              }
            >
              RUNTIME EXCEPTION
            </span>

            <span
              className={
                styles.errorCode
              }
            >
              RECOVERABLE
            </span>
          </div>

          <div
            className={
              styles.errorBody
            }
          >
            <h2>
              Something
              <span>
                failed.
              </span>
            </h2>

            <div
              className={
                styles.errorAside
              }
            >
              <p>
                Try the action again.
                If the problem
                continues, refreshing
                the page may help.
              </p>

              <button
                type="button"
                className={
                  styles.action
                }
                onClick={() =>
                  this.setState({
                    hasError:
                      false,
                  })
                }
              >
                Try again
                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
