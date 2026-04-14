import type { Post } from './posts.types';

type RawPost = Partial<Post> & { title: string; date: string; body: string };

const modules = import.meta.glob<RawPost>('../content/posts/*.json', {
  eager: true,
  import: 'default',
});

function deriveSlugFromPath(path: string): string {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.json$/, '');
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function normalize(path: string, raw: RawPost): Post {
  const slug = raw.slug ?? deriveSlugFromPath(path);
  const tags = raw.tags ?? [];
  return {
    slug,
    title: raw.title,
    date: raw.date,
    excerpt: raw.excerpt ?? '',
    tags,
    cover: raw.cover,
    body: raw.body,
    readingTime: raw.readingTime ?? estimateReadingTime(raw.body),
  };
}

const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => normalize(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export type { Post };
