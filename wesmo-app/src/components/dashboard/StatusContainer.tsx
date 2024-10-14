/*
 * File: components/dashboard/StatusContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component showing icons which relate to data statuses.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useState, useEffect, useMemo } from "react";
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
  onError?: (error: string) => void;
}

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

const StatusContainer: React.FC<Props> = ({
  textValue = "",
  stateValue = 0,
  lightText = false,
  onError,
}) => {
  // Function to get active status flags
  const activeStatuses = useMemo((): Status[] => {
    return Object.values(Status)
      .filter((status) => {
        return typeof status === "number" && (stateValue & status) !== 0;
      })
      .map((status) => Status[status as keyof typeof Status]);
  }, [stateValue]);

  useEffect(() => {
    if (onError) {
      activeStatuses.forEach((value) => {
        onError(`${value}: Critical`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatuses]);

  const errorValue = activeStatuses.length > 0 ? 3 : 1;

  const iconClass = iconClasses[errorValue] || iconClasses[1];
  const iconColor = colors[errorValue] || "#4da14b";
  const statusValue = types[errorValue] || types[1];

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
              <ol className="bms">
                {activeStatuses.map((status, index) => (
                  <li key={index}>{status}</li>
                ))}
              </ol>
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
