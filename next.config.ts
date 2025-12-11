/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const securityHeaders = [
  // Clickjacking: modern control is CSP frame-ancestors; XFO kept for legacy
  { key: 'X-Frame-Options', value: 'DENY' },

  // MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Referrer privacy
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Feature gating
  { key: 'Permissions-Policy', value: [
      "accelerometer=()", "camera=()", "geolocation=()", "microphone=()",
      "payment=()", "usb=()", "magnetometer=()", "gyroscope=()",
      "fullscreen=()" // allow per-page if you actually need it
    ].join(', ') },

  // Cross-origin isolation hardening
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },

  // HSTS (only send on HTTPS/prod; preload optional but requires 1yr+ includeSubDomains)
  ...(isProd ? [{
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  }] : []),
]

const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
export default nextConfig
