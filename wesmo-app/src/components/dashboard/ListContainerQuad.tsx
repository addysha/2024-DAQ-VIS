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
