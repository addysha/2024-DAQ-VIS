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
  const motorTemp = data.find((item) => item.name === "Motor Temperature");
  const rtd_switch_state = data.find(
    (item) => item.name === "RTD Switch State"
  );
  const vcu_error = data.find((item) => item.name === "VCU Error Present");
  const break_conflict = data.find((item) => item.name === "Break Conflict");
  const wheelSpeed_lf = data.find((item) => item.name === "Wheel Speed FL");
  const wheelSpeed_rf = data.find((item) => item.name === "Wheel Speed FR");
  const wheelSpeed_lb = data.find((item) => item.name === "Wheel Speed RL");
  const wheelSpeed_rb = data.find((item) => item.name === "Wheel Speed RR");
  const brake_pressure_rear = data.find(
    (item) => item.name === "Break Pressure Rear"
  );
  const brake_pressure_front = data.find(
    (item) => item.name === "Break Pressure Front"
  );
  const acc_1_travel = data.find(
    (item) => item.name === "Accelerator Travel 1"
  );
  const acc_2_travel = data.find(
    (item) => item.name === "Accelerator Travel 2"
  );

  let sensors = 0;
  if (
    (wheelSpeed_lf && wheelSpeed_rf && wheelSpeed_lb && wheelSpeed_rb) ||
    (brake_pressure_rear &&
      brake_pressure_front &&
      acc_1_travel &&
      acc_2_travel)
  ) {
    sensors = 1;
  } else if (break_conflict && break_conflict.value === 1) {
    sensors = 0;
  }

  const statusLabels = [
    { label: "Ready to Drive", dataName: "RTD Switch State" },
    { label: "Electrical Systems", dataName: "Motor Temperature" },
    { label: "Sensors", dataName: "Sensors" },
    { label: "Low Voltage", dataName: "Low Voltage" },
    { label: "Battery Systems", dataName: "Battery Temperature" },
  ];

  const dataMap = new Map(data.map((item) => [item.name, item]));

  const statusItems = statusLabels.map(({ label, dataName }, index) => {
    const dataItem = dataMap.get(dataName);
    let color = "";
    if (dataName === "Battery Temperature") {
      if ((batteryTemp && +batteryTemp.value > 40) || batteryTemp) {
        color = "#af1317";
      } else {
        color = "#4da14b";
      }
    } else if (dataName === "RTD Switch State") {
      if (rtd_switch_state && rtd_switch_state.value === 0) {
        color = "#af1317";
      } else {
        color = "#4da14b";
      }
    } else if (dataName === "Sensors") {
      if (sensors === 0) {
        color = "#af1317";
      } else {
        color = "#4da14b";
      }
    } else if (data !== null && dataName === "Low Voltage") {
      color = "#4da14b";
    } else if (dataName === "Motor Temperature") {
      if (!motorTemp || (vcu_error && vcu_error.value === 1)) {
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
      <div className="status_content">{statusItems}</div>
    </div>
  );
};

export default StatusBar;
