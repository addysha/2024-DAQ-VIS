import React from "react";
import "./Logo.css";
import WESMOLogo from "../images/WESMOLogo.png";

const Logo: React.FC = () => {
  return (
    <p id="logo">
      <a href="/">
        <img id="imgLogo" src={WESMOLogo} alt="WESMO" />
      </a>
    </p>
  );
};

export default Logo;
