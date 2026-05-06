import { SiteConfig } from '@/types';
import { app, author, social } from './env';

// Note: These are build-time defaults. Runtime values come from the database
// via useSiteSettings hook. Keep personal info in .env (gitignored), not here.
export const siteConfig: SiteConfig = {
  name: "Frendo LSK",
  description: "Software Engineer, AI Enthusiast, and Creative Technologist based in Lusaka.",
  url: app.url,
  author: {
    name: "Dalitso Banda",
    email: author.email,
    url: author.url,
  },
  social,
};

// Navigation configuration
export const mainNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Stack', href: '/uses' }, // "Stack" or "Gear" often fits the "Uses" page better
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
  resources: [
    { label: 'Resume', href: '/resume' },
    { label: 'Hardware Gear', href: '/uses' },
    { label: 'Now', href: '/now' },
    { label: 'RSS', href: '/rss.xml' },
  ],
};

// SEO defaults - customized for Frendo LSK
export const defaultSeoConfig = {
  titleTemplate: '%s | Frendo LSK',
  defaultTitle: 'Frendo LSK — Dalitso Banda',
  description:
    'Personal portfolio of Dalitso Banda (Frendo LSK). Software engineer specializing in React, Node.js, and AI development, exploring the intersection of code and hardware sovereignty.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Frendo LSK',
    images: [
      {
        url: '', // Ensure you have an OG image in your public folder
        width: 1200,
        height: 630,
        alt: 'Frendo LSK Portfolio',
      },
    ],
  },
  twitter: {
    handle: '@frendolsk', // Update with your actual Twitter handle if available
    site: '@frendolsk',
    cardType: 'summary_large_image',
  },
};
