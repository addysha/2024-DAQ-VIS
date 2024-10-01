/*
 * File: components/dashboard/ListContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A dynamic list container component which lists data information.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./ListContainer.css";
import { DataPoint } from "./HistoryList";

interface Props {
  [key: string]: DataPoint[];
}

export function formatUnixTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

const Log: React.FC<Props> = ({ log_data }) => {
  if (Object.keys(log_data).length === 0) {
    return (
      <div className="log">
        <p>No historical data found</p>
      </div>
    );
  }
  if (Object.keys(log_data).length !== 0) {
    const reversedList = [...log_data].reverse();

    const listItems = reversedList.map((item, index) => {
      const timestampDate = formatUnixTimestamp(item.timestamp);
      return (
        <li key={index}>
          {timestampDate}
          &ensp;:&ensp;
          {item.value !== undefined ? item.value : "No value available"}
        </li>
      );
    });

    return (
      <div className="log">
        <div className="scrolling_list">
          <ol reversed>{listItems}</ol>
        </div>
      </div>
    );
  }
};

export default Log;
