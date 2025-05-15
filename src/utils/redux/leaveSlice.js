/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const leaveSlice = createSlice({
  name: "leaves",
  initialState: null,
  reducers: {
    setLeaves: (state, action) => {
      return action.payload;
    },

    removeLeaves: (state, action) => {
      return null;
    },
  },
});

export const { setLeaves, removeLeaves } = leaveSlice.actions;
export default leaveSlice.reducer;
