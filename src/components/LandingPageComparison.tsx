import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LandingPageComparison() {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');

  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {t('landingComparison.title')}
          </h2>
          <p className="text-lg tracking-tight text-slate-500 font-light">
            {t('landingComparison.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <X className="w-5 h-5 text-rose-600 font-bold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t('landingComparison.before.title')}</h3>
                <p className="text-sm text-slate-500 font-medium">{t('landingComparison.before.subtitle')}</p>
              </div>
            </div>

            {/* Boring UI Mockup */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[500px] grayscale opacity-80 group hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               {/* Browser Top */}
               <div className="bg-slate-100 h-12 border-b border-slate-200 flex items-center px-4 gap-2 shrink-0">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-slate-300" />
                   <div className="w-3 h-3 rounded-full bg-slate-300" />
                   <div className="w-3 h-3 rounded-full bg-slate-300" />
                 </div>
                 <div className="mx-auto w-1/2 h-6 bg-white rounded-md flex items-center px-2 border border-slate-200 text-[10px] text-slate-400 font-mono">
                   property-listing-page-id-8821.html
                 </div>
               </div>
               
               {/* Page Content */}
               <div className="p-6 flex-1 flex flex-col items-center bg-white">
                 <div className="w-full max-w-sm flex flex-col gap-5">
                   <div className="w-1/3 h-4 bg-slate-200 rounded shrink-0" />
                   
                   <div className="w-full h-48 bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400 text-xs shrink-0">
                     [ Main Image Container ]
                   </div>
                   
                   <div className="w-2/3 h-6 bg-slate-300 rounded shrink-0" />
                   
                   <div className="flex gap-4 border-y border-slate-100 py-3 shrink-0">
                     <div className="text-xs text-slate-500 font-medium">{t('landingComparison.mockup.beds')}</div>
                     <div className="text-xs text-slate-500 font-medium">{t('landingComparison.mockup.baths')}</div>
                   </div>
                   
                   <div className="space-y-2 shrink-0">
                     <div className="h-3 w-full bg-slate-100 rounded" />
                     <div className="h-3 w-full bg-slate-100 rounded" />
                     <div className="h-3 w-full bg-slate-100 rounded" />
                     <div className="h-3 w-3/4 bg-slate-100 rounded" />
                   </div>
                   
                   <div className="mt-2 pt-4 border-t border-slate-100 shrink-0">
                     <div className="w-full py-3 bg-slate-200 text-slate-500 text-sm font-bold text-center rounded border border-slate-300">
                       {t('landingComparison.mockup.submitButton')}
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full blur-[100px] pointer-events-none opacity-20" />
            
            <div className="flex items-center gap-3 mb-6 px-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-blue-600 font-bold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t('landingComparison.after.title')}</h3>
                <p className="text-sm text-slate-500 font-medium">{t('landingComparison.after.subtitle')}</p>
              </div>
            </div>

            {/* Beautiful UI Mockup */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col h-[500px] relative z-10 transition-transform duration-500 hover:-translate-y-2">
               {/* Browser Top */}
               <div className="bg-slate-900 h-12 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0 z-20">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-rose-500" />
                   <div className="w-3 h-3 rounded-full bg-amber-500" />
                   <div className="w-3 h-3 rounded-full bg-green-500" />
                 </div>
                 <div className="mx-auto w-1/2 h-6 bg-slate-800 rounded-md flex items-center px-2 gap-2">
                   <div className="w-3 h-3 rounded bg-slate-600" />
                   <div className="w-1/2 h-2 rounded bg-slate-700" />
                 </div>
               </div>

               {/* Hero Image Area */}
               <div className="relative h-64 shrink-0 shadow-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" 
                    alt={t('landingComparison.alt.luxuryProperty')} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/30">
                    {t('landingComparison.after.badge')}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                     <div className="flex justify-between items-end gap-4">
                        <div className="flex-1">
                           <h3 className="text-2xl font-bold text-white shadow-sm mb-1 truncate">{t('landingComparison.after.propertyTitle')}</h3>
                           <p className="text-blue-200 text-xs font-medium">{t('landingComparison.after.location')}</p>
                        </div>
                        <div className="text-xl font-bold text-white bg-blue-600/90 backdrop-blur-sm px-4 py-1.5 rounded-xl border border-blue-500/50 shadow-lg shrink-0">
                           €2.5M
                        </div>
                     </div>
                  </div>
               </div>

               {/* Lower Content Layer */}
               <div className="flex-1 bg-white flex p-5 pb-0 relative">
                  {/* Left Column stats & text */}
                  <div className="flex-1 pr-4 flex flex-col">
                     <div className="flex gap-2 mb-5">
                        <div className="flex-1 bg-white border border-slate-100 py-2.5 rounded-xl flex border-b-[3px] border-b-slate-100 flex-col items-center justify-center shrink-0">
                           <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-1">{t('landingComparison.after.stats.beds')}</div>
                           <div className="text-base font-bold text-slate-800">4</div>
                        </div>
                        <div className="flex-1 bg-white border border-slate-100 py-2.5 rounded-xl flex border-b-[3px] border-b-slate-100 flex-col items-center justify-center shrink-0">
                           <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-1">{t('landingComparison.after.stats.baths')}</div>
                           <div className="text-base font-bold text-slate-800">4.5</div>
                        </div>
                        <div className="flex-1 bg-white border border-slate-100 py-2.5 rounded-xl flex border-b-[3px] border-b-slate-100 flex-col items-center justify-center shrink-0">
                           <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-1">{t('landingComparison.after.stats.area')}</div>
                           <div className="text-base font-bold text-slate-800">320</div>
                        </div>
                     </div>
                     <div className="space-y-2.5">
                        <div className="h-2 w-full bg-slate-100 rounded" />
                        <div className="h-2 w-full bg-slate-100 rounded" />
                        <div className="h-2 w-5/6 bg-slate-100 rounded" />
                     </div>
                  </div>

                  {/* Floating Lead Capture Form (overlaps hero image slightly) */}
                  <div className="w-[200px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col p-4 border border-slate-100 relative -mt-24 h-max shrink-0 z-20">
                     <p className="text-[10px] text-slate-500 font-medium leading-snug mb-3">
                       {t('landingComparison.after.form.description')}
                     </p>
                     
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-100 border-2 border-white shadow-sm">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=e2e8f0" alt={t('landingComparison.alt.agent')} className="w-full h-full" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-slate-800 leading-tight mb-0.5">{t('landingComparison.after.form.agentName')}</span>
                           <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider leading-tight">{t('landingComparison.after.form.agentTitle')}</span>
                        </div>
                     </div>

                     <div className="space-y-2 mb-4">
                        <div className="h-7 w-full bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 px-3 flex items-center shrink-0">{t('landingComparison.after.form.name')}</div>
                        <div className="h-7 w-full bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 px-3 flex items-center shrink-0">{t('landingComparison.after.form.email')}</div>
                        <div className="h-7 w-full bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 px-3 flex items-center shrink-0">{t('landingComparison.after.form.phone')}</div>
                     </div>
                     
                     <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-[11px] font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors shrink-0">
                        {tCommon('requestInformation')}
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

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
              {t('designCta.title')}
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('designCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                {t('designCta.primaryButton')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                {t('designCta.secondaryButton')}
              </motion.button>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              {t('designCta.disclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
