import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

import i18n from './src/context/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/store/store/Store';

LogBox.ignoreAllLogs();

const LoadLanguage = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('selectedLanguage');
      if (savedLang) {
        await i18n.changeLanguage(savedLang);
      }
    };
    loadLanguage();
  }, [i18n]);

  return <>{children}</>;
};

export default function App() {
  return (
    <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <LoadLanguage>
        <AppNavigator />
        <Toast />
      </LoadLanguage>
    </I18nextProvider>
    </Provider>
  );
}
