import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams:[]
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addteams: (state, action) => {
      state.teams = action.payload;
    }
  },
});

export const {addteams} = teamsSlice.actions;
export default teamsSlice.reducer;
