export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

export type TrackEventParams = Record<string, unknown>;

export type TrackEventSpec = {
  name: string;
  params?: TrackEventParams;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (name: string, params?: TrackEventParams) => {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.('event', name, params);
};
