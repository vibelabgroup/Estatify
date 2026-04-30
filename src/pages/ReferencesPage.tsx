import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { ReferenceLayout } from '../components/references';
import { references } from '../data/references';
import React, { memo, useMemo } from 'react';

interface ReferenceCardProps {
  reference: typeof references[0];
  index: number;
  t: (key: string) => string;
}

const ReferenceCard = memo<ReferenceCardProps>(({ reference, index, t }) => {
  return (
    <motion.div
      key={reference.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 2) * 0.1 }}
      className="flex flex-col relative"
    >
      <div className="flex items-center justify-between mb-6 px-2 relative z-10 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center" aria-hidden="true">
            <Check className="w-5 h-5 text-blue-600 font-bold" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{reference.title}</h3>
            <p className="text-sm text-slate-500 font-medium">{t('landingPageMockup')}</p>
          </div>
        </div>
      </div>

      <ReferenceLayout reference={reference} />
    </motion.div>
  );
});

ReferenceCard.displayName = 'ReferenceCard';

export function ReferencesPage() {
  const { t } = useTranslation('references');
  
  const memoizedReferences = useMemo(() => references, []);

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://estatify.ai/og-references.jpg"
        canonicalUrl="https://estatify.ai/references"
        language="en"
        hreflangTags={{ en: 'https://estatify.ai', es: 'https://estatify.ai/es' }}
      />
      
      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </header>

          <section 
            className="grid lg:grid-cols-2 gap-12 lg:gap-16"
            aria-label={t('propertyReferenceExamples')}
          >
            {memoizedReferences.map((reference, index) => (
              <ReferenceCard 
                key={reference.id}
                reference={reference}
                index={index}
                t={t} 
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
