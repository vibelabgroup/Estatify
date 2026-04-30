import { Building2, Users, Rocket, Target } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';
import { LocalBusinessSchema } from '../components/LocalBusinessSchema';

interface Address {
  addressCountry: string;
  addressRegion: string;
  addressLocality: string;
  postalCode: string;
  streetAddress?: string;
}

export function AboutPage() {
  const { t } = useTranslation('about');
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": t('seo.title'),
      "description": t('seo.description'),
      "url": "https://estatify.ai/about",
      "mainEntity": LocalBusinessSchema({
        name: "Estatify.ai",
        description: t('seo.description'),
        address: {
          addressCountry: "Spain",
          addressRegion: "Andalusia",
          addressLocality: "Málaga",
          postalCode: "29001",
          streetAddress: "Calle Marqués de Lema 12"
        },
        geo: {
          latitude: 36.7202,
          longitude: -4.4200
        },
        areaServed: ["Costa del Sol", "Málaga", "Marbella", "Estepona", "Fuengirola", "Torremolinos", "Mijas"],
        url: "https://estatify.ai",
        telephone: "+34 951 234 567",
        email: "support@estatify.ai",
        openingHours: "Mo-Fr 09:00-18:00",
        sameAs: "https://www.linkedin.com/company/estatify-ai",
        priceRange: "$",
        aggregateRating: {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      })
    }
  ];

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://estatify.ai/og-about.jpg"
        canonicalUrl="https://estatify.ai/about"
        language="en"
        hreflangTags={{ en: 'https://estatify.ai', es: 'https://estatify.ai/es' }}
        jsonLd={structuredData}
      />
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed mb-8">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" alt="Team meeting" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('storyTitle')}</h2>
            <div className="space-y-4 text-slate-600 font-light leading-relaxed">
              <p>{t('story.0')}</p>
              <p>{t('story.1')}</p>
              <p>{t('story.2')}</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('mission.title')}</h3>
            <p className="text-slate-500 font-light">{t('mission.description')}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('localFocus.title')}</h3>
            <p className="text-slate-500 font-light">{t('localFocus.description')}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('clientFirst.title')}</h3>
            <p className="text-slate-500 font-light">{t('clientFirst.description')}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('innovation.title')}</h3>
            <p className="text-slate-500 font-light">{t('innovation.description')}</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
