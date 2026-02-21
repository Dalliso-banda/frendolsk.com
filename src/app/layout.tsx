import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter, Crimson_Pro, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import { AnalyticsTracker } from '@/components/analytics';
import { siteConfig, defaultSeoConfig } from '@/config';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson-pro',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultSeoConfig.defaultTitle,
    template: defaultSeoConfig.titleTemplate,
  },
  description: defaultSeoConfig.description,
  keywords: [
    'web development',
    'full stack developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'software engineer',
    'personal website template',
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultSeoConfig.defaultTitle,
    description: defaultSeoConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${defaultSeoConfig.defaultTitle}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSeoConfig.defaultTitle,
    description: defaultSeoConfig.description,
    creator: `@${siteConfig.social.twitter}`,
    site: `@${siteConfig.social.twitter}`,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: `${siteConfig.name} RSS Feed` },
        { url: '/blog/rss.xml', title: `${siteConfig.name} Blog RSS Feed` },
      ],
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon',
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add your verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F3EF' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D14' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script to set theme before hydration - prevents flash
  const themeScript = `
    (function() {
      try {
        var savedMode = localStorage.getItem('theme-mode');
        if (savedMode === 'light' || savedMode === 'dark') {
          document.documentElement.setAttribute('data-theme', savedMode);
        } else {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}>
        <Providers>{children} 
             <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        </Providers>
     
      </body>
    </html>
  );
}
