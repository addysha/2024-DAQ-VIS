/*
 * File: components/dashboard/NumberContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component a single numerical data piece.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { useMemo } from "react";
import "./NumberContainer.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  parameter1: DataItem | null;
  parameter2: DataItem | null;
  onError?: (error: string) => void;
}

function getColour(maxValue, value): string {
  if (!maxValue) return "#3274B1";

  if (value >= maxValue * (2 / 3)) return "#4da14b";
  if (value >= maxValue * (1 / 3)) return "#eac054";
  return "#af1317";
}

const DoubleNumberContainer: React.FC<Props> = ({
  parameter1,
  parameter2,
  onError,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parameters = [parameter1, parameter2];

  const barStyles = useMemo(() => {
    return parameters.map((param) => ({
      backgroundColor: param ? getColour(param.max, param.value) : "#3274B1",
    }));
  }, [parameters]);

  parameters.forEach((param, index) => {
    if (barStyles[index].backgroundColor === "#af1317" && onError) {
      onError(`${param?.name}: Critical`);
    } else if (barStyles[index].backgroundColor === "#eac054" && onError) {
      onError(`${param?.name}: Warning`);
    }
  });

  return (
    <div className="number__container">
      <div className="parameter">
        {parameters.map((param, index) => (
          <div key={param?.name || index}>
            <p className="number__text-label">{param?.name}</p>
            <div className="number_value_colour" style={barStyles[index]}>
              <p className="number__text-value">
                {param?.value}
                <span>{param?.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoubleNumberContainer;
