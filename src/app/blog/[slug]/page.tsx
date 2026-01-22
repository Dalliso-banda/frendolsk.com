import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import { siteConfig } from '@/config';
import { getPostBySlug } from '@/db/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const url = `${siteConfig.url}/blog/${slug}`;
  const publishedAt = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;

  return {
    title: post.title,
    description: post.excerpt || post.metaDescription || '',
    keywords: post.tags.map(t => t.name),
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.excerpt || post.metaDescription || '',
      url,
      type: 'article',
      publishedTime: publishedAt,
      authors: [siteConfig.author.name],
      tags: post.tags.map(t => t.name),
      siteName: siteConfig.name,
      images: [
        {
          url: `/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.excerpt || post.metaDescription || '',
      creator: `@${siteConfig.social.twitter}`,
      images: [`/blog/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
