import axios from "axios";
import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import { setUserName } from "../globalStates/navSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((store) => {
    return store.navbar;
  });
  console.log(userName);
  const userEmail = localStorage.getItem("userEmail");
  const getUserInfo = async () => {
    try {
      let response = await axios.post(config.ipAddress + `/getuserinfo`, {
        email: userEmail,
      });
      console.log(response?.data?.user);
      if (response?.data?.user?.name) {
        dispatch(setUserName(response?.data?.user?.name));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      let response = await axios.get(config.ipAddress + `/logout`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex gap-x-5">
        <FiUser className="text-white text-2xl" />
        <div>
          <h1 className="text-white font-semibold">
            Hello {userName.userName}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-x-5">
        <a href="/" className="text-white mr-4">
          Home
        </a>
        <button onClick={handleLogout} className="text-white">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
