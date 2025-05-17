import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSideBar } from "../../utils/redux/sideBarSlice";

const Navbar = ({ heading }) => {
  const dispatch = useDispatch();

  const sideBar = useSelector((state) => state.sideBar);
  console.log(sideBar);
  return (
    <div className="navbar">
      <div className="navbar-leftSection">
        <img
          src="/images/sidebar.png"
          alt="logo"
          className="sidebar-logo"
          onClick={() => {
            dispatch(setSideBar(true));
          }}
        />
        <div className="navbar-heading">{heading}</div>
      </div>
      <div className="navbar-icons">
        <img src="/images/navbar-mail.png" alt="mail-logo" />
        <img src="/images/navbar-bell.png" alt="bell-logo" />
        <img src="/images/navbar-user.png" alt="user-logo" />
      </div>
    </div>
  );
};

export default Navbar;
