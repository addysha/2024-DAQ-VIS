import React from "react";
import "./StatusContainer.css";

const iconClasses = {
  1: "fa-solid fa-circle-check status__icon",
  2: "fa-solid fa-triangle-exclamation status__icon",
  3: "fa-solid fa-triangle-exclamation status__icon",
  4: "fa-solid fa-triangle-exclamation status__icon",
};

const colors = {
  1: "#4da14b",
  2: "#eac054",
  3: "#af1317",
  4: "#3274B1",
};

const types = {
  1: "No Issue",
  2: "Mechanical Fault",
  3: "Electrical Fault",
  4: "Unknown Issue",
};

interface Props {
  textValue: string;
  stateValue: number;
  lightText?: boolean;
}

const StatusContainer: React.FC<Props> = ({
  textValue = "",
  stateValue = 0,
  lightText = false,
}) => {
  const iconClass = iconClasses[stateValue] || iconClasses[1];
  const iconColor = colors[stateValue] || "#4da14b";
  const statusValue = types[stateValue] || types[1];

  const iconStyle = {
    color: iconColor,
    fontSize: "50px",
  };

  console.log(stateValue);
  const computedTextColourClass = lightText ? "text--light" : "text--dark";

  return (
    <div className="status__container">
      <p className={`status__text-label ${computedTextColourClass}`}>
        {textValue}
      </p>
      <i className={iconClass} style={iconStyle} />
      <p className={`status__text-status ${computedTextColourClass}`}>
        {statusValue}
      </p>
    </div>
  );
};

export default StatusContainer;
