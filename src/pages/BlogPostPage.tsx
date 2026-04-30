import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Clock, CheckCircle2 } from 'lucide-react';
import { useBlogPosts } from '../data/blogPosts';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export function BlogPostPage() {
  const { t } = useTranslation('blog');
  const blogPosts = useBlogPosts();
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:text-blue-700">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            {t('backToPosts')}
          </Link>
          <span className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-4 block">
            {post.category}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 font-medium">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">
          
          {/* Main Content */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200/60 leading-relaxed font-light text-slate-700">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-md">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="markdown-body">
              <Markdown>{post.content}</Markdown>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('vip.title')}</h3>
              <p className="text-slate-500 font-light mb-6 text-sm">
                {t('vip.subtitle')}
              </p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t('vip.name')}</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t('vip.email')}</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder="john@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t('vip.phone')}</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder="+34 600 000 000" />
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 mt-2">
                  {t('vip.submit')}
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {t('vip.privacy')}
              </div>
            </div>
            
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold mb-4">{t('cta.title')}</h3>
              <p className="text-slate-300 font-light mb-6 text-sm">
                {t('cta.subtitle')}
              </p>
              <Link to="/contact" className="block w-full py-3 bg-white text-slate-900 text-center rounded-xl font-bold hover:bg-slate-100 transition-colors">
                {t('cta.button')}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </article>
  );
}
