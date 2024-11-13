import { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  // managing state for login entity either admin or doctor
  const [loginState, setLoginState] = useState("Admin");

  // state to store email
  const [email, setEmail] = useState("");

  // state to store email
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (loginState === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/admin-login",
          {
            email,
            password,
          }
        );
        if (data.success) {
          // save the token in local storage
          localStorage.setItem("aToken", data.token);

          console.log(data.token);
          // now update the token state received in data which tells if this id is admin or not
          setAToken(data.token);
          toast.success("Welcome Back")
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-base shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{loginState} </span>
          Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            name=""
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            name=""
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className="bg-gradient-to-r from-purple-800 to-indigo-900 w-full py-2 rounded-md text-base text-white">
          Login
        </button>

        {loginState === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setLoginState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setLoginState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
