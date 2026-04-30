import { Hero } from '../components/Hero';
import { SocialProofSlider } from '../components/SocialProofSlider';
import { ProblemSection } from '../components/ProblemSection';
import { FeatureBento } from '../components/FeatureBento';
import { AIDemo } from '../components/AIDemo';
import { BeforeAfter } from '../components/BeforeAfter';
import { LandingPageComparison } from '../components/LandingPageComparison';
import { AnalyticsSection } from '../components/AnalyticsSection';
import { CTABanner } from '../components/CTABanner';
import { Comparison } from '../components/Comparison';
import { ResultsSection } from '../components/ResultsSection';
import { FAQ } from '../components/FAQ';
import { LatestPosts } from '../components/LatestPosts';
import { CTA } from '../components/CTA';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';
import { structuredDataGenerators } from '../components/StructuredData';

export function LandingPage() {
  const { t } = useTranslation('home');
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": t('seo.title'),
      "description": t('seo.description'),
      "url": "https://estatify.ai",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Estatify MLS Platform",
        "applicationCategory": "Real Estate Software",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": t('common.freeTrialAvailable')
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Real Estate MLS Platform",
      "description": "Complete MLS solution with AI analytics, property management, and lead generation",
      "provider": {
        "@type": "Organization",
        "name": "Estatify.ai",
        "url": "https://estatify.ai"
      },
      "serviceType": "Real Estate Software",
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Real Estate Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Property Management"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Analytics"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lead Generation"
            }
          }
        ]
      }
    }
  ];

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://estatify.ai/og-home.jpg"
        canonicalUrl="https://estatify.ai"
        language="en"
        hreflangTags={{ en: 'https://estatify.ai', es: 'https://estatify.ai/es' }}
        jsonLd={structuredData}
      />
      <Hero />
      <SocialProofSlider />
      <ProblemSection />
      <ResultsSection />
      <FeatureBento />
      <AIDemo />
      <BeforeAfter />
      <LandingPageComparison />
      <AnalyticsSection />
      <CTABanner />
      <Comparison />
      <FAQ />
      <LatestPosts />
      <CTA />
    </>
  );
}
