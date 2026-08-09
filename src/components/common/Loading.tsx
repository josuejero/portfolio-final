// src/components/common/Loading.tsx
'use client';

const Loading = () => {
  return (
    <div
      className="flex min-h-32 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span
          className="h-5 w-5 animate-spin rounded-pill border-2 border-border border-t-brand"
          aria-hidden="true"
        />

        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
