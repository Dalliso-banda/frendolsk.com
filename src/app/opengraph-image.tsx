import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'DevHolm - Personal Website Template';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0c14',
          fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(6, 182, 212, 0.15) 100%)',
          }}
        />

        {/* Accent border at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #22C55E 0%, #10B981 50%, #06B6D4 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '60px 80px',
          }}
        >
          {/* Logo/Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #0d0d14 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '24px',
                border: '2px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #22C55E 0%, #06B6D4 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                DH
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                DevHolm
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: '#10B981',
                  fontWeight: 500,
                }}
              >
                Personal Website Template
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
              marginBottom: '40px',
            }}
          >
            A modern, feature-rich personal website template built with Next.js, TypeScript, and Material UI
          </div>

          {/* Tech stack pills */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Material UI'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '20px',
                  fontSize: '18px',
                  color: '#10B981',
                  fontWeight: 500,
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* URL at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.05em',
            }}
          >
            devholm.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
