import React from "react";
import { useRouteError } from "react-router"; // use `react-router-dom`, not `react-router`

import "../styles/Error.css";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-code">{err.status || "404"}</h1>
        <h2 className="error-text">{err.statusText || "Page Not Found"}</h2>
        <p className="error-message">
          Oops! Something went wrong. The page you’re looking for doesn’t exist
          or an unexpected error occurred.
        </p>
        <a className="error-btn" href="/">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Error;
