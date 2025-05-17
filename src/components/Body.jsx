/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftPanel from "./subCompnents/LeftPanel";
import { useDispatch, useSelector } from "react-redux";
import { setSideBar } from "../utils/redux/sideBarSlice";

const Body = () => {
  const sidebar = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (screen.width >= 1270) {
        dispatch(setSideBar(true));
      } else {
        dispatch(setSideBar(false));
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="body-container">
      {sidebar && (
        <div className="left-panel">
          <LeftPanel />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Body;
