import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Task Manager</h1>
      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/signup">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
