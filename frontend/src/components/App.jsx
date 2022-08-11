import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import React, { useContext } from "react";

import AuthProvider from "../providers/AuthProvider.js";

import routes from '../routes.js';

import Login from './Login.jsx';
import Chat from './Chat.jsx';
import NotFound from './NotFound.jsx';

import useAuth from "../hooks/useAuth.js";

import "../css/App.scss";


const App = () => {  
  const AuthRedirect = () => {
    const { isGuest } = useAuth();
    return isGuest() ? <Navigate to="/login" replace /> : <Chat/>
  };
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="login/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
