import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext.js';

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
