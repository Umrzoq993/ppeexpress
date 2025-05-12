import React from "react";
import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";
import "../style/layout.scss";

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
}
