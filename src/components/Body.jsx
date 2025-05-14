import React from "react";
import { Outlet } from "react-router-dom";
import LeftPanel from "./subCompnents/LeftPanel";

const Body = () => {
  return (
    <div className="body-container">
      <LeftPanel />
      <Outlet />
    </div>
  );
};

export default Body;
