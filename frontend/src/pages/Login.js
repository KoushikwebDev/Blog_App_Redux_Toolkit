import React from "react";
import axios from "axios";
import config from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../globalStates/loginSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => {
    return store.login;
  });
  console.log(userDetails);

  const handleLogin = async () => {
    try {
      let response = await axios.post(
        config.ipAddress + `/login`,
        userDetails,
        { withCredentials: true }
      );
      console.log(response);
      if (response?.data?.success) {
        localStorage.setItem("userEmail", userDetails.email);
        await axios.post(
          config.ipAddress + `/createwelcomeblog`,
          {
            email: userDetails.email,
          },
          { withCredentials: true }
        );
        dispatch(setEmail(""));
        dispatch(setPassword(""));
        if (response?.data?.existingUser?.role === "CONTENT-WRITER") {
          navigate("/home");
        } else if (response?.data?.existingUser?.role === "ADMIN") {
          navigate("/admindashboard");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-1/3 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full mt-1 p-2 border rounded-lg"
            value={userDetails.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="text"
            id="pass"
            className="w-full mt-1 p-2 border rounded-lg"
            value={userDetails.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
