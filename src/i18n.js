import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';
import spanish from './languages/es';
import english from './languages/en';

const resources = {
    es: spanish,
    en: english,
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ['htmlTag'],
        },
        fallbackLng: 'en',
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
