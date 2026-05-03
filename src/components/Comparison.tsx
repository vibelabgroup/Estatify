import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../contexts/ModalContext';

const getComparisons = (t: any) => [
  { feature: t('comparison.features.aiSearch'), others: t('comparison.others.manualCopywriters'), estatify: t('comparison.estatify.builtInAI') },
  { feature: t('comparison.features.leadProtection'), others: t('comparison.others.buyersBypass'), estatify: t('comparison.estatify.autoMasked') },
  { feature: t('comparison.features.importSync'), others: t('comparison.others.manualData'), estatify: t('comparison.estatify.apiSync') },
  { feature: t('comparison.features.socialMedia'), others: t('comparison.others.manualPosting'), estatify: t('comparison.estatify.automatedSharing') },
  { feature: t('comparison.features.analytics'), others: t('comparison.others.differentDashboard'), estatify: t('comparison.estatify.integratedDashboard') },
  { feature: t('comparison.features.pricing'), others: t('comparison.others.guesswork'), estatify: t('comparison.estatify.aiForecasting') },
  { feature: t('comparison.features.support'), others: t('comparison.others.paidSlow'), estatify: t('comparison.estatify.supportUpdates') }
];

export function Comparison() {
  const { t } = useTranslation('home');
  const { openModal } = useModal();
  const comparisons = getComparisons(t);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100" id="comparison">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {t('comparison.title')}
          </h2>
          <p className="text-lg tracking-tight text-slate-500 font-light">
            {t('comparison.subtitle')}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 items-center p-4 sm:p-6">
            <div className="font-semibold text-slate-900 text-sm sm:text-base">{t('comparison.headers.whatYouNeed')}</div>
            <div className="font-medium text-slate-500 text-sm sm:text-base">{t('comparison.headers.otherTools')}</div>
            <div className="font-bold text-blue-600 text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {t('comparison.headers.estatify')}
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {comparisons.map((item, i) => (
              <div key={i} className="grid grid-cols-3 p-4 sm:p-6 items-center hover:bg-slate-50/50 transition-colors">
                <div className="text-slate-900 font-medium text-sm sm:text-base">{item.feature}</div>
                <div className="text-slate-500 text-sm sm:text-base">{item.others}</div>
                <div className="text-slate-900 font-medium text-sm sm:text-base flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  {item.estatify}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('comparisonCta.title')}
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('comparisonCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg cursor-pointer"
              >
                {t('comparisonCta.primaryButton')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 cursor-pointer"
              >
                {t('comparisonCta.secondaryButton')}
              </motion.button>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              {t('comparisonCta.disclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
