import type { Metadata } from 'next';
import ResumePageClient from './ResumePageClient';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Professional resume - Full Stack Developer with experience in React, Next.js, TypeScript, Node.js, and more.',
  openGraph: {
    title: `Resume | ${siteConfig.name}`,
    description: 'Professional resume and work experience.',
    url: `${siteConfig.url}/resume`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Resume | ${siteConfig.name}`,
    description: 'Professional resume and work experience.',
  },
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumePage() {
  return <ResumePageClient />;
}
