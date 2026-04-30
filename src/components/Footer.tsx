import { Building2, Twitter, Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">estatify.ai</span>
            </div>
            <p className="text-slate-500 font-light leading-relaxed mb-8 max-w-sm text-sm">
              The all-in-one platform helping real estate agencies in Costa del Sol turn more website visitors into closed deals through AI, analytics, and intelligent automation.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">{t('footer.product')}</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link to="/features" className="hover:text-blue-600 transition-colors">{t('footer.aiDescriptions')}</Link></li>
              <li><Link to="/features" className="hover:text-blue-600 transition-colors">{t('footer.smartLanding')}</Link></li>
              <li><Link to="/features" className="hover:text-blue-600 transition-colors">{t('footer.behavioralAnalytics')}</Link></li>
              <li><Link to="/features" className="hover:text-blue-600 transition-colors">{t('footer.resalesSync')}</Link></li>
              <li><Link to="/features" className="hover:text-blue-600 transition-colors">{t('footer.leadProtection')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors">{t('footer.blog')}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">{t('footer.bookDemo')}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">{t('footer.contactUs')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li>
                <a href="mailto:support@estatify.ai" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400" />
                  support@estatify.ai
                </a>
              </li>
              <li className="flex items-start gap-3 mt-4">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Costa del Sol<br/>
                  Málaga, Spain
                </span>
              </li>
              <li>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 mt-6">
                  <p className="text-xs font-semibold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {t('footer.liveChat')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{t('footer.liveChatComingSoon')}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-400 text-sm font-light">
            © {new Date().getFullYear()} Estatify.ai. {t('footer.copyright')}.
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500 font-light">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">{t('footer.termsOfService')}</Link>
            <Link to="/cookies" className="hover:text-slate-900 transition-colors">{t('footer.cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
