import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 projects:[],
};

const authSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
