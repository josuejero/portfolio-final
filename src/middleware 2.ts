import { NextRequest, NextResponse } from 'next/server'

// Edge-safe base64 nonce
function genNonce(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  // btoa is available in the Edge runtime; produces standard base64
  return btoa(s)
}

export function middleware(request: NextRequest) {
  const nonce = genNonce()
  const origin = request.nextUrl.origin
  const isDev = process.env.NODE_ENV !== 'production'

  // keep it compact so it's easy to eyeball in curl
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`}`,
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
    "report-to csp-endpoint",
    "report-uri /api/csp-report"
  ].join('; ')

  // pass nonce to the app via request headers so you can read it with next/headers()
  const reqHeaders = new Headers(request.headers)
  reqHeaders.set('x-nonce', nonce)

  const res = NextResponse.next({ request: { headers: reqHeaders } })

  // set response headers (Report-Only first)
  res.headers.set('Content-Security-Policy-Report-Only', csp)
  res.headers.set('Reporting-Endpoints', `csp-endpoint="${origin}/api/csp-report"`)

  // debug header so we can confirm middleware response headers are reaching the client
  res.headers.set('x-csp-test', nonce.slice(0, 8))

  return res
}

// NOTE: no `export const config = { matcher: ... }`
// Middleware runs on all routes by default.
