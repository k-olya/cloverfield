import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
};

export const initI18n = (lng = 'ru') => i18n
  .use(initReactI18next)
  .init({
    resources, // we will add translations here
    lng, // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n; 