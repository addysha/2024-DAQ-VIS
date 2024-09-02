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

  const statusLabels = [
    { label: "Ready to Drive", dataName: "readyToDrive" },
    { label: "Electrical Systems", dataName: "electricalSystems" },
    { label: "Sensors", dataName: "sensors" },
    { label: "Low Voltage", dataName: "lowVoltage" },
    { label: "High Voltage", dataName: "High Voltage" },
  ];

  const dataMap = new Map(data.map((item) => [item.name, item]));

  const statusItems = statusLabels.map(({ label, dataName }, index) => {
    const dataItem = dataMap.get(dataName);
    const color = dataItem ? getColorFromValue(dataItem.value) : "#bbb";

    const dotStyle: CSSProperties = {
      backgroundColor: color,
    };

    return (
      <div className="info" key={index}>
        <span className="dot" style={dotStyle}></span>
        <p>{label}</p>
      </div>
    );
  });

  return (
    <div className="status_bar">
      <div className="title">
        <h3>System Status</h3>
      </div>
      <br />
      {statusItems}
    </div>
  );
};

export default StatusBar;
