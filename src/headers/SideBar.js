import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Welcome To<br/>DhaTvi<br/>Business Solutions</h2>

      <ul className="sidebar-menu">
        <li><NavLink to="/">📊 Dashboard</NavLink></li>
        <li><NavLink to="/">👥 Employee Management</NavLink></li>
        <li><NavLink to="/">🕒 Leaves & Attendance</NavLink></li>
        <li><NavLink to="/">💼 Careers</NavLink></li>
        <li><NavLink to="/">📋 Requests</NavLink></li>
        <li><NavLink to="/">⚙️ Settings</NavLink></li>
      </ul>
    </div>
  );
}
