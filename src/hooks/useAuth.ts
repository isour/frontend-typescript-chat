import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import IAuthProviding from '../providers/AuthProvider';

export default () => useContext(AuthContext);
