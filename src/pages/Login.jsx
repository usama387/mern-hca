import { useState } from "react";
import { assets } from "../assets/assets_admin/assets";

const Login = () => {
  const [loginState, setLoginState] = useState("Admin");

  return (
    <form className="min-h-[80vh] flex items-center">
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
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            name=""
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>

        <button className="bg-gradient-to-r from-purple-800 to-indigo-900 w-full py-2 rounded-md text-base text-white">
          Login
        </button>

        {loginState === "Admin" ? (
          <p>
            Doctor Login? <span className="text-primary underline cursor-pointer" onClick={()=>setLoginState("Doctor")}>Click Here</span>
          </p>
        ) : (
          <p>
            Admin Login? <span className="text-primary underline cursor-pointer" onClick={()=>setLoginState("Admin")}>Click Here</span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
