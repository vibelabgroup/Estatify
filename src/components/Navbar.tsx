import { motion } from 'motion/react';
import { Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { openModal } = useModal();
  const { t, i18n } = useTranslation('common');

  const toggleLanguage = (e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">estatify.ai</span>
          </Link>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 text-sm font-medium text-slate-600">
              <Link to="/features" className="hover:text-slate-900 transition-colors">{t('nav.features')}</Link>
              <Link to="/references" className="hover:text-slate-900 transition-colors">{t('nav.references')}</Link>
              <Link to="/blog" className="hover:text-slate-900 transition-colors">{t('nav.articles')}</Link>
              <Link to="/contact" className="hover:text-slate-900 transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 hidden md:flex">
            <button 
              onClick={(e) => toggleLanguage(e)} 
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
              title={i18n.language === 'en' ? t('footer.language.switchToSpanish') : t('footer.language.switchToEnglish')}
            >
              <span className="text-sm font-bold text-slate-600">{i18n.language === 'en' ? 'EN' : 'ES'}</span>
            </button>
            <button onClick={openModal} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 cursor-pointer">
              {t('nav.bookCall')}
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg"
        >
          <Link to="/features" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900">{t('nav.features')}</Link>
          <Link to="/references" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900">{t('nav.references')}</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900">{t('nav.articles')}</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900">{t('nav.contact')}</Link>
          <div className="flex items-center gap-3 px-3 py-2 mt-4">
            <button 
              onClick={(e) => toggleLanguage(e)} 
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer touch-action-manipulation"
              title={i18n.language === 'en' ? t('footer.language.switchToSpanish') : t('footer.language.switchToEnglish')}
            >
              <span className="text-sm font-bold text-slate-600">{i18n.language === 'en' ? 'EN' : 'ES'}</span>
            </button>
            <span className="text-sm text-slate-500">{t(`footer.language.${i18n.language}`)}</span>
          </div>
          <button onClick={() => { setIsOpen(false); openModal(); }} className="block w-full px-3 py-2 mt-2 text-center text-base font-semibold text-white bg-slate-900 rounded-full shadow-lg shadow-slate-200">{t('nav.bookCall')}</button>
        </motion.div>
      )}
    </nav>
  );
}
