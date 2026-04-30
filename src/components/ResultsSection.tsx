import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export function ResultsSection() {
  const { t } = useTranslation('home');

  const stats = [
    { value: "5-10", unit: "hrs/week", label: t('results.stats.adminWork') },
    { value: "3x", unit: "more", label: t('results.stats.leadsCaptured') },
    { value: "20-30%", unit: "more", label: t('results.stats.dealsClosed') },
    { value: "10x", unit: "faster", label: t('results.stats.listingsWritten') }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('results.title')}
          </h2>
          <p className="text-lg tracking-tight text-slate-400 font-light">
            {t('results.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                {stat.value}
                <span className="text-xl sm:text-2xl text-blue-400 ml-1">{stat.unit}</span>
              </div>
              <p className="text-slate-400 font-medium text-sm sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
