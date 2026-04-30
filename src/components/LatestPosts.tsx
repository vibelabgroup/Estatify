import { motion } from 'motion/react';
import {ArrowRight, Clock, User} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../data/blogPosts';
import { useTranslation } from 'react-i18next';

export function LatestPosts() {
  const { t } = useTranslation('home');
  const blogPosts = useBlogPosts();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-slate-500 font-light">
              {t('blog.subtitle')}
            </p>
          </div>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors shrink-0"
          >
            {t('blog.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                   <span className="bg-white/90 backdrop-blur text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                     {post.category}
                   </span>
                </div>
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              <div className="p-6 flex flex-col flex-1">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-slate-500 leading-relaxed font-light mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
