import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import candidatesReducer from "./candidatesSlice";
import employeesSlice from "./employeesSlice";
import leaveReducer from "./leaveSlice";
import sideBarSlice from "./sideBarSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
    employees: employeesSlice,
    leaves: leaveReducer,
    sideBar: sideBarSlice,
  },
});

export default appStore;
