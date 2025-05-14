import { createSlice } from "@reduxjs/toolkit";

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: null,
  reducers: {
    addCandidates: (state, action) => {
      return action.payload;
    },
    removeCandidates: () => {
      return null;
    },
  },
});

export const { addCandidates, removeCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
