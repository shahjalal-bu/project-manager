import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.teams = action.payload;
    },
  },
});

export const { addUsers } = usersSlice.actions;
export default usersSlice.reducer;
