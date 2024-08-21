import React, { useState, useEffect } from "react";
import "../../App.css";

import GridContainer from "../../components/dashboard/GridContainer.tsx";
import NumberContainer from "../../components/dashboard/NumberContainer.tsx";
import BarContainer from "../../components/dashboard/BarContainer.tsx";
import StatusBar from "../../components/dashboard/StatusBar.tsx";
import DialContainer from "../../components/dashboard/FullDialContainer.tsx";
import StatusContainer from "../../components/dashboard/StatusContainer.tsx";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  data: DataItem[];
}

const DefaultGrid: React.FC<Props> = ({ data }) => {
  const batteryCharge = data.find(
    (item) => item.name === "Battery State of Charge"
  );
  const motorTemp = data.find((item) => item.name === "Motor Temperature");
  const motorSpeed = data.find((item) => item.name === "Motor Speed");
  const batteryVoltage = data.find((item) => item.name === "Battery Voltage");
  const batteryCurrent = data.find((item) => item.name === "Battery Current");
  const batteryTemp = data.find((item) => item.name === "Battery Temperature");

  return (
    <div className="dashboard">
      <StatusBar />
      <div className="dashboard-row">
        <GridContainer size={3} bkg="#706B6B">
          {/* Battery State of Charge */}
          <BarContainer
            textValue={batteryCharge?.name ?? "Battery State of Charge"}
            currentValue={+(batteryCharge?.value ?? 0)}
            maxValue={+(batteryCharge?.max ?? 0)}
            unit={batteryCharge?.unit ?? "%"}
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          {/* Motor Temperature */}
          <DialContainer
            textValue={motorTemp?.name ?? "Motor Temperature"}
            currentValue={+(motorTemp?.value ?? 0)}
            maxValue={+(motorTemp?.max ?? 0)}
            unit={motorTemp?.unit ?? "C"}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          {/* Motor Speed */}
          <BarContainer
            textValue={motorSpeed?.name ?? "Motor Speed"}
            currentValue={+(motorSpeed?.value ?? 0)}
            maxValue={+(motorSpeed?.max ?? 0)}
            minValue={+(motorSpeed?.min ?? 0)}
            unit={motorSpeed?.unit ?? "RPM"}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#706B6B">
          {/* Battery Voltage */}
          <NumberContainer
            text={batteryVoltage?.name ?? "Battery Voltage"}
            value={+(batteryVoltage?.value ?? 0)}
            unit={batteryVoltage?.unit ?? "V"}
            lightText={true}
          />
        </GridContainer>
      </div>
      <div className="dashboard-row">
        <GridContainer size={2} bkg="#D9D9D9">
          {/* Battery Temperature */}
          <DialContainer
            textValue={batteryTemp?.name ?? "Battery Temperature"}
            currentValue={+(batteryTemp?.value ?? 0)}
            maxValue={+(batteryTemp?.max ?? 0)}
            unit={batteryTemp?.unit ?? "C"}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          {/* Battery Current */}
          <NumberContainer
            text={batteryCurrent?.name ?? "Battery Current"}
            value={+(batteryCurrent?.value ?? 0)}
            unit={batteryCurrent?.unit ?? "V"}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#706B6B"></GridContainer>
        <GridContainer size={3} bkg="#D9D9D9"></GridContainer>
      </div>
      <div className="dashboard-row">
        <GridContainer size={2} bkg="#706B6B"></GridContainer>
        <GridContainer size={3} bkg="#706B6B"></GridContainer>
        <GridContainer size={2} bkg="#D9D9D9"></GridContainer>
        <GridContainer size={2} bkg="#706B6B"></GridContainer>
      </div>
    </div>
  );
};

export default DefaultGrid;
