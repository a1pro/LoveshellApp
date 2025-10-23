import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import i18n from './src/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
LogBox.ignoreAllLogs();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      await i18n; // i18n init
      setLoading(false);
    }
    init();
  }, []);

  if (loading) return null;
  return (
    <>
      {/* <I18nextProvider i18n={i18n}> */}
      <AppNavigator />
      <Toast />
      {/* </I18nextProvider> */}
    </>
  );
}
