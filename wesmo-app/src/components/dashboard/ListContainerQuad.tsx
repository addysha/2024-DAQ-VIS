/*
 * File: components/dashboard/ListContainerQuad.tsx
 * Author: Hannah Murphy
 * Date: 2024-09-14
 * Description: A dynamic list container component which lists 4 related data pieces.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./ListContainer.css";

interface HistoricalData {
  timestamp: number;
  LF: number;
  RF: number;
  LB: number;
  RB: number;
}

interface Props {
  data: HistoricalData[];
}

const LogQuad: React.FC<Props> = ({ data }) => {
  const listItems = data.map((item, index) => {
    const timestampDate = new Date(+item.timestamp);

    return (
      <li key={index}>
        {timestampDate
          .toLocaleTimeString()
          .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$2")}
        &ensp;:&ensp; LF &ensp;:&ensp;
        {item.LF !== undefined ? item.LF : "No value available"}
        &ensp;:&ensp; RF &ensp;:&ensp;
        {item.RF !== undefined ? item.RF : "No value available"} <br /> &ensp;
        &emsp; &emsp; &ensp;:&ensp; LB &ensp;:&ensp;
        {item.LB !== undefined ? item.LB : "No value available"}
        &ensp;:&ensp; RB &ensp;:&ensp;
        {item.RB !== undefined ? item.RB : "No value available"}
      </li>
    );
  });

  return (
    <div className="log quad">
      <div className="scolling_list_double">
        <ol>{listItems}</ol>
      </div>
    </div>
  );
};

export default LogQuad;
