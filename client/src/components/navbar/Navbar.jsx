import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    let allUsers = JSON.parse(localStorage.getItem("users"));
    const data = Object.entries(allUsers);
    data.forEach((value) => {
      value[1].isActive = false;
    });
    allUsers = Object.fromEntries(data);
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.removeItem("userId");
    localStorage.removeItem("post");
    localStorage.removeItem("active");
    navigate("/signin");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">
                  Create Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/myposts">
                  My Posts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/posts">
                  Posts
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
