import { NextRequest, NextResponse } from 'next/server'

// Accept both legacy "application/csp-report" and Reporting API "application/reports+json"
export async function POST(req: NextRequest) {
  try {
    const type = req.headers.get('content-type') || ''
    const data = await req.json().catch(() => ({}))

    // Normalize shape
    const report = type.includes('reports+json')
      ? { reports: Array.isArray(data) ? data : [data] }
      : { 'csp-report': data['csp-report'] ?? data }

    // For now, just log (Vercel logs / local console). Consider storing in a DB later.
    console.log('CSP violation report', JSON.stringify(report))

    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ ok: true }, { status: 204 })
  }
}
