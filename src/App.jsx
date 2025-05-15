import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import Candidates from "./components/Candidates";
import Employees from "./components/Employees";
// import ProtectedRoute from "./utils/ProtectedRoute";
import Attendance from "./components/Attendance";
import Leaves from "./components/Leaves";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<Body />}>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaves" element={<Leaves />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
