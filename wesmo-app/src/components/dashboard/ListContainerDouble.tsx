/*
 * File: components/dashboard/ListContainerDouble.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A dynamic list container component which lists 2 related data pieces.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React from "react";
import "./ListContainer.css";

interface HistoricalData {
  timestamp: number;
  front: number;
  rear: number;
}

interface Props {
  data: HistoricalData[];
}

const LogDouble: React.FC<Props> = ({ data }) => {
  const listItems = data.map((item, index) => {
    const timestampDate = new Date(+item.timestamp);

    return (
      <li key={index}>
        {timestampDate
          .toLocaleTimeString()
          .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$2")}
        &ensp;:&ensp; Front &ensp;:&ensp;
        {item.front !== undefined ? item.front : "No value available"}
        &ensp;:&ensp; Rear &ensp;:&ensp;
        {item.rear !== undefined ? item.rear : "No value available"}
      </li>
    );
  });

  return (
    <div className="log">
      <div className="scolling_list_double">
        <ol>{listItems}</ol>
      </div>
    </div>
  );
};

export default LogDouble;
