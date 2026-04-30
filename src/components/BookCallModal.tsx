import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function BookCallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation('common');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when modal is closed
  const handleClose = () => {
    onClose();
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-full"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{t('bookCallModal.title')}</h3>
                    <p className="text-sm text-slate-500 font-medium">{t('bookCallModal.subtitle')}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">{t('bookCallModal.successTitle')}</h4>
                    <p className="text-slate-500 mb-6">
                      {t('bookCallModal.successMessage')}
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors w-full"
                    >
                      {t('bookCallModal.close')}
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="modal-firstName" className="text-sm font-semibold text-slate-700">{t('bookCallModal.firstName')}</label>
                        <input type="text" id="modal-firstName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder={t('bookCallModal.firstNamePlaceholder')} />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="modal-lastName" className="text-sm font-semibold text-slate-700">{t('bookCallModal.lastName')}</label>
                        <input type="text" id="modal-lastName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder={t('bookCallModal.lastNamePlaceholder')} />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="modal-email" className="text-sm font-semibold text-slate-700">{t('bookCallModal.email')}</label>
                      <input type="email" id="modal-email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder={t('bookCallModal.emailPlaceholder')} />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-phone" className="text-sm font-semibold text-slate-700">{t('bookCallModal.phone')}</label>
                      <input type="tel" id="modal-phone" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light bg-slate-50 focus:bg-white" placeholder={t('bookCallModal.phonePlaceholder')} />
                    </div>

                    <div className="space-y-1.5 pt-2">
                       <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 text-lg">
                          {t('bookCallModal.submit')}
                       </button>
                    </div>
                    <p className="text-center text-xs text-slate-500 pt-3">
                      {t('bookCallModal.privacy')}
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
