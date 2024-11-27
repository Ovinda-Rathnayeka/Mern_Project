import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav id="navbar">
      <div id="navbar-logo">User Management</div>
      <ul id="navbar-links">
        <li>
          <Link to="/mainhome">Home</Link>
        </li>
        <li>
          <Link to="/admin">Display All</Link>
        </li>
        <li>
          <a href="/userdashbaord">User Dashboard</a>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
