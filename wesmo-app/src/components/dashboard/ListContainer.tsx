import React from "react";
import "./ListContainer.css";

interface HistoricalData {
  timestamp: number;
  value: number;
}

interface Props {
  data: HistoricalData[];
}

const Log: React.FC<Props> = ({ data }) => {
  const listItems = data.map((item, index) => {
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
        <ol>{listItems}</ol>
      </div>
    </div>
  );
};

export default Log;
