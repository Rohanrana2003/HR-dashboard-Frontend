import React from "react";

const Navbar = ({ heading }) => {
  return (
    <div className="navbar">
      <div className="navbar-heading">{heading}</div>

      <div className="navbar-icons">
        <img src="/images/navbar-mail.png" alt="mail-logo" />
        <img src="/images/navbar-bell.png" alt="bell-logo" />
        <img src="/images/navbar-user.png" alt="user-logo" />
      </div>
    </div>
  );
};

export default Navbar;
