import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.js";

const useUserName = () => {
  const context = useContext(AuthContext);
  return context;
};


export default useUserName;