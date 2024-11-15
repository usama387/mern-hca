import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // creating a state to save admin token withSetAToken in Login.jsx after that i can access it using atoken and AdminContext after that we get the aToken saved in localStorage to prevent Login Page render again on reload
  const [atoken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  // backend url address
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // managing state for doctors data when api returns response doctors state is updated with the data
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: atoken }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // this object contains data to be accessed anywhere in app and passing it as prop in provider
  const value = {
    atoken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
