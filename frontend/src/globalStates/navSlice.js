import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setUserName: (state, actions) => {
      state.userName = actions.payload;
    },
  },
});

export const { setUserName } = navSlice.actions;

export default navSlice.reducer;
