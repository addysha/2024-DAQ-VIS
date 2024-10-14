/*
 * File: components/dashboard/QuadNumberContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component which holds 4 related data pieces.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useEffect, useMemo } from "react";
import "./QuadNumberContainer.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  parameter1: DataItem | null;
  parameter2: DataItem | null;
  parameter3: DataItem | null;
  parameter4: DataItem | null;
  conflict?: DataItem | null;
  onError?: (error: string) => void;
}

function getColour(maxValue, value, name): string {
  if (name.includes("Wheel Speed")) {
    if (value === 0) {
      return "#af1317";
    }
  }
  if (name.includes("Pedal Angle")) return "#3274B1";
  if (!maxValue) return "#3274B1";

  return "#af1317";
}

const QuadNumberContainer: React.FC<Props> = ({
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  conflict,
  onError,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parameters = useMemo(() => {
    return [parameter1, parameter2, parameter3, parameter4];
  }, [parameter1, parameter2, parameter3, parameter4]);

  const barStyles = useMemo(() => {
    return parameters.map((param) => {
      let colour = "";
      if (conflict && conflict.value === 1) {
        colour = "#af1317";
      } else {
        colour = param
          ? getColour(param.max, param.value, param.name)
          : "#3274B1";
      }
      return { backgroundColor: colour };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter1, parameter2, parameter3, parameter4, conflict]);

  useEffect(() => {
    if (onError) {
      parameters.forEach((param, index) => {
        if (barStyles[index].backgroundColor === "#af1317") {
          onError(`${param?.name}: Critical`);
        } else if (barStyles[index].backgroundColor === "#eac054") {
          onError(`${param?.name}: Warning`);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barStyles, parameters]);

  return (
    <div className="quad_number__container">
      <div className="quad_parameter">
        <div className="quad_top_values">
          {parameters.slice(0, 2).map((param, index) => (
            <div key={param?.name || index}>
              <p className="quad_number__text-label">{param?.name}</p>
              <div
                className="quad_number_value_colour"
                style={barStyles[index]}
              >
                <p className="quad_number__text-value">
                  {param?.value}
                  <span>{param?.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="quad_bottom_values">
          {parameters.slice(2).map((param, index) => (
            <div key={param?.name || index}>
              <p className="quad_number__text-label">{param?.name}</p>
              <div
                className="quad_number_value_colour"
                style={barStyles[index + 2]}
              >
                <p className="quad_number__text-value">
                  {param?.value}
                  <span>{param?.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuadNumberContainer;
