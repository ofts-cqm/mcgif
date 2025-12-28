import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },

    fallbackLng: 'zh-CN',

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: [
        'querystring',
        'localStorage',
        'navigator'
      ],

      caches: ['localStorage'],
      lookupQuerystring: 'lng'
    }
  });

export default i18n;
