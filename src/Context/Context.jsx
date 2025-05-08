import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [openCart, setOpenCart] = useState(false);

  // ######################################################################################################################################

  const contextValue = {
    openCart,
    setOpenCart,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
