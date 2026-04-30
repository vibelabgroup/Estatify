import { motion } from 'motion/react';
import { AlertCircle, FileText, Frown, MessageSquare, Search, Blocks } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ProblemSection() {
  const { t } = useTranslation('home');

  const problems = [
    {
      icon: Search,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      title: t('problem.scatteredListings'),
      description: t('problem.scatteredListingsDesc')
    },
    {
      icon: Frown,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      title: t('problem.losingLeads'),
      description: t('problem.losingLeadsDesc')
    },
    {
      icon: FileText,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      title: t('problem.endlessAdmin'),
      description: t('problem.endlessAdminDesc')
    },
    {
      icon: MessageSquare,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      title: t('problem.alwaysOnCall'),
      description: t('problem.alwaysOnCallDesc')
    },
    {
      icon: AlertCircle,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      title: t('problem.blindMarketing'),
      description: t('problem.blindMarketingDesc')
    },
    {
      icon: Blocks,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      title: t('problem.fragmentedTools'),
      description: t('problem.fragmentedToolsDesc')
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {t('problem.title')}
          </h2>
          <p className="text-lg tracking-tight text-slate-500 font-light">
            {t('problem.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-8 rounded-[2rem] bg-white border border-slate-200/60 shadow-sm flex flex-col items-start hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${problem.iconBg} flex items-center justify-center mb-6`}>
                <problem.icon className={`w-7 h-7 ${problem.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('problem.ctaTitle')}
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('problem.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                {t('problem.ctaPrimary')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                {t('problem.ctaSecondary')}
              </motion.button>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              {t('problem.ctaDisclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
