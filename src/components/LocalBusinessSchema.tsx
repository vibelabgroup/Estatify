import React from 'react';
import { useTranslation } from 'react-i18next';

interface LocalBusinessProps {
  name: string;
  description: string;
  address: {
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
    postalCode: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
}

export const LocalBusinessSchema = ({ 
  name, 
  description, 
  address, 
  geo, 
  areaServed 
}: LocalBusinessProps) => {
  const { t } = useTranslation('common');

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": address.addressCountry,
      "addressRegion": address.addressRegion,
      "addressLocality": address.addressLocality,
      "postalCode": address.postalCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "areaServed": areaServed,
    "url": "https://estatify.ai",
    "telephone": "+34 951 234 567",
    "email": "support@estatify.ai",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": "https://www.linkedin.com/company/estatify-ai",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };
};
