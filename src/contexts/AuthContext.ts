import React from 'react';

import { IToken } from '../providers/AuthProvider';

type TAuthContext = {
    readonly user: IToken;
    readonly logIn: (obj: IToken) => void;
    readonly logOut: () => void;
    readonly isGuest: () => boolean;
    readonly haveSavedAuth: () => IToken;
    readonly getToken: () => string;
}

const defaultState = null;

const AuthContext = React.createContext<TAuthContext | null>(defaultState);

export { TAuthContext };

export default AuthContext;
