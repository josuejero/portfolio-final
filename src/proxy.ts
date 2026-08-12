import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const origin = request.nextUrl.origin
  const isDev = process.env.NODE_ENV !== 'production'

  /*
   * This application is statically prerendered.
   *
   * Request-specific nonces cannot be injected into static Next.js HTML, so
   * this report-only policy intentionally uses the static-compatible CSP
   * shape rather than advertising a nonce/strict-dynamic policy that the
   * generated script tags cannot satisfy.
   *
   * Keep this policy in report-only mode until an enforcement pass has
   * verified every required source in production.
   */
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "form-action 'self'",
    "frame-src 'self'",
    "report-to csp-endpoint",
    "report-uri /api/csp-report"
  ].join('; ')

  const response = NextResponse.next()

  response.headers.set(
    'Content-Security-Policy-Report-Only',
    csp
  )

  response.headers.set(
    'Reporting-Endpoints',
    `csp-endpoint="${origin}/api/csp-report"`
  )

  return response
}

// NOTE: no `export const config = { matcher: ... }`
// Proxy runs on all routes by default.
