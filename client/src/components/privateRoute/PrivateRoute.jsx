import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let isLoggedIn = false;
  const data = JSON.parse(localStorage.getItem("users"));
  if (data) {
    const user = Object.entries(data);
    user.forEach((value) => {
      if (value[1].isActive === true) {
        isLoggedIn = true;
      }
    });
  }

  if (isLoggedIn === false) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
