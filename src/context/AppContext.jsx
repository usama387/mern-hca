import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // this object contains data to be accessed and passing it as prop in provider
  const value = {};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
