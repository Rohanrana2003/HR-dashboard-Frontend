import axios from "axios";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const LeftPanel = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      setShowLogoutPopup(false);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
    console.log("Logout clicked");
  };
  return (
    <div className="left-panel">
      <div className="logo-container">
        <img className="logo" src="/images/Logo.png" alt="logo" />
      </div>

      <section>
        <h1>Recruitment</h1>
        <div>
          <img src="/images/candidates-icon.png" alt="logo" />
          <NavLink
            to={"/candidates"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Candidates
          </NavLink>
        </div>
      </section>

      <section>
        <h1>Organization</h1>
        <div>
          <img src="/images/employees-icon.png" alt="logo" />
          <NavLink
            to={"/employees"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Employees
          </NavLink>
        </div>
        <div>
          <img src="/images/attendance-icon.png" alt="logo" />
          <NavLink
            to={"/attendance"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Attendance
          </NavLink>
        </div>
        <div>
          <img src="/images/leaves-icon.png" alt="logo" />
          <NavLink
            to={"/leaves"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Leaves
          </NavLink>
        </div>
      </section>

      <section>
        <h1>Logout</h1>
        <div>
          <img src="/images/logout-icon.png" alt="logo" />
          <p onClick={() => setShowLogoutPopup(true)}>Logout</p>
        </div>
      </section>

      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Are you sure you want to logout?</h3>
            <div className="popup-actions">
              <button onClick={() => setShowLogoutPopup(false)}>Cancel</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
