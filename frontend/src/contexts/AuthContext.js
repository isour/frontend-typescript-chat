import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = React.createContext();

const defaultAuth = {
    userName: 'anonymous'
};

export const AuthProvider = ({ children, user }) => {
  const currentUser = localStorage.getItem('token');
  
  const [currentAuth, setCurrentAuth] = useState(
    user || defaultAuth
  );

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
  }

  const saveAuth = (values) => {
    console.log(values, 'values');
    setCurrentAuth(values)
  };

  return (
    <AuthContext.Provider
      value={{ userName: currentAuth, saveAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;