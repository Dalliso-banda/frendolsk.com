import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Output standalone for Docker deployment
  output: 'standalone',

  // Note: Turbopack is used for dev by default in Next.js 16
  // but we don't configure it here to use webpack for production builds
  // (Turbopack + standalone + middleware has issues with nft.json files)

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers are handled in middleware.ts
  // but we can add some here as well
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Add any legacy URL redirects here
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites - serve uploads through API route
  async rewrites() {
    return [
      {
        // Serve uploaded files via the media API route
        // /uploads/2026/01/19/abc.webp -> /api/media/2026/01/19/abc.webp
        source: '/uploads/:path*',
        destination: '/api/media/:path*',
      },
    ];
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Server external packages - these won't be bundled
  // Required for Knex and database drivers
  serverExternalPackages: [
    'knex',
    'pg',
    'pg-query-stream',
    'bcryptjs',
  ],
};

export default nextConfig;
