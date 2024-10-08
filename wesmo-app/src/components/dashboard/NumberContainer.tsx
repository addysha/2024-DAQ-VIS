/*
 * File: components/dashboard/NumberContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component a single numerical data piece.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { CSSProperties, useMemo, useEffect } from "react";
import "./NumberContainer.css";

interface Props {
  text: string;
  value: number;
  unit?: string;
  maxValue?: number;
  onError?: (error: string) => void;
}

const NumberContainer: React.FC<Props> = ({
  text,
  value,
  unit,
  maxValue,
  onError,
}) => {
  const setColour = useMemo(() => {
    let colour: string = "";
    if (maxValue) {
      if (value >= maxValue * (2 / 3)) {
        colour = "#4da14b";
      } else if (value >= maxValue * (1 / 3)) {
        colour = "#eac054";
      } else {
        colour = "#af1317";
      }
    } else {
      colour = "#3274B1";
    }
    return colour;
  }, [maxValue, value]);

  const setBarStyle = useMemo(() => {
    const barStyle: CSSProperties = {
      backgroundColor: setColour,
    };
    return barStyle;
  }, [setColour]);

  useMemo(() => {
    if (setColour === "#af1317" && onError) {
      onError(`${text}: Critical`);
    } else if (setColour === "#eac054" && onError) {
      onError(`${text}: Warning`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setColour, text]);

  return (
    <div className="number__container">
      <p className="number__text-label">{text}</p>
      <div className="number_value_colour" style={setBarStyle}>
        <p className="number__text-value">
          {value}
          <span>{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default NumberContainer;
