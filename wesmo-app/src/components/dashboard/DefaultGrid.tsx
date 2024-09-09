import React, { useState } from "react";
import "../../App.css";

import GridContainer from "../../components/dashboard/GridContainer.tsx";
import NumberContainer from "../../components/dashboard/NumberContainer.tsx";
import BarContainer from "../../components/dashboard/BarContainer.tsx";
import StatusBar from "../../components/dashboard/StatusBar.tsx";
import ErrorContainer from "../../components/dashboard/ErrorContainer.tsx";
import DialContainer from "./DialContainer.tsx";
import StatusContainer from "../../components/dashboard/StatusContainer.tsx";
import QuadNumberContainer from "./QuadNumberContainer.tsx";
import PopUp from "./PopUpContainer.tsx";

import { DataItem } from "../../pages/data.tsx";
import HistoryList from "./HistoryList.tsx";
import HistoryListWheelSpeed from "./HistoryListWheelSpeed.tsx";
import HistoryListBreaks from "./HistoryListBreaks.tsx";

interface Props {
  data: DataItem[];
}

const DefaultGrid: React.FC<Props> = ({ data }) => {
  // Connected to DB values
  const motorTemp = data.find((item) => item.name === "Motor Temperature");
  const motorSpeed = data.find((item) => item.name === "Motor Speed");

  const batteryCharge = data.find(
    (item) => item.name === "Battery State of Charge"
  );
  const predictiveCharge = data.find(
    (item) => item.name === "Predictive State of Charge"
  );
  const batteryVoltage = data.find((item) => item.name === "Battery Voltage");
  const batteryCurrent = data.find((item) => item.name === "Battery Current");
  const batteryPower = data.find((item) => item.name === "Battery Power");
  const batteryTemp = data.find((item) => item.name === "Battery Temperature");
  const batteryDCL = data.find((item) => item.name === "Battery DCL"); // discharge current limit
  const batteryStatus = data.find((item) => item.name === "Battery Status");

  // Not connected
  const pedalAngle1 = data.find((item) => item.name === "Pedal Angle 1");
  const pedalAngle2 = data.find((item) => item.name === "Pedal Angle 2");
  const wheelSpeed_lf = data.find((item) => item.name === "Wheel Speed LF");
  const wheelSpeed_rf = data.find((item) => item.name === "Wheel Speed RF");
  const wheelSpeed_lb = data.find((item) => item.name === "Wheel Speed LB");
  const wheelSpeed_rb = data.find((item) => item.name === "Wheel Speed RB");
  const trackTime = data.find((item) => item.name === "Track Time");
  const warnings = data.find((item) => item.name === "Warnings");
  const front_bp = data.find((item) => item.name === "Break Pressure Front");
  const rear_pb = data.find((item) => item.name === "Break Pressure Rear");

  const [isPopUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState<React.ReactNode>(null);

  const togglePopUp = (content?: React.ReactNode) => {
    setPopUpContent(content ?? null);
    setPopUpVisible((prev) => !prev);
  };
  return (
    <div className="dashboard">
      <PopUp isVisible={isPopUpVisible} onClose={() => setPopUpVisible(false)}>
        {popUpContent}
      </PopUp>
      <div>
        <StatusBar data={data} />
        <ErrorContainer data={data} />
      </div>
      <div>
        <div className="dashboard-row">
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(<HistoryList keyToDisplay="Track Time"></HistoryList>)
            }
          >
            {/* Track Time */}
            <NumberContainer
              text={trackTime?.name ?? "Track Time"}
              value={+(trackTime?.value ?? 0)}
              unit={trackTime?.unit ?? "s"}
            />
          </GridContainer>
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Battery State of Charge"></HistoryList>
              )
            }
          >
            {/* Battery State of Charge */}
            <BarContainer
              textValue={batteryCharge?.name ?? "Battery State of Charge"}
              currentValue={+(batteryCharge?.value ?? 0)}
              maxValue={+(batteryCharge?.max ?? 0)}
              unit={batteryCharge?.unit ?? "%"}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Battery Current"></HistoryList>
              )
            }
          >
            {/* Battery Current */}
            <NumberContainer
              text={batteryCurrent?.name ?? "Battery Current"}
              value={+(batteryCurrent?.value ?? 0)}
              unit={batteryCurrent?.unit ?? "V"}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Battery Voltage"></HistoryList>
              )
            }
          >
            {/* Battery Voltage */}
            <NumberContainer
              text={batteryVoltage?.name ?? "Battery Voltage"}
              value={+(batteryVoltage?.value ?? 0)}
              unit={batteryVoltage?.unit ?? "V"}
            />
          </GridContainer>
        </div>
        <div className="dashboard-row">
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Motor Temperature"></HistoryList>
              )
            }
          >
            {/* Motor Temperature */}
            <DialContainer
              textValue={motorTemp?.name ?? "Motor Temperature"}
              currentValue={+(motorTemp?.value ?? 0)}
              maxValue={+(motorTemp?.max ?? 0)}
              unit={motorTemp?.unit ?? "C"}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Battery Temperature"></HistoryList>
              )
            }
          >
            {/* Battery Temperature */}
            <DialContainer
              textValue={batteryTemp?.name ?? "Battery Temperature"}
              currentValue={+(batteryTemp?.value ?? 0)}
              maxValue={+(batteryTemp?.max ?? 0)}
              unit={batteryTemp?.unit ?? "C"}
            />
          </GridContainer>
          <GridContainer size={2}>
            {/* Warnings - Battery Status */}
            <StatusContainer
              textValue={batteryStatus?.name ?? "Warnings"}
              stateValue={+(batteryStatus?.value ?? 0)}
            />
          </GridContainer>
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Predictive State of Charge"></HistoryList>
              )
            }
          >
            {/* Predictive Battery State of Charge */}
            <BarContainer
              textValue={predictiveCharge?.name ?? "Predictive State of Charge"}
              currentValue={+(predictiveCharge?.value ?? 0)}
              maxValue={+(predictiveCharge?.max ?? 0)}
              unit={predictiveCharge?.unit ?? "%"}
            />
          </GridContainer>
        </div>
        <div className="dashboard-row">
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryListWheelSpeed
                  keyToDisplay={"Wheel Speeds"}
                ></HistoryListWheelSpeed>
              )
            }
          >
            {/* Wheel Speed */}
            <QuadNumberContainer
              parameter1={wheelSpeed_lf ?? null}
              parameter2={wheelSpeed_lb ?? null}
              parameter3={wheelSpeed_rf ?? null}
              parameter4={wheelSpeed_rb ?? null}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Motor Speed"></HistoryList>
              )
            }
          >
            {/* Motor Speed */}
            <BarContainer
              textValue={motorSpeed?.name ?? "Motor Speed"}
              currentValue={+(motorSpeed?.value ?? 0)}
              maxValue={+(motorSpeed?.max ?? 0)}
              minValue={+(motorSpeed?.min ?? 0)}
              unit={motorSpeed?.unit ?? "RPM"}
            />
          </GridContainer>
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryListBreaks
                  keyToDisplay={"Break Pressures"}
                ></HistoryListBreaks>
              )
            }
          >
            {/* Pedal Angles & Break Pressures */}
            <QuadNumberContainer
              parameter1={pedalAngle1 ?? null}
              parameter2={pedalAngle2 ?? null}
              parameter3={front_bp ?? null}
              parameter4={rear_pb ?? null}
            />
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default DefaultGrid;
