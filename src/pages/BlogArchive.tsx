import { motion } from 'motion/react';
import { ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export function BlogArchive() {
  return (
    <div className="pt-32 pb-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Estatify Blog
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Latest insights, strategies, and updates to help you close more deals in Costa del Sol.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
