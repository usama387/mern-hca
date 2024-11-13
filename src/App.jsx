import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

const App = () => {
  const { atoken } = useContext(AdminContext);

  // where there is token Login Page is not visible means we have an admin logged in
  return atoken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
