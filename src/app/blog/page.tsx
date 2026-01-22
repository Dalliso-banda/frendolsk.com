import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read articles about web development, software engineering, technology, and developer life. Tips, tutorials, and thoughts from a full-stack developer.',
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Articles about web development, software engineering, and technology.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${siteConfig.name}`,
    description: 'Articles about web development, software engineering, and technology.',
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
