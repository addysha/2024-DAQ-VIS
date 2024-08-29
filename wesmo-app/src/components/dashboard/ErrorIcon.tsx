import React from "react";
import "./Icons.css";

const ErrorIcon: React.FC = () => {
  function handleClick() {
    alert("You clicked me");
  }

  return (
    <div onClick={handleClick}>
      <i className="fa-solid fa-triangle-exclamation error_icon"></i>
    </div>
  );
};

export default ErrorIcon;
