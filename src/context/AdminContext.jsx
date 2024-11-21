import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  // managing state for doctors data when api returns response appointments state is updated with the data
  const [appointments, setAppointments] = useState([]);

  // async function that fetches all doctors sending a token in headers as admin
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors(data.allDoctors);
        console.log(data.allDoctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // function to change availability sending docId as parameter to api comes from DoctorsList page as item.id where they are mapped
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        // since availability has changed the doctors data will also be needed to change
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // async function with get method to fetch all appointments for admin
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { atoken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // async function with post method to cancel an appointment as admin
  const cancelAppointmentAsAdmin = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // this object contains data and functions to be accessed anywhere in app and passing it as prop in provider
  const value = {
    atoken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointmentAsAdmin,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
