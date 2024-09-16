/*
 * File: components/dashboard/StatusContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024-09-14
 * Description: A container component showing icons which relate to data statuses.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useState } from "react";
import "./StatusContainer.css";
import PopUp from "./PopUpContainer.tsx";

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
  1: "No Issue" || "",
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
  enum Status {
    VOLTAGE = 1,
    CURRENT = 2,
    RELAY = 4,
    CELL_BALANCING = 8,
    CHARGE_INTERLOCK = 16,
    THERMISTOR_B_VALUE_INVALID = 32,
    INPUT_POWER_SUPPLY = 64,
    RESERVED = 128,
  }

  function indexFailsafeStatus(value: number): string[] {
    const setFlags: string[] = [];

    for (const status in Status) {
      const statusValue = Number(Status[status]);
      if (!isNaN(statusValue) && value & statusValue) {
        setFlags.push(status);
      }
    }

    return setFlags;
  }

  let error_value = 0;

  const bms_errors = indexFailsafeStatus(stateValue);

  if (bms_errors.length !== 0) {
    error_value = 3;
  }

  const iconClass = iconClasses[error_value] || iconClasses[1];
  const iconColor = colors[error_value] || "#4da14b";
  const statusValue = types[error_value] || types[1];

  const iconStyle = {
    color: iconColor,
    fontSize: "50px",
  };

  const computedTextColourClass = lightText ? "text--light" : "text--dark";

  const [isPopUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState<React.ReactNode>(null);

  const togglePopUp = (content?: React.ReactNode) => {
    setPopUpContent(content ?? null);
    setPopUpVisible((prev) => !prev);
  };

  return (
    <div>
      <PopUp isVisible={isPopUpVisible} onClose={() => setPopUpVisible(false)}>
        {popUpContent}
      </PopUp>
      <div
        className="status__container"
        onClick={() =>
          togglePopUp(
            <div>
              <h3>BMS System</h3>
              <h4>The active failsafe statuses:</h4>
              <ol className="bms">{bms_errors}</ol>
            </div>
          )
        }
      >
        <p className={`status__text-label ${computedTextColourClass}`}>
          {textValue}
        </p>
        <i className={iconClass} style={iconStyle} />
        <p className={`status__text-status ${computedTextColourClass}`}>
          {statusValue}
        </p>
      </div>
    </div>
  );
};

export default StatusContainer;
