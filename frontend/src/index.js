import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { Provider as RollbarProvider } from '@rollbar/react';

import App from './components/App.jsx';
import rootReducer from './slices/index.js';
import apiInit from './logic/api.js';
import ApiContext from './contexts/ApiContext';
import I18Provider from "./providers/i18nProvider.js";
import AuthProvider from "./providers/AuthProvider.js";

const isProd = process.env.NODE_ENV === 'production';

const store = configureStore({ reducer: rootReducer })
const root = ReactDOM.createRoot(document.getElementById('root'));

const api = apiInit(store);

const rollbarConfig = {
    enabled: isProd,
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
}

root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <AuthProvider>
          <I18Provider>
            <ApiContext.Provider value={api}>
              <App />
            </ApiContext.Provider>
          </I18Provider>
        </AuthProvider>
      </Provider>
    </RollbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
