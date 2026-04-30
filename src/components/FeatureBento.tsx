import { motion } from 'motion/react';
import { Home, Users, Bot, DownloadCloud, BarChart3, LayoutTemplate, PenTool, Shield, Share2, TrendingUp, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: Home,
    title: "All properties in one view",
    description: "Your entire portfolio centralized. Update prices, features, and photos instantly across all your channels.",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    theme: "bg-white border-slate-200/60 shadow-sm",
    textTheme: "text-slate-900",
    descTheme: "text-slate-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Lead Protection",
    description: "We automatically mask original Resales Online reference numbers (e.g., R4793359 → EFY3859614) so buyers can't bypass you.",
    span: "col-span-1 border-emerald-100 bg-emerald-50/50",
    theme: "bg-emerald-50 border-emerald-100",
    textTheme: "text-emerald-950",
    descTheme: "text-emerald-800/80",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    icon: Users,
    title: "Never lose a lead",
    description: "Integrated CRM with lead scoring. Automatically capture and organize buyers. Know exactly who to call.",
    span: "col-span-1 lg:col-span-1",
    theme: "bg-blue-600 border-blue-500 shadow-xl shadow-blue-200/50",
    textTheme: "text-white",
    descTheme: "text-blue-100",
    iconBg: "bg-blue-500/50",
    iconColor: "text-white"
  },
  {
    icon: Bot,
    title: "24/7 Smart Assistant",
    description: "An AI chatbot that answers questions and qualifies buyers while you're asleep.",
    span: "col-span-1 lg:col-span-1",
    theme: "bg-white border-slate-200/60 shadow-sm",
    textTheme: "text-slate-900",
    descTheme: "text-slate-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: DownloadCloud,
    title: "ReSales Online API",
    description: "Seamless integration with the ReSales Online API for instant, accurate listing sync.",
    span: "col-span-1 lg:col-span-1",
    theme: "bg-white border-slate-200/60 shadow-sm",
    textTheme: "text-slate-900",
    descTheme: "text-slate-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: LayoutTemplate,
    title: "High-Converting Pages",
    description: "Beautiful property landing pages that keep buyers engaged longer, increasing your conversion rates. We handle the entire setup.",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    theme: "bg-slate-900 border-slate-800 shadow-xl shadow-slate-200/50",
    textTheme: "text-white",
    descTheme: "text-slate-400",
    iconBg: "bg-slate-800",
    iconColor: "text-white"
  },
  {
    icon: Share2,
    title: "Social Media Sync",
    description: "Automated social media sharing to expand your reach.",
    span: "col-span-1 lg:col-span-1",
    theme: "bg-white border-slate-200/60 shadow-sm",
    textTheme: "text-slate-900",
    descTheme: "text-slate-500",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600"
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Closing",
    description: "Stop guessing and start closing. Our behavioral analytics track exactly what buyers are looking at, so you can focus on the hottest leads and close deals with ruthless efficiency.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    theme: "bg-white border-slate-200/60 shadow-sm",
    textTheme: "text-slate-900",
    descTheme: "text-slate-500",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: Globe,
    title: "Dominate Google & AI Search",
    description: "Future-proof your business with Built-in SEO and Generative Engine Optimization (GEO). We automatically structure your property data to rank higher on Google, ChatGPT, and AI real estate assistants.",
    span: "col-span-1 md:col-span-1 lg:col-span-2",
    theme: "bg-white border-slate-200/60 shadow-sm",
    textTheme: "text-slate-900",
    descTheme: "text-slate-500",
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600"
  }
];

export function FeatureBento() {
  const { t } = useTranslation('home');

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {t('features.title')}<span className="text-blue-600">{t('features.titleHighlight')}</span>
          </h2>
          <p className="text-lg tracking-tight text-slate-500 font-light">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col relative overflow-hidden rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 border ${feature.theme} ${feature.span}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div>
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 group-hover:scale-110 transition-transform ${feature.iconBg}`}>
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 tracking-tight ${feature.textTheme}`}>{feature.title}</h3>
                </div>
                <p className={`font-light leading-relaxed mt-auto ${feature.descTheme}`}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl border border-slate-700">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('features.ctaTitle')}
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('features.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                {t('features.ctaPrimary')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                {t('features.ctaSecondary')}
              </motion.button>
            </div>
            <p className="text-slate-400 text-sm mt-6">
              {t('features.ctaDisclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
