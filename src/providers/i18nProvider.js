import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import I18nLoc from '../i18n/index.js';

function I18Provider({ children }) {
  const i18n = i18next.createInstance();

  i18n.use(initReactI18next).init({
    resources: I18nLoc,
    fallbackLng: 'ru',
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18Provider;
