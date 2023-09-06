import React from "react";

import { NOT_FOUND } from "../../constants/errors";

import "../../assets/styles/errorpage.css";

const Error = () => {
  return (
    <div className="error-page">
      <h1>{NOT_FOUND}</h1>
    </div>
  );
};

export default Error;
