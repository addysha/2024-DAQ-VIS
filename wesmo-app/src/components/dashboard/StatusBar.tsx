import React from "react";
import "./StatusBar.css";

const StatusBar: React.FC = () => {
  const colour = `good`;

  return (
    <div className="status_bar">
      <div className="mode">
        <i className="fa fa-d icon go"></i>
        <i className="fa fa-square-d icon go"></i>
        <i className="fa fa-n icon stop"></i>
      </div>
      <div className="warnings">
        <i className={`fa fa-car icon range ${colour}`}></i>
        <i className={`fa fa-wrench icon binary ${colour}`}></i>
        <i className={`fa fa-battery-quarter icon range ${colour}`}></i>
      </div>
    </div>
  );
};

export default StatusBar;
