import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { showToast } from "../../helpers/showToast.js";
import { saveUser, verifyUser } from "../../helpers/authHelpers";
import {
  saveEmail,
  savePassword,
  saveName,
  confirmDetails,
} from "../../helpers/validationHelpers";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/signin.css";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("active"));
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handlePasswordChange = (e) => {
    const password = e.target.value.trim();
    savePassword(password, setPassword, setPasswordError);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value.trim();
    saveEmail(email, setEmail, setEmailError);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    saveName(name, setName, showToast);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmDetails(
      passwordError,
      emailError,
      saveUser,
      verifyUser,
      showToast,
      name,
      email,
      password,
      navigate
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="container-first">
        <div className="container auth-wrapper">
          <div className="auth-inner">
            <form method="post" className="signup" onSubmit={handleSubmit}>
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  name="name"
                  required
                  minLength="3"
                  maxLength="15"
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  name="email"
                  required
                  onChange={handleEmailChange}
                />
                {emailError && <p>{emailError}</p>}
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  required
                  minLength="5"
                  maxLength="15"
                  onChange={handlePasswordChange}
                />
                {passwordError && <p>{passwordError}</p>}
              </div>

              <div className="d-grid">
                <input
                  type="submit"
                  className="btn submit-btn"
                  value="Sign Up"
                />
              </div>
              <p className="forgot-password text-right text-white">
                Already registered?
                <NavLink to="/signin" className="navlink">
                  sign in
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
