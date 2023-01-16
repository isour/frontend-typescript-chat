import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react';
import { io, Socket } from 'socket.io-client';
import reportWebVitals from './reportWebVitals';

import App from './components/App';
import store, { rootState } from './store/index';
import apiInit from './logic/api';
import ApiContext from './contexts/ApiContext';
import I18Provider from './providers/i18nProvider';
import AuthProvider from './providers/AuthProvider';

const isProd = process.env.NODE_ENV === 'production';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const initApp = () => {
  const socket: Socket = io();
  const api = apiInit(socket, store);

  const rollbarConfig = {
    enabled: isProd,
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
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
};

root.render(initApp());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
