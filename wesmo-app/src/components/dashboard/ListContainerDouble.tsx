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
