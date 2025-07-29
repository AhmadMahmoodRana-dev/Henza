import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {
  const [openCart, setOpenCart] = useState(false);
const navigate = useNavigate()
  // utils/auth.js
 const logout = () => {
  localStorage.removeItem("authToken");
  navigate("/");
};


  // ######################################################################################################################################

  const contextValue = {
    openCart,
    setOpenCart,
    logout
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
