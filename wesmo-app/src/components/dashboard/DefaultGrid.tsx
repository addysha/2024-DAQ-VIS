import React from "react";
import "../../App.css";

import GridContainer from "../../components/dashboard/GridContainer.tsx";
import NumberContainer from "../../components/dashboard/NumberContainer.tsx";
import BarContainer from "../../components/dashboard/BarContainer.tsx";
import StatusBar from "../../components/dashboard/StatusBar.tsx";
import DialContainer from "./DialContainer.tsx";
import StatusContainer from "../../components/dashboard/StatusContainer.tsx";
import { DataItem } from "../../pages/data.tsx";
import DoubleNumberContainer from "./DoubleNumberContainer.tsx";
import QuadNumberContainer from "./QuadNumberContainer.tsx";

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
  const pedalAngle1 = data.find((item) => item.name === "Pedal Angle 1");
  const pedalAngle2 = data.find((item) => item.name === "Pedal Angle 2");
  const wheelSpeed = data.find((item) => item.name === "Wheel Speed");
  const trackTime = data.find((item) => item.name === "Track Time");
  const warnings = data.find((item) => item.name === "Warnings");
  const front_bp = data.find((item) => item.name === "Break Pressure Front");
  const rear_pb = data.find((item) => item.name === "Break Pressure Rear");

  return (
    <div className="dashboard">
      <div>
        <StatusBar data={data} />
      </div>
      <div>
        <div className="dashboard-row">
          <GridContainer size={3}>
            {/* Battery State of Charge */}
            <BarContainer
              textValue={batteryCharge?.name ?? "Battery State of Charge"}
              currentValue={+(batteryCharge?.value ?? 0)}
              maxValue={+(batteryCharge?.max ?? 0)}
              unit={batteryCharge?.unit ?? "%"}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Motor Temperature */}
            <DialContainer
              textValue={motorTemp?.name ?? "Motor Temperature"}
              currentValue={+(motorTemp?.value ?? 0)}
              maxValue={+(motorTemp?.max ?? 0)}
              unit={motorTemp?.unit ?? "C"}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Motor Speed */}
            <BarContainer
              textValue={motorSpeed?.name ?? "Motor Speed"}
              currentValue={+(motorSpeed?.value ?? 0)}
              maxValue={+(motorSpeed?.max ?? 0)}
              minValue={+(motorSpeed?.min ?? 0)}
              unit={motorSpeed?.unit ?? "RPM"}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Battery Voltage */}
            <NumberContainer
              text={batteryVoltage?.name ?? "Battery Voltage"}
              value={+(batteryVoltage?.value ?? 0)}
              unit={batteryVoltage?.unit ?? "V"}
            />
          </GridContainer>
        </div>
        <div className="dashboard-row">
          <GridContainer size={2}>
            {/* Battery Temperature */}
            <DialContainer
              textValue={batteryTemp?.name ?? "Battery Temperature"}
              currentValue={+(batteryTemp?.value ?? 0)}
              maxValue={+(batteryTemp?.max ?? 0)}
              unit={batteryTemp?.unit ?? "C"}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Battery Current */}
            <NumberContainer
              text={batteryCurrent?.name ?? "Battery Current"}
              value={+(batteryCurrent?.value ?? 0)}
              unit={batteryCurrent?.unit ?? "V"}
            />
          </GridContainer>
          <GridContainer size={2}></GridContainer>
          <GridContainer size={3}>
            {/* Pedal Angles */}
            <DoubleNumberContainer
              parameter1={pedalAngle1 ?? null}
              parameter2={pedalAngle2 ?? null}
            />
          </GridContainer>
        </div>
        <div className="dashboard-row">
          <GridContainer size={2}>
            {/* Wheel Speed */}
            <NumberContainer
              text={wheelSpeed?.name ?? "Wheel Speed"}
              value={+(wheelSpeed?.value ?? 0)}
              maxValue={+(wheelSpeed?.max ?? 0)}
              unit={wheelSpeed?.unit ?? "RPM"}
            />
          </GridContainer>
          <GridContainer size={3}>
            {/* Break Pressures */}
            {/* <DoubleNumberContainer
              parameter1={front_bp ?? null}
              parameter2={rear_pb ?? null}
            /> */}
            <QuadNumberContainer
              parameter1={front_bp ?? null}
              parameter2={rear_pb ?? null}
              parameter3={front_bp ?? null}
              parameter4={rear_pb ?? null}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Track Time */}
            <NumberContainer
              text={trackTime?.name ?? "Track Time"}
              value={+(trackTime?.value ?? 0)}
              unit={trackTime?.unit ?? "s"}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Warnings */}
            <StatusContainer
              textValue={warnings?.name ?? "Warnings"}
              stateValue={+(warnings?.value ?? 0)}
            />
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default DefaultGrid;
