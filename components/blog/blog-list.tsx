'use client';

import { PostCard } from '@/components/blog/post-card';
import { useCountry } from '@/components/providers/country-provider';
import type { PostMeta } from '@/lib/blog';

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const { country } = useCountry();
  const visiblePosts = posts.filter((p) => !p.countries || p.countries.includes(country));

  if (visiblePosts.length === 0) {
    return <p className="text-center text-muted-foreground">Próximamente nuevos artículos.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visiblePosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
