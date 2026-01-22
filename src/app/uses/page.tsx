import type { Metadata } from 'next';
import UsesPageClient from './UsesPageClient';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Uses',
  description:
    'The tools, software, hardware, and gear I use for web development and everyday work. My current development setup and recommendations.',
  openGraph: {
    title: `Uses | ${siteConfig.name}`,
    description: 'The tools, software, and gear I use for web development.',
    url: `${siteConfig.url}/uses`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Uses | ${siteConfig.name}`,
    description: 'The tools, software, and gear I use for web development.',
  },
  alternates: {
    canonical: `${siteConfig.url}/uses`,
  },
};

export default function UsesPage() {
  return <UsesPageClient />;
}
