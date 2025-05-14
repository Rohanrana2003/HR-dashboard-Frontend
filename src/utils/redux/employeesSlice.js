import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: null,
  reducers: {
    addEmployees: (state, action) => {
      return action.payload;
    },
    removeEmployees: () => {
      return null;
    },
  },
});

export const { addEmployees, removeEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
