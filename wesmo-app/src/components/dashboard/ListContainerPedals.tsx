/*
 * File: components/dashboard/ListContainerPedals.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A list container component which lists 4 data pieces which are related to the pedal box.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */
import React from "react";
import "./ListContainer.css";
import { formatUnixTimestamp } from "./ListContainer.tsx";

interface HistoricalData {
  timestamp: number;
  "Break Pressure Rear": number;
  "Break Pressure Front": number;
  "Accelerator Travel 1": number;
  "Accelerator Travel 2": number;
}

interface Props {
  data: HistoricalData[];
}

const LogQuad: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="log">
        <p>No historical data found</p>
      </div>
    );
  }
  if (data && Object.keys(data).length > 1) {
    const listItems = data.map((item, index) => {
      const timestampDate = formatUnixTimestamp(item.timestamp);
      return (
        <li key={index}>
          {timestampDate}
          &ensp;:&ensp; BP Rear &ensp;:&ensp;
          {item["Break Pressure Rear"] !== undefined
            ? item["Break Pressure Rear"]
            : "No value available"}
          &ensp;:&ensp; BP Front &ensp;:&ensp;
          {item["Break Pressure Front"] !== undefined
            ? item["Break Pressure Front"]
            : "No value available"}{" "}
          <br />
          &ensp; &emsp; &emsp; &ensp;:&ensp; Acc 1 &ensp;:&ensp;
          {item["Accelerator Travel 1"] !== undefined
            ? item["Accelerator Travel 1"]
            : "No value available"}
          &ensp;:&ensp; Acc 2 &ensp;:&ensp;
          {item["Accelerator Travel 2"] !== undefined
            ? item["Accelerator Travel 2"]
            : "No value available"}
        </li>
      );
    });

    return (
      <div className="log quad">
        <div className="scrolling_list_double">
          <ol>{listItems}</ol>
        </div>
      </div>
    );
  }
};

export default LogQuad;
