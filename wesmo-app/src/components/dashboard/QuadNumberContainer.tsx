import React, { CSSProperties, useMemo } from "react";
import "./QuadNumberContainer.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  parameter1: DataItem | null;
  parameter2: DataItem | null;
  parameter3: DataItem | null;
  parameter4: DataItem | null;
}

function getColour(maxValue, value): string {
  if (!maxValue) return "#3274B1";

  if (value >= maxValue * (2 / 3)) return "#4da14b";
  if (value >= maxValue * (1 / 3)) return "#eac054";
  return "#af1317";
}

const QuadNumberContainer: React.FC<Props> = ({
  parameter1,
  parameter2,
  parameter3,
  parameter4,
}) => {
  const parameters = [parameter1, parameter2, parameter3, parameter4];

  const barStyles = useMemo(() => {
    return parameters.map((param) => {
      const colour = param ? getColour(param.max, param.value) : "#3274B1";
      return { backgroundColor: colour };
    });
  }, [parameters]);

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
