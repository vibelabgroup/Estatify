import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { useTranslation } from 'react-i18next';

export function CTABanner() {
  const { openModal } = useModal();
  const { t } = useTranslation('home');
  
  return (
    <section className="py-24 bg-[#0f172a] border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
        >
          {t('ctaBanner.title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 font-light max-w-2xl mx-auto mb-20"
        >
          {t('ctaBanner.subtitle')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
              15<span className="text-2xl sm:text-3xl text-blue-500 font-bold">min</span>
            </div>
            <div className="text-sm text-slate-300 font-medium">{t('ctaBanner.stats.demo')}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
              100<span className="text-2xl sm:text-3xl text-blue-500 font-bold">%</span>
            </div>
            <div className="text-sm text-slate-300 font-medium">{t('ctaBanner.stats.tailored')}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
              0<span className="text-2xl sm:text-3xl text-blue-500 font-bold">cost</span>
            </div>
            <div className="text-sm text-slate-300 font-medium">{t('ctaBanner.stats.commitment')}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
              1<span className="text-2xl sm:text-3xl text-blue-500 font-bold">day</span>
            </div>
            <div className="text-sm text-slate-300 font-medium">{t('ctaBanner.stats.onboarding')}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={openModal} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 border border-blue-500 cursor-pointer">
            <Calendar className="w-5 h-5" />
            {t('ctaBanner.button')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
