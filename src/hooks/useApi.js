import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext.js';

const useApi = () => {
  const context = useContext(ApiContext);
  return context;
};

export default useApi;
