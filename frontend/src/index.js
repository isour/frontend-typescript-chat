import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import App from './components/App.jsx';
import rootReducer from './slices/index.js';
import apiInit from './logic/api.js';
import ApiContext from './contexts/ApiContext';

const store = configureStore({ reducer: rootReducer })
const root = ReactDOM.createRoot(document.getElementById('root'));

const api = apiInit(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <App />
      </ApiContext.Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
