import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import enHome from './locales/en/home.json';
import esHome from './locales/es/home.json';
import enAbout from './locales/en/about.json';
import esAbout from './locales/es/about.json';
import enContact from './locales/en/contact.json';
import esContact from './locales/es/contact.json';
import enFeatures from './locales/en/features.json';
import esFeatures from './locales/es/features.json';
import enReferences from './locales/en/references.json';
import esReferences from './locales/es/references.json';
import enFaq from './locales/en/faq.json';
import esFaq from './locales/es/faq.json';
import enLegalFull from './locales/en/legal-full.json';
import esLegalFull from './locales/es/legal-full.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    contact: enContact,
    features: enFeatures,
    references: enReferences,
    faq: enFaq,
    'legal-full': enLegalFull
  },
  es: {
    common: esCommon,
    home: esHome,
    about: esAbout,
    contact: esContact,
    features: esFeatures,
    references: esReferences,
    faq: esFaq,
    'legal-full': esLegalFull
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'about', 'contact', 'features', 'references', 'faq', 'legal-full'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
