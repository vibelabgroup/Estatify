import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const NOTIFICATIONS = [
  {
    id: 1,
    theme: 'light',
    iconBg: 'bg-white border-slate-100',
    icon: '🏠',
    title: 'Villa in Marbella, Málaga',
    badges: [
      { text: 'Status: Active', className: 'text-emerald-600 bg-emerald-50' },
      { text: 'Synced with Resales-Online', className: 'text-blue-600 bg-blue-50' }
    ]
  },
  {
    id: 2,
    theme: 'dark',
    iconBg: 'bg-blue-500/50',
    icon: '✨',
    title: 'AI Description Generated',
    description: '"Exclusive beachfront retreat with panoramic Mediterranean views and private infinity pool..."'
  },
  {
    id: 3,
    theme: 'light',
    iconBg: 'bg-emerald-50 border-emerald-100',
    icon: '💬',
    title: 'New Lead Captured',
    badge: { text: 'Hot', className: 'text-emerald-700 bg-emerald-100' },
    description: 'Chatbot answered: "Let me book a follow-up call with one of our agents for you."'
  },
  {
    id: 4,
    theme: 'light',
    iconBg: 'bg-amber-50 border-amber-100',
    icon: '📊',
    title: 'Smart Matching Alert',
    badges: [
      { text: 'High Intent', className: 'text-amber-700 bg-amber-100' }
    ],
    description: 'John viewed 7 × 3-bed properties in Marbella (<€500k). Sent 3 relevant matches.'
  },
  {
    id: 5,
    theme: 'light',
    iconBg: 'bg-indigo-50 border-indigo-100',
    icon: '🌍',
    title: 'Translation Complete',
    description: 'Listing "Modern Apartment in Mijas" translated to German, Swedish, and French.'
  }
];

export function Hero() {
  const { t } = useTranslation('home');
  const [activeNotification, setActiveNotification] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotification((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleIndices = [
    activeNotification,
    (activeNotification + 1) % NOTIFICATIONS.length,
    (activeNotification + 2) % NOTIFICATIONS.length,
  ];

  const visibleNotifications = visibleIndices.map(index => NOTIFICATIONS[index]);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-8 pb-12 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>{t('hero.badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight"
          >
            {t('hero.title')} <span className="text-blue-600">{t('hero.titleHighlight')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-slate-900">{t('hero.conversionRate')}</span>
              <span className="text-xs text-slate-500 font-medium">{t('hero.conversionSubtext')}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 relative flex items-center justify-center py-10 lg:py-20"
        >
          <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 overflow-hidden transform lg:rotate-1 lg:skew-y-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
              <div className="text-xs font-bold text-slate-400 tracking-wider">AGENCY DASHBOARD</div>
            </div>
            
            <div className="space-y-4 sm:space-y-6 relative min-h-[300px]">
              <AnimatePresence mode="popLayout">
                {visibleNotifications.map((notif, index) => {
                  const isDark = notif.theme === 'dark';
                  
                  return (
                    <motion.div 
                      key={`${notif.id}-${activeNotification}`}
                      layout
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ 
                        duration: 0.5, 
                        // Stagger entrance based on index
                        delay: index * 0.1, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className={`flex gap-4 p-4 rounded-2xl border items-center hover:shadow-md hover:-translate-y-0.5 transition-all ${
                        isDark 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 border-blue-600' 
                          : 'bg-white border-slate-100 shadow-sm text-slate-900'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border ${isDark ? 'border-none' : ''} ${notif.iconBg}`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{notif.title}</div>
                          {notif.badge && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${notif.badge.className}`}>
                              {notif.badge.text}
                            </span>
                          )}
                        </div>
                        {notif.badges && (
                          <div className="text-[10px] flex flex-wrap gap-2 font-semibold uppercase mt-1">
                            {notif.badges.map((badge, i) => (
                              <span key={i} className={`px-1.5 py-0.5 rounded ${badge.className}`}>
                                {badge.text}
                              </span>
                            ))}
                          </div>
                        )}
                        {notif.description && (
                          <div className={`text-xs pr-2 ${isDark ? 'opacity-90 mt-1 line-clamp-2' : 'text-slate-500'}`}>
                            {notif.description}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
