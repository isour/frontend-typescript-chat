import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import React, { useContext } from "react";

import AuthContext, {AuthProvider} from "../contexts/AuthContext.js";

import routes from '../routes.js';

import Login from './Login.jsx';
import Chat from './Chat.jsx';
import NotFound from './NotFound.jsx';

import useUserName from "../hooks/useUserName.js";

import "../css/App.scss";


const App = () => {    
  const AuthRedirect = () => {
    const { userName, saveAuth } = useUserName();

    const currentUser = localStorage.getItem('user');
    console.log(useContext(AuthContext).userName, '!!!!!');
    let trueUserName = '';
    const defaultUserName = useContext(AuthContext).userName.userName;
    if (currentUser) {
      trueUserName = currentUser;
      console.log('here 1');
      // saveAuth({
      //   userName: currentUser
      // });
    } else {
      trueUserName = defaultUserName;
      console.log('here 2');
    }
    // console.log(userName, '123', userName === 'anonymous');
    return trueUserName === 'anonymous' ? <Navigate to="/login" replace /> : <Chat/>
  };
  
  return (
    <AuthProvider value={{userName: 'anonymous'}}>
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
