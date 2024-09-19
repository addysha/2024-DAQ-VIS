/*
 * File: components/dashboard/StatusBar.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component which lists different main components of the vehicle and their status.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { CSSProperties } from "react";
import "./StatusBar.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  data: DataItem[];
}

const StatusBar: React.FC<Props> = ({ data }) => {
  const getColorFromValue = (value: number | string): string => {
    if (typeof value === "number") {
      if (value === 0) return "#4da14b";
      if (value === 1) return "#eac054";
      return "#af1317";
    }
    return "#bbb";
  };

  const batteryTemp = data.find((item) => item.name === "Battery Temperature");

  const statusLabels = [
    { label: "Ready to Drive", dataName: "Ready to Drive" },
    { label: "Electrical Systems", dataName: "Electrical Systems" },
    { label: "Sensors", dataName: "Sensors" },
    { label: "Low Voltage", dataName: "Low Voltage" },
    { label: "Battery Systems", dataName: "Battery Temperature" },
  ];

  const dataMap = new Map(data.map((item) => [item.name, item]));

  const statusItems = statusLabels.map(({ label, dataName }, index) => {
    const dataItem = dataMap.get(dataName);
    let color = "";
    if (dataName === "Battery Temperature") {
      if (batteryTemp && +batteryTemp.value > 40) {
        color = "#af1317";
      } else {
        color = "#4da14b";
      }
    } else {
      color = dataItem ? getColorFromValue(dataItem.value) : "#bbb";
    }

    const dotStyle: CSSProperties = {
      backgroundColor: color,
    };

    if (
      dataName === "Battery Temperature" &&
      batteryTemp &&
      +batteryTemp.value > 40
    ) {
      return (
        <div className="info" key={index}>
          <i className="fa-solid fa-fan icon" style={{ color: "#af1317" }}></i>
          <p>{label}</p>
        </div>
      );
    } else {
      return (
        <div className="info" key={index}>
          <span className="dot" style={dotStyle}></span>
          <p>{label}</p>
        </div>
      );
    }
  });

  return (
    <div className="status_bar">
      <div className="title">
        <h3>System Status</h3>
      </div>
      <br />
      {statusItems}
    </div>
  );
};

export default StatusBar;
