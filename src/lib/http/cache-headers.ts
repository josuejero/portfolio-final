import type { NextResponse } from 'next/server';

type CacheScope = 'browser' | 'shared';

type PublicCacheOptions = {
  maxAge: number;
  scope?: CacheScope;
  staleWhileRevalidate?: number;
  varyAcceptEncoding?: boolean;
};

export function setPublicCacheHeaders(
  response: NextResponse,
  {
    maxAge,
    scope = 'shared',
    staleWhileRevalidate = maxAge,
    varyAcceptEncoding = false,
  }: PublicCacheOptions,
): NextResponse {
  const ageDirective = scope === 'browser' ? 'max-age' : 's-maxage';

  response.headers.set(
    'Cache-Control',
    [
      'public',
      `${ageDirective}=${maxAge}`,
      `stale-while-revalidate=${staleWhileRevalidate}`,
    ].join(', '),
  );

  if (varyAcceptEncoding) {
    response.headers.set('Vary', 'Accept-Encoding');
  }

  return response;
}
