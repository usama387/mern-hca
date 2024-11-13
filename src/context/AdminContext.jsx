import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // this object contains data to be accessed and passing it as prop in provider
  const value = {};

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
