import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
    English: {
        translation: {
            select_language: 'Select Your Language',
            saved: 'Saved',
            continue: 'Continue',
        },
    },
    Portuguese: {
        translation: {
            select_language: '[translate:Selecione o seu idioma]',
            saved: '[translate:Salvo]',
            continue: '[translate:Continuar]',
        },
    },
    Spanish: {
        translation: {
            select_language: '[translate:Seleccione su idioma]',
            saved: '[translate:Guardado]',
            continue: '[translate:Continuar]',
        },
    },
    French: {
        translation: {
            select_language: '[translate:Sélectionnez votre langue]',
            saved: '[translate:Enregistré]',
            continue: '[translate:Continuer]',
        },
    },
    Italian: {
        translation: {
            select_language: '[translate:Seleziona la tua lingua]',
            saved: '[translate:Salvato]',
            continue: '[translate:Continua]',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'English',
        fallbackLng: 'English',
        resources,
    });

export default i18n;
