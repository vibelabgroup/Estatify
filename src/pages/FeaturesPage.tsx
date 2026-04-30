import { FeatureBento } from '../components/FeatureBento';
import { AIDemo } from '../components/AIDemo';
import { AnalyticsSection } from '../components/AnalyticsSection';
import { CTABanner } from '../components/CTABanner';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';

export function FeaturesPage() {
  const { t } = useTranslation('features');
  return (
    <div className="pt-20">
      <div className="bg-slate-900 text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 hidden md:block">
            {t('hero.title')}<br/> <span className="text-blue-400">{t('hero.titleHighlight')}</span>.
          </h1>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 md:hidden">
            {t('hero.title')} {t('hero.titleHighlight')}.
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* SEO Component */}
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://estatify.ai/og-features.jpg"
        canonicalUrl="https://estatify.ai/features"
        language="en"
        hreflangTags={{ en: 'https://estatify.ai', es: 'https://estatify.ai/es' }}
      />

      {/* Reuse existing feature sections */}
      <FeatureBento />
      <AIDemo />
      <AnalyticsSection />
      <CTABanner />
    </div>
  );
}
