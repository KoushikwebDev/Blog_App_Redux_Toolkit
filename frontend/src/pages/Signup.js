import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setName, setPassword } from "../globalStates/signupSlice";
import axios from "axios";
import config from "../utils/config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((store) => {
    return store.signup;
  });

  // console.log(userDetails);

  const handleSignup = async () => {
    try {
      let response = await axios.post(
        config.ipAddress + `/signup`,
        userDetails
      );
      console.log(response);
      if (response?.data?.status === 200) {
        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-1/3 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full mt-1 p-2 border rounded-lg"
            value={userDetails.name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
        </div>

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
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
