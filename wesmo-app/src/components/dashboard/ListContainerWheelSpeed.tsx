/*
 * File: components/dashboard/ListContainerQuad.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A dynamic list container component which lists 4 related data pieces.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */
import React from "react";
import "./ListContainer.css";
import { formatUnixTimestamp } from "./ListContainer.tsx";

interface HistoricalData {
  timestamp: number;
  "Wheel Speed RR": number;
  "Wheel Speed RL": number;
  "Wheel Speed FR": number;
  "Wheel Speed FL": number;
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
          &ensp;:&ensp; LF &ensp;:&ensp;
          {item["Wheel Speed FL"] !== undefined
            ? item["Wheel Speed FL"]
            : "No value available"}
          &ensp;:&ensp; RF &ensp;:&ensp;
          {item["Wheel Speed FR"] !== undefined
            ? item["Wheel Speed FR"]
            : "No value available"}{" "}
          <br />
          &ensp; &emsp; &emsp; &ensp;:&ensp; LB &ensp;:&ensp;
          {item["Wheel Speed RL"] !== undefined
            ? item["Wheel Speed RL"]
            : "No value available"}
          &ensp;:&ensp; RB &ensp;:&ensp;
          {item["Wheel Speed RR"] !== undefined
            ? item["Wheel Speed RR"]
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
