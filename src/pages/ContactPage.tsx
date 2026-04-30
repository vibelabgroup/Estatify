import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export function ContactPage() {
  const { t } = useTranslation('contact');
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            <SEO
              title={t('seo.title')}
              description={t('seo.description')}
              keywords={t('seo.keywords')}
              ogImage="https://estatify.ai/og-contact.jpg"
              canonicalUrl="https://estatify.ai/contact"
              language="en"
              hreflangTags={{ en: 'https://estatify.ai', es: 'https://estatify.ai/es' }}
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{t('email.title')}</h3>
                  <p className="text-slate-500 font-light mb-2">{t('email.description')}</p>
                  <a href="mailto:support@estatify.ai" className="text-blue-600 font-medium hover:text-blue-700">{t('email.email')}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{t('liveChat.title')}</h3>
                  <p className="text-slate-500 font-light mb-2">{t('liveChat.description')}</p>
                  <span className="text-slate-400 font-medium italic">{t('liveChat.unavailable')}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{t('office.title')}</h3>
                  <p className="text-slate-500 font-light mb-2">{t('office.description')}</p>
                  <p className="text-slate-600 font-medium">{t('office.location')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/40">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('form.title')}</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700">{t('form.firstName')}</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light" placeholder={t('form.placeholder.firstName')} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700">{t('form.lastName')}</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light" placeholder={t('form.placeholder.lastName')} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">{t('form.email')}</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light" placeholder={t('form.placeholder.email')} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">{t('form.message')}</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light resize-none" placeholder={t('form.placeholder.message')}></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 mt-2">
                {t('form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
