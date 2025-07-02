import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const LoginPopup = () => (
  <Popup trigger={<button> Okay</button>} position="right center">
    <div> Login Successful !!</div>
  </Popup>
);

export default LoginPopup;
