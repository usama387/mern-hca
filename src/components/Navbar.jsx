import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);

  const handleLogout = () => {
    navigate("/")
    atoken && setAToken("");
    atoken && localStorage.removeItem("aToken");
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b rounded-sm text-base text-gray-500">
      <div className="flex items-center gap-2 text-sm">
        <p className="bg-blue-300 text-gray-500 rounded-md px-2 py-1 font-bold text-xl cursor-pointer">
          Pulseo
        </p>
        <p className="font-semibold rounded-full border border-gray-500 px-2.5 py-0.5">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
