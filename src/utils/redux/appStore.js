import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import candidatesReducer from "./candidatesSlice";
import employeesSlice from "./employeesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
    employees: employeesSlice,
  },
});

export default appStore;
