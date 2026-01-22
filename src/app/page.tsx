import HomePageClient from './HomePageClient';
import { WebsiteJsonLd } from '@/components/seo/JsonLd';

// Homepage metadata is defined in layout.tsx as the default

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <HomePageClient />
    </>
  );
}
