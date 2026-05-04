import type { Metadata } from 'next';
import config from '@config';
import { DEFAULT_NOW_CONTENT } from '@core/views/now/defaults';
import NowView from '@core/views/now/NowView';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Now',
  description:
    "What I'm currently working on, learning, and focusing on. A now page inspired by Derek Sivers.",
  openGraph: {
    title: `Now | ${siteConfig.name}`,
    description: "What I'm currently working on, learning, and focusing on.",
    url: `${siteConfig.url}/now`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Now | ${siteConfig.name}`,
    description: "What I'm currently working on, learning, and focusing on.",
  },
  alternates: {
    canonical: `${siteConfig.url}/now`,
  },
};

export default function NowPage() {
  const content = config.content?.now ?? DEFAULT_NOW_CONTENT;
  return <NowView content={content} />;
}
