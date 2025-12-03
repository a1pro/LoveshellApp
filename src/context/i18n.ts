import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import pt from './pt.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en},
      pt: { translation: pt },
      es: { translation: es },
      fr: { translation: fr },
      it: { translation: it },
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
