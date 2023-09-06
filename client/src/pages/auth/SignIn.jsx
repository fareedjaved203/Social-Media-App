import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { showToast } from "../../helpers/showToast.js";
import { verifyUser } from "../../helpers/authHelpers";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("active"));
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = verifyUser(email, password, navigate, showToast);
  };

  return (
    <>
      <div className="container-first">
        <ToastContainer></ToastContainer>
        <div className="container auth-wrapper">
          <div className="auth-inner">
            <form method="post" onSubmit={handleSubmit}>
              <h3>Login</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <input
                  type="submit"
                  className="btn submit-btn"
                  value="Submit"
                />
              </div>
              <p className="forgot-password text-right text-white">
                Already registered?
                <NavLink to="/signup" className="navlink">
                  sign up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
