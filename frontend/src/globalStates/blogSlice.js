import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  body: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
  },
});

export const { setTitle, setBody } = blogSlice.actions;

export default blogSlice.reducer;
