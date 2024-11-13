import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    
  // this object contains data to be accessed and passing it as prop in provider
  const value = {};

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
