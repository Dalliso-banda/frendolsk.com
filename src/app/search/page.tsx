import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchView from '@core/views/search/SearchView';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search blog posts, articles, and content.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchView />
    </Suspense>
  );
}
