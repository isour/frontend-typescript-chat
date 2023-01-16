/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

import AuthContext, { TAuthContext } from '../contexts/AuthContext';

interface IProps {
  readonly children: React.ReactNode;
}

interface IToken {
  readonly token: string;
  readonly userName: string;
}

const defaultAuth:IToken = {
  token: '',
  userName: 'guest',
};

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const haveSavedAuth = (): IToken => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    return token !== null && userName !== null ? { token, userName } : defaultAuth;
  };

  const [user, setCurrentUser] = useState(haveSavedAuth());

  const isGuest = () => user.userName === 'guest';

  const logIn = (obj: IToken) => {
    localStorage.setItem('token', obj.token);
    localStorage.setItem('username', obj.userName);
    setCurrentUser(obj);
  };

  const logOut = () => {
    localStorage.setItem('token', 'guest');
    localStorage.setItem('username', '');
    setCurrentUser({
      userName: 'guest',
      token: '',
    });
  };

  const getToken = () => {
    const localToken = localStorage.getItem('token');
    return localToken !== null ? localToken : '';
  };

  const providerValues:TAuthContext = {
    user,
    logIn,
    logOut,
    isGuest,
    haveSavedAuth,
    getToken,
  };

  return (
    <AuthContext.Provider value={providerValues}>
      { children }
    </AuthContext.Provider>
  );
};

export { IToken };

export default AuthProvider;
