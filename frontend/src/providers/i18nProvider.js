import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from "i18next";
import i18n_loc from '../i18n/index.js';

const I18Provider = ({children}) => {
    const i18n = i18next.createInstance();
    
    i18n.use(initReactI18next).init({
        resources: i18n_loc,
        fallbackLng: 'ru',
    });
    
    return (
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      );
};

export default I18Provider