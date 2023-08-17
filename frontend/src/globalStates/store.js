import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";
import navSlice from "./navSlice";
import blogSlice from "./blogSlice";

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    navbar: navSlice,
    blog: blogSlice,
  },
});

export default store;
