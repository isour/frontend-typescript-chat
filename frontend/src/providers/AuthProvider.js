import React, { useState } from "react";

import AuthContext from "../contexts/AuthContext.js";

const defaultAuth = {
    userName: 'guest',
    token: ''
};

const AuthProvider = ({ children, config }) => {    
    const haveSavedAuth = () => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('username');
        return token ? { token,userName } : defaultAuth;
    }

    const [user, setCurrentUser] = useState(haveSavedAuth());

    const isGuest = () => user.userName === 'guest';
    
    const logIn = (obj) => {
        localStorage.setItem('token', obj.token);
        localStorage.setItem('username', obj.userName);
        setCurrentUser(obj);
    };

    const logOut = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      setCurrentUser({
        userName: 'guest',
        token: ''
      });  
    };

    const getToken = () => {
      return localStorage.getItem('token');
    }
  
    return (
      <AuthContext.Provider
        value={{ user, logIn, logOut, isGuest, haveSavedAuth, getToken }}
      >
        {children}
      </AuthContext.Provider>
    );
};

export { AuthProvider as default};