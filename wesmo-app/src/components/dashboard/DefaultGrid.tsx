/*
 * File: components/dashboard/defaultGrid.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A large component which holds all the container components of the dashboard.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

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

interface ErrorMessage {
  message: string;
  timestamp: number;
}

interface Props {
  data: DataItem[];
  timer: DataItem[];
}

const DefaultGrid: React.FC<Props> = ({ data, timer }) => {
  const motorTemp = data.find((item) => item.name === "Motor Temperature");
  const dcLinkVolts = data.find(
    (item) => item.name === "DC Link Circuit Voltage"
  );
  const motorSpeed = data.find((item) => item.name === "Motor Speed");
  const batteryCharge = data.find(
    (item) => item.name === "Battery State of Charge"
  );
  const batteryVoltage = data.find((item) => item.name === "Battery Voltage");
  const batteryCurrent = data.find((item) => item.name === "Battery Current");
  const batteryTemp = data.find((item) => item.name === "Battery Temperature");
  const batteryStatus = data.find((item) => item.name === "Battery Status");
  const predictiveCharge = data.find(
    (item) => item.name === "Predictive State of Charge"
  );
  const wheelSpeed_lf = data.find((item) => item.name === "Wheel Speed FL");
  const wheelSpeed_rf = data.find((item) => item.name === "Wheel Speed FR");
  const wheelSpeed_lb = data.find((item) => item.name === "Wheel Speed RL");
  const wheelSpeed_rb = data.find((item) => item.name === "Wheel Speed RR");
  const brake_pressure_rear = data.find(
    (item) => item.name === "Break Pressure Rear"
  );
  const brake_pressure_front = data.find(
    (item) => item.name === "Break Pressure Front"
  );
  const acc_1_travel = data.find(
    (item) => item.name === "Accelerator Travel 1"
  );
  const acc_2_travel = data.find(
    (item) => item.name === "Accelerator Travel 2"
  );
  const break_conflict = data.find((item) => item.name === "Break Conflict");
  const track_time = timer.find((item) => item.name === "Track Time");

  const [isPopUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState<React.ReactNode>(null);

  const togglePopUp = (content?: React.ReactNode) => {
    setPopUpContent(content ?? null);
    setPopUpVisible((prev) => !prev);
  };

  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([]);

  const handleError = (error: string) => {
    const currentTime = Date.now();

    setErrorMessages((prevErrors) => {
      const filteredErrors = prevErrors.filter(
        (errorObj) => currentTime - errorObj.timestamp < 30000
      );

      const isDuplicate = filteredErrors.some(
        (errorObj) => errorObj.message === error
      );

      if (!isDuplicate) {
        return [...filteredErrors, { message: error, timestamp: currentTime }];
      }
      return filteredErrors;
    });
  };

  if (break_conflict && break_conflict.value === 1) {
    handleError("Break conflict occured");
  } else if (wheelSpeed_lf && wheelSpeed_lf.value === 0) {
    handleError("Traction lost to front left wheel");
  } else if (wheelSpeed_rf && wheelSpeed_rf.value === 0) {
    handleError("Traction lost to front right wheel");
  } else if (wheelSpeed_lb && wheelSpeed_lb.value === 0) {
    handleError("Traction lost to rear left wheel");
  } else if (wheelSpeed_rb && wheelSpeed_rb.value === 0) {
    handleError("Traction lost to rear right wheel");
  }

  return (
    <div className="dashboard">
      <div className="track-time">Track Time: {track_time?.value ?? 0}</div>
      <PopUp isVisible={isPopUpVisible} onClose={() => setPopUpVisible(false)}>
        {popUpContent}
      </PopUp>
      <div>
        <StatusBar data={data} />
        <ErrorContainer data={errorMessages} />
      </div>
      <div>
        <div className="dashboard-row">
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(<HistoryList keyToDisplay="Track Time"></HistoryList>)
            }
          >
            {/* Warnings - Battery Status */}
            <StatusContainer
              textValue={batteryStatus?.name ?? "Warnings"}
              stateValue={+(batteryStatus?.value ?? 0)}
              onError={handleError}
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
              maxValue={+(batteryCharge?.max ?? 100)}
              unit={batteryCharge?.unit ?? "%"}
              onError={handleError}
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
              maxValue={+(motorTemp?.max ?? 100)}
              unit={motorTemp?.unit ?? "C"}
              onError={handleError}
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
              maxValue={+(batteryTemp?.max ?? 100)}
              unit={batteryTemp?.unit ?? "C"}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryList keyToDisplay="Velocity Actual Value"></HistoryList>
              )
            }
          >
            <NumberContainer
              text={dcLinkVolts?.name ?? "Velocity Actual Value"}
              value={+(dcLinkVolts?.value ?? 0)}
              unit={dcLinkVolts?.unit ?? "V"}
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
              maxValue={+(predictiveCharge?.max ?? 30)}
              unit={predictiveCharge?.unit ?? "Hours"}
              onError={handleError}
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
              onError={handleError}
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
            {/* Motor Speed - Just put motor speed as name its easier */}
            <BarContainer
              textValue={"Motor Speed"}
              currentValue={+(motorSpeed?.value ?? 0)}
              maxValue={+(motorSpeed?.max ?? 0)}
              minValue={+(motorSpeed?.min ?? 0)}
              unit={motorSpeed?.unit ?? "RPM"}
              onError={handleError}
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
            {/* Pedal Travel Angles & Break Pressures */}
            <QuadNumberContainer
              parameter1={acc_1_travel ?? null}
              parameter2={acc_2_travel ?? null}
              parameter3={brake_pressure_front ?? null}
              parameter4={brake_pressure_rear ?? null}
              onError={handleError}
            />
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default DefaultGrid;
