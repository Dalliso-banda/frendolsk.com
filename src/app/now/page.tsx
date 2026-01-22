import type { Metadata } from 'next';
import NowPageClient from './NowPageClient';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What I\'m currently working on, learning, and focusing on. A now page inspired by Derek Sivers.',
  openGraph: {
    title: `Now | ${siteConfig.name}`,
    description: 'What I\'m currently working on, learning, and focusing on.',
    url: `${siteConfig.url}/now`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Now | ${siteConfig.name}`,
    description: 'What I\'m currently working on, learning, and focusing on.',
  },
  alternates: {
    canonical: `${siteConfig.url}/now`,
  },
};

export default function NowPage() {
  return <NowPageClient />;
}
