import React, { useState, useEffect } from "react";
import "../../App.css";

import GridContainer from "../../components/dashboard/GridContainer.tsx";
import NumberContainer from "../../components/dashboard/NumberContainer.tsx";
import BarContainer from "../../components/dashboard/BarContainer.tsx";
import StatusBar from "../../components/dashboard/StatusBar.tsx";
import DialContainer from "./DialContainer.tsx";
import StatusContainer from "../../components/dashboard/StatusContainer.tsx";
import { DataItem } from "../../pages/data.tsx";
import DoubleNumberContainer from "./DoubleNumberContainer.tsx";

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
  const suspensionTravel = data.find(
    (item) => item.name === "Suspension Travel"
  );
  const pedalAngle1 = data.find((item) => item.name === "Pedal Angle 1");
  const pedalAngle2 = data.find((item) => item.name === "Pedal Angle 2");
  const wheelSpeed = data.find((item) => item.name === "Wheel Speed");
  const trackTime = data.find((item) => item.name === "Track Time");

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
        <GridContainer size={2} bkg="#706B6B">
          {/* Suspension Travel */}
          <BarContainer
            textValue={suspensionTravel?.name ?? "Suspension Travel"}
            currentValue={+(suspensionTravel?.value ?? 0)}
            maxValue={+(suspensionTravel?.max ?? 0)}
            unit={suspensionTravel?.unit ?? "mm"}
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={3} bkg="#D9D9D9">
          {/* Pedal Angles */}
          <DoubleNumberContainer
            parameter1={pedalAngle1 ?? null}
            parameter2={pedalAngle2 ?? null}
          />
        </GridContainer>
      </div>
      <div className="dashboard-row">
        <GridContainer size={2} bkg="#706B6B">
          {/* Wheel Speed */}
          <NumberContainer
            text={wheelSpeed?.name ?? "Wheel Speed"}
            value={+(wheelSpeed?.value ?? 0)}
            maxValue={+(wheelSpeed?.max ?? 0)}
            unit={wheelSpeed?.unit ?? "RPM"}
            lightText={true}
          />
        </GridContainer>
        <GridContainer size={3} bkg="#706B6B"></GridContainer>
        <GridContainer size={2} bkg="#D9D9D9">
          {/* Track Time */}
          <NumberContainer
            text={trackTime?.name ?? "Track Time"}
            value={+(trackTime?.value ?? 0)}
            maxValue={+(trackTime?.max ?? 0)}
            unit={trackTime?.unit ?? "s"}
          />
        </GridContainer>
        <GridContainer size={2} bkg="#706B6B"></GridContainer>
      </div>
    </div>
  );
};

export default DefaultGrid;
