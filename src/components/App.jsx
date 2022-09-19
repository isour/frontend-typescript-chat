import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { ToastContainer } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import routes from '../routes.js';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import NotFound from './NotFound.jsx';
import Register from './Register.jsx';
import Header from "./Header.jsx";
import useAuth from "../hooks/useAuth.js";
import 'react-toastify/dist/ReactToastify.css';
import "../css/App.scss";

const App = () => {  
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);
  
  const AuthRedirect = () => {
    const { isGuest } = useAuth();
    return isGuest() ? <Navigate to="/login" replace /> : <Chat/>
  };
  
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
      <ToastContainer />
    </>
  );
}

export default App;
