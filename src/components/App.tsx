import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import leoProfanity from 'leo-profanity';

import routes from '../routes';
import Login from './Login';
import Chat from './Chat';
import NotFound from './NotFound';
import Register from './Register';
import Header from './Header';
import Modal from './Modal';
import useAuth from '../hooks/useAuth';
import { TAuthContext } from '../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import '../css/App.scss';

const AuthRedirect = () => {
  const { isGuest } = useAuth() as TAuthContext;
  return isGuest() ? <Navigate to="/login" replace /> : <Chat />;
};

const App = () => {
  // const ruDict = leoProfanity.getDictionary('ru');
  // leoProfanity.add(ruDict);
  // ???
  console.log('test');

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path={routes.frontend.loginPath()} element={<Login />} />
          <Route path={routes.frontend.registerPath()} element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Modal className="chat-layout__modal" />
      <ToastContainer />
    </>
  );
};

export default App;
