import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // creating a state to save admin token withSetAToken in Login.jsx after that i can access it using atoken and AdminContext after that we get the aToken saved in localStorage to prevent Login Page render again on reload
  const [atoken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // this object contains data to be accessed anywhere in app and passing it as prop in provider
  const value = {
    atoken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
