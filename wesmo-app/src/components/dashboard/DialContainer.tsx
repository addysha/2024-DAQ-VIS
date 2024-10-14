/*
 * File: components/dashboard/DialContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component with a colour dial displaying a data value.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useEffect, useMemo } from "react";
import "./DialContainer.css";

interface Props {
  textValue: string;
  currentValue: number;
  maxValue: number;
  unit?: string;
  highGood?: boolean;
  onError?: (error: string) => void;
}

const ProgressDial: React.FC<Props> = ({
  textValue,
  currentValue = 0,
  maxValue = 100,
  unit,
  highGood = false,
  onError,
}) => {
  const size = 120;
  const radius = (size - 18) / 2;
  const circumference = 2 * Math.PI * radius;

  const setColour = useMemo(() => {
    let colour: string = "";

    if (highGood) {
      if (currentValue >= (maxValue * 2) / 3) {
        colour = "#4da14b";
      } else if (currentValue >= (maxValue * 1) / 3) {
        colour = "#eac054";
      } else {
        colour = "#af1317";
      }
      return colour;
    } else {
      if (currentValue <= (maxValue * 1) / 3) {
        colour = "#4da14b";
      } else if (currentValue <= (maxValue * 2) / 3) {
        colour = "#eac054";
      } else {
        colour = "#af1317";
      }
      return colour;
    }
  }, [currentValue, highGood, maxValue]);

  useEffect(() => {
    if (setColour === "#af1317" && onError) {
      onError(`${textValue}: Critical`);
    } else if (setColour === "#eac054" && onError) {
      onError(`${textValue}: Warning`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setColour, textValue]);

  const offset = useMemo(() => {
    return circumference - (currentValue / maxValue) * circumference;
  }, [currentValue, maxValue, circumference]);

  return (
    <div className="progress-dial-wrapper">
      <p className="dial_text-label">{textValue}</p>
      <div className="progress-dial-container">
        <div>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              className="progress-dial-background"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={14}
            />
            <circle
              className="progress-dial-foreground"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={setColour}
              strokeWidth={14}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="progress-dial-text"
            >
              {currentValue}
              {`${unit}`}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProgressDial;
