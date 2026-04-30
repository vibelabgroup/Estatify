import React from 'react';

interface RealEstateListing {
  "@context": "https://schema.org";
  "@type": "RealEstateListing";
  name: string;
  description: string;
  image: string;
  address: {
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
    postalCode: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface LocalBusiness {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  description: string;
  address: {
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
    postalCode: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
}

interface FAQPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "FAQ";
    name: string;
    description: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  };
}

export const structuredDataGenerators = {
  realEstateListing: (listing: RealEstateListing) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    ...listing
  }),

  localBusiness: (business: LocalBusiness) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...business
  }),

  faqPage: (faq: FAQPage) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...faq
  })
};
