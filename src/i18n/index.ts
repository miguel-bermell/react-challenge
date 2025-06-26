import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import customReactFormEn from './locales/en/custom-react-form';
import customReactFormEs from './locales/es/custom-react-form';

const defaultNS = 'custom-react-form';

export const resources = {
  en: {
    'custom-react-form': customReactFormEn,
  },
  es: {
    'custom-react-form': customReactFormEs,
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: [defaultNS],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}

export default i18n;
