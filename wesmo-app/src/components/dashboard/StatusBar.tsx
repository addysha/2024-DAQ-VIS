import React, { useMemo } from "react";
import "./StatusBar.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  data: DataItem[];
}

const StatusBar: React.FC<Props> = ({ data }) => {
  const batteryCharge = data.find(
    (item) => item.name === "Battery State of Charge"
  );
  const warnings = data.find((item) => item.name === "Warning");
  const gear = data.find((item) => item.name === "Gear");

  const setWarning = useMemo(() => {
    let RTD: string = "";
    let mech_fault: string = "";
    if (warnings) {
      if (warnings?.value === 1) {
        mech_fault = "warning";
        RTD = "critical";
      } else {
        mech_fault = "off";
        RTD = "good";
      }
    }
    return [RTD, mech_fault];
  }, [warnings]);

  const setGear = useMemo(() => {
    let go: string = "";
    let stop: string = "";
    if (gear) {
      if (gear?.value === 0) {
        go = "go";
        stop = "off";
      } else {
        stop = "stop";
        go = "off";
      }
    }
    return [stop, go];
  }, [gear]);

  const setBattery = useMemo(() => {
    let battery: string = "";
    if (batteryCharge) {
      if (+batteryCharge?.value < 25) {
        battery = "critical";
      } else if (+batteryCharge?.value < 60) {
        battery = "warning";
      } else {
        battery = "good";
      }
    }
    return battery;
  }, [batteryCharge]);

  return (
    <div className="status_bar">
      <div className="mode">
        <i className={`fa fa-d icon ${setGear[1]}`}></i>
        <br />
        <i className={`fa fa-n icon ${setGear[0]}`}></i>
      </div>
      <div className="warnings">
        <i className={`fa fa-car icon ${setWarning[0]}`}></i>
        <i className={`fa fa-wrench icon ${setWarning[1]}`}></i>
        <i className={`fa fa-battery-quarter icon ${setBattery}`}></i>
      </div>
    </div>
  );
};

export default StatusBar;
