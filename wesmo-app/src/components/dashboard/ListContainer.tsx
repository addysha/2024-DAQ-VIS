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
import { HistoricalData } from "./HistoryList";

interface Props {
  log_data: HistoricalData;
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
    const listItems = log_data.map((item, index) => {
      const timestampDate = new Date(+item.timestamp);
      return (
        <li key={index}>
          {timestampDate
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$2")}
          &ensp;:&ensp;
          {item.value !== undefined ? item.value : "No value available"}
        </li>
      );
    });

    return (
      <div className="log">
        <div className="scolling_list">
          <ol reversed>{listItems}</ol>
        </div>
      </div>
    );
  }
};

export default Log;
