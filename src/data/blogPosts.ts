import { useTranslation } from 'react-i18next';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

const blogPostsBase = [
  {
    id: '1',
    slug: 'future-of-ai-real-estate-costa-del-sol',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    slug: 'stop-losing-leads-portals',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    slug: 'understanding-buyer-behavior-analytics',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    slug: 'costa-del-sol-market-report-q1-2026',
    imageUrl: 'https://images.unsplash.com/photo-1511883584857-418eb6db8a1f?auto=format&fit=crop&q=80&w=1000'
  }
];

export const useBlogPosts = () => {
  const { t } = useTranslation('blog');
  
  return blogPostsBase.map(post => ({
    ...post,
    title: t(`posts.${post.id}.title`),
    excerpt: t(`posts.${post.id}.excerpt`),
    author: t(`posts.${post.id}.author`),
    date: t(`posts.${post.id}.date`),
    readTime: t(`posts.${post.id}.readTime`),
    category: t(`posts.${post.id}.category`),
    content: t(`posts.${post.id}.content`)
  }));
};
