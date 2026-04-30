import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, any>[];
  language?: string;
  hreflangTags?: { [key: string]: string };
}

export function SEO({
  title = 'Estatify.ai - Advanced Real Estate MLS Platform',
  description = 'Transform your real estate business with Estatify.ai - the most advanced MLS platform. AI-powered property analytics, automated lead generation, and comprehensive property management tools.',
  keywords = 'real estate MLS, property management, AI analytics, real estate CRM, property listing, lead generation, real estate software',
  ogImage = 'https://estatify.ai/og-image.jpg',
  ogType = 'website',
  canonicalUrl = 'https://estatify.ai',
  noIndex = false,
  jsonLd = [],
  language = 'en',
  hreflangTags = { en: 'https://estatify.ai', es: 'https://estatify.ai/es' }
}: SEOProps) {
  const fullTitle = title.includes('Estatify.ai') ? title : `${title} | Estatify.ai`;
  
  return (
    <Helmet>
      {/* Language and locale */}
      <html lang={language} />
      
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags */}
      {hreflangTags && Object.entries(hreflangTags).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Enhanced Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Estatify.ai" />
      <meta property="og:locale" content={language === 'es' ? 'es_ES' : 'en_US'} />
      
      {/* Enhanced Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="Estatify.ai" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
