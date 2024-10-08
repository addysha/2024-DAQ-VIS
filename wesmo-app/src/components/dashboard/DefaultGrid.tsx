/*
 * File: components/dashboard/defaultGrid.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A large component which holds all the container components of the dashboard.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useMemo, useReducer, useState } from "react";
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
import HistoryGraph from "./HistoryGraph.tsx";
import HistoryGraphWheelSpeed from "./HistoryGraphWheelSpeed.tsx";
import HistoryGraphPedals from "./HistoryGraphPedals.tsx";

interface ErrorMessage {
  message: string;
  timestamp: number;
}

interface Props {
  data: DataItem[];
  timer: DataItem[];
}

interface DataOptions {
  motorTemp?: DataItem;
  dcLinkVolts?: DataItem;
  motorSpeed?: DataItem;
  batteryCharge?: DataItem;
  batteryVoltage?: DataItem;
  batteryCurrent?: DataItem;
  batteryTemp?: DataItem;
  batteryStatus?: DataItem;
  predictiveCharge?: DataItem;
  wheelSpeed_lf?: DataItem;
  wheelSpeed_rf?: DataItem;
  wheelSpeed_lb?: DataItem;
  wheelSpeed_rb?: DataItem;
  brake_pressure_rear?: DataItem;
  brake_pressure_front?: DataItem;
  acc_1_travel?: DataItem;
  acc_2_travel?: DataItem;
  break_conflict?: DataItem;
  track_time?: DataItem;
}

const dataItemIdentical = (d1?: DataItem, d2?: DataItem) => {
  return (
    d1 &&
    d2 &&
    d1.value === d2.value &&
    d1.name === d2.name &&
    d1.unit === d2.unit
  );
};

const dataReducer = (
  state: DataOptions,
  newData: { data: DataItem[]; timer: DataItem[] }
) => {
  const data = newData.data;
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
  const track_time = newData.timer.find((item) => item.name === "Track Time");

  if (!dataItemIdentical(state.motorTemp, motorTemp)) {
    state.motorTemp = motorTemp;
  }

  if (!dataItemIdentical(state.dcLinkVolts, dcLinkVolts)) {
    state.dcLinkVolts = dcLinkVolts;
  }

  if (!dataItemIdentical(state.motorSpeed, motorSpeed)) {
    state.motorSpeed = motorSpeed;
  }

  if (!dataItemIdentical(state.batteryCharge, batteryCharge)) {
    state.batteryCharge = batteryCharge;
  }

  if (!dataItemIdentical(state.batteryVoltage, batteryVoltage)) {
    state.batteryVoltage = batteryVoltage;
  }

  if (!dataItemIdentical(state.batteryCurrent, batteryCurrent)) {
    state.batteryCurrent = batteryCurrent;
  }

  if (!dataItemIdentical(state.batteryTemp, batteryTemp)) {
    state.batteryTemp = batteryTemp;
  }

  if (!dataItemIdentical(state.batteryStatus, batteryStatus)) {
    state.batteryStatus = batteryStatus;
  }

  if (!dataItemIdentical(state.predictiveCharge, predictiveCharge)) {
    state.predictiveCharge = predictiveCharge;
  }

  if (!dataItemIdentical(state.wheelSpeed_lf, wheelSpeed_lf)) {
    state.wheelSpeed_lf = wheelSpeed_lf;
  }

  if (!dataItemIdentical(state.wheelSpeed_rf, wheelSpeed_rf)) {
    state.wheelSpeed_rf = wheelSpeed_rf;
  }

  if (!dataItemIdentical(state.wheelSpeed_lb, wheelSpeed_lb)) {
    state.wheelSpeed_lb = wheelSpeed_lb;
  }

  if (!dataItemIdentical(state.wheelSpeed_rb, wheelSpeed_rb)) {
    state.wheelSpeed_rb = wheelSpeed_rb;
  }

  if (!dataItemIdentical(state.brake_pressure_rear, brake_pressure_rear)) {
    state.brake_pressure_rear = brake_pressure_rear;
  }

  if (!dataItemIdentical(state.brake_pressure_front, brake_pressure_front)) {
    state.brake_pressure_front = brake_pressure_front;
  }

  if (!dataItemIdentical(state.acc_1_travel, acc_1_travel)) {
    state.acc_1_travel = acc_1_travel;
  }

  if (!dataItemIdentical(state.acc_2_travel, acc_2_travel)) {
    state.acc_2_travel = acc_2_travel;
  }

  if (!dataItemIdentical(state.break_conflict, break_conflict)) {
    state.break_conflict = break_conflict;
  }

  if (!dataItemIdentical(state.track_time, track_time)) {
    state.track_time = track_time;
  }

  return state;
};

const DefaultGrid: React.FC<Props> = ({ data, timer }) => {
  const [memoData, dispatchData] = useReducer(dataReducer, {});

  useMemo(() => {
    dispatchData({ data, timer });
  }, [data, timer]);

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

  useMemo(() => {
    if (memoData.break_conflict && memoData.break_conflict.value === 1) {
      handleError("Break conflict occured");
    } else if (memoData.wheelSpeed_lf && memoData.wheelSpeed_lf.value === 0) {
      handleError("Traction lost to front left wheel");
    } else if (memoData.wheelSpeed_rf && memoData.wheelSpeed_rf.value === 0) {
      handleError("Traction lost to front right wheel");
    } else if (memoData.wheelSpeed_lb && memoData.wheelSpeed_lb.value === 0) {
      handleError("Traction lost to rear left wheel");
    } else if (memoData.wheelSpeed_rb && memoData.wheelSpeed_rb.value === 0) {
      handleError("Traction lost to rear right wheel");
    }
  }, [memoData]);

  return (
    <div className="dashboard">
      <div className="track-time">
        Track Time:{" "}
        {memoData.track_time
          ? (memoData.track_time.value as string).split(".")[0]
          : "00:00"}
      </div>
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
              togglePopUp(
                <HistoryGraph keyToDisplay="Battery Status"></HistoryGraph>
              )
            }
          >
            {/* Warnings - Battery Status */}
            <StatusContainer
              textValue={memoData.batteryStatus?.name ?? "Warnings"}
              stateValue={+(memoData.batteryStatus?.value ?? 0)}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Battery State of Charge"></HistoryGraph>
              )
            }
          >
            {/* Battery State of Charge */}
            <BarContainer
              textValue={
                memoData.batteryCharge?.name ?? "Battery State of Charge"
              }
              currentValue={+(memoData.batteryCharge?.value ?? 0)}
              maxValue={+(memoData.batteryCharge?.max ?? 100)}
              unit={memoData.batteryCharge?.unit ?? "%"}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Battery Current"></HistoryGraph>
              )
            }
          >
            {/* Battery Current */}
            <NumberContainer
              text={memoData.batteryCurrent?.name ?? "Battery Current"}
              value={+(memoData.batteryCurrent?.value ?? 0)}
              unit={memoData.batteryCurrent?.unit ?? "V"}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Battery Voltage"></HistoryGraph>
              )
            }
          >
            {/* Battery Voltage */}
            <NumberContainer
              text={memoData.batteryVoltage?.name ?? "Battery Voltage"}
              value={+(memoData.batteryVoltage?.value ?? 0)}
              unit={memoData.batteryVoltage?.unit ?? "V"}
            />
          </GridContainer>
        </div>
        <div className="dashboard-row">
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Motor Temperature"></HistoryGraph>
              )
            }
          >
            {/* Motor Temperature */}
            <DialContainer
              textValue={memoData.motorTemp?.name ?? "Motor Temperature"}
              currentValue={+(memoData.motorTemp?.value ?? 0)}
              maxValue={+(memoData.motorTemp?.max ?? 100)}
              unit={memoData.motorTemp?.unit ?? "C"}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Battery Temperature"></HistoryGraph>
              )
            }
          >
            {/* Battery Temperature */}
            <DialContainer
              textValue={memoData.batteryTemp?.name ?? "Battery Temperature"}
              currentValue={+(memoData.batteryTemp?.value ?? 0)}
              maxValue={+(memoData.batteryTemp?.max ?? 100)}
              unit={memoData.batteryTemp?.unit ?? "C"}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="DC Link Circuit Voltage"></HistoryGraph>
              )
            }
          >
            <NumberContainer
              text={memoData.dcLinkVolts?.name ?? "DC Link Circuit Voltage"}
              value={+(memoData.dcLinkVolts?.value ?? 0)}
              unit={memoData.dcLinkVolts?.unit ?? "V"}
            />
          </GridContainer>
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Predictive State of Charge"></HistoryGraph>
              )
            }
          >
            {/* Predictive Battery State of Charge */}
            <BarContainer
              textValue={
                memoData.predictiveCharge?.name ?? "Predictive State of Charge"
              }
              currentValue={+(memoData.predictiveCharge?.value ?? 0)}
              maxValue={+(memoData.predictiveCharge?.max ?? 30)}
              unit={memoData.predictiveCharge?.unit ?? "Hours"}
              onError={handleError}
            />
          </GridContainer>
        </div>
        <div className="dashboard-row">
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryGraphWheelSpeed
                  keyToDisplay={"Wheel Speeds"}
                ></HistoryGraphWheelSpeed>
              )
            }
          >
            {/* Wheel Speed */}
            <QuadNumberContainer
              parameter1={memoData.wheelSpeed_lf ?? null}
              parameter2={memoData.wheelSpeed_lb ?? null}
              parameter3={memoData.wheelSpeed_rf ?? null}
              parameter4={memoData.wheelSpeed_rb ?? null}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={2}
            onClick={() =>
              togglePopUp(
                <HistoryGraph keyToDisplay="Motor Speed"></HistoryGraph>
              )
            }
          >
            {/* Motor Speed - Just put motor speed as name its easier */}
            <BarContainer
              textValue={"Motor Speed"}
              currentValue={+(memoData.motorSpeed?.value ?? 0)}
              maxValue={+(memoData.motorSpeed?.max ?? 5200)}
              minValue={+(memoData.motorSpeed?.min ?? 0)}
              unit={memoData.motorSpeed?.unit ?? "RPM"}
              onError={handleError}
            />
          </GridContainer>
          <GridContainer
            size={3}
            onClick={() =>
              togglePopUp(
                <HistoryGraphPedals
                  keyToDisplay={"Brakes and APPS"}
                ></HistoryGraphPedals>
              )
            }
          >
            {/* Pedal Travel Angles & Break Pressures */}
            <QuadNumberContainer
              parameter1={memoData.acc_1_travel ?? null}
              parameter2={memoData.acc_2_travel ?? null}
              parameter3={memoData.brake_pressure_front ?? null}
              parameter4={memoData.brake_pressure_rear ?? null}
              onError={handleError}
            />
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default DefaultGrid;
