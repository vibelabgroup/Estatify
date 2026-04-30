import React from 'react';
import { useTranslation } from 'react-i18next';

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

export const RealEstateSchema = ({ 
  name, 
  description, 
  image, 
  address, 
  geo, 
  offers 
}: RealEstateListing) => {
  const { t } = useTranslation('common');

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": name,
    "description": description,
    "image": image,
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
    "offers": offers
  };
};
