/**
 * JSON-LD Structured Data Components
 * ===================================
 *
 * Provides structured data for search engines to better understand site content.
 * Supports Schema.org types: WebSite, Person, Organization, Article, BreadcrumbList
 */

import { siteConfig } from '@/config';

// =============================================================================
// Types
// =============================================================================

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  tags?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// =============================================================================
// Website Schema (for homepage)
// =============================================================================

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: `Personal website and blog of ${siteConfig.author.name}. Writing about web development, technology, and life.`,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter}`,
      `https://github.com/${siteConfig.social.github}`,
      `https://linkedin.com/in/${siteConfig.social.linkedin}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// =============================================================================
// Person Schema (for about page)
// =============================================================================

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.author.url,
    email: siteConfig.author.email,
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed',
    },
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter}`,
      `https://github.com/${siteConfig.social.github}`,
      `https://linkedin.com/in/${siteConfig.social.linkedin}`,
      `https://instagram.com/${siteConfig.social.instagram}`,
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'DevOps',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// =============================================================================
// Article Schema (for blog posts)
// =============================================================================

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = siteConfig.author.name,
  tags = [],
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: imageUrl || `${siteConfig.url}/og-image.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: siteConfig.author.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// =============================================================================
// Breadcrumb Schema
// =============================================================================

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// =============================================================================
// FAQ Schema (useful for documentation/help pages)
// =============================================================================

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// =============================================================================
// Software Application Schema (for projects)
// =============================================================================

export interface SoftwareAppJsonLdProps {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export function SoftwareAppJsonLd({
  name,
  description,
  url,
  applicationCategory = 'WebApplication',
  operatingSystem = 'Any',
  offers,
}: SoftwareAppJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };

  if (offers) {
    jsonLd.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
