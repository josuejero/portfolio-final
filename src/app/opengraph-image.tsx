import { siteConfig } from '@/config/site';
import { ImageResponse } from 'next/og';

export const alt =
  siteConfig.site.image.alt;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #111827 0%, #1f2937 55%, #0f172a 100%)',
          color: '#f9fafb',
          fontFamily:
            'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#cbd5e1',
          }}
        >
          Engineering Portfolio
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {siteConfig.person.name}
          </div>

          <div
            style={{
              display: 'flex',
              maxWidth: 940,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#e2e8f0',
            }}
          >
            Software, QA, data quality,
            and platform support engineering
            work focused on systems that
            have to work.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
