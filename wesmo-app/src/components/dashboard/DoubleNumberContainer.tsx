import React, { useMemo } from "react";
import "./NumberContainer.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  parameter1: DataItem | null;
  parameter2: DataItem | null;
}

function getColour(maxValue, value): string {
  if (!maxValue) return "#3274B1";

  if (value >= maxValue * (2 / 3)) return "#4da14b";
  if (value >= maxValue * (1 / 3)) return "#eac054";
  return "#af1317";
}

const DoubleNumberContainer: React.FC<Props> = ({ parameter1, parameter2 }) => {
  const parameters = [parameter1, parameter2];

  const barStyles = useMemo(() => {
    return parameters.map((param) => ({
      backgroundColor: param ? getColour(param.max, param.value) : "#3274B1",
    }));
  }, [parameters]);

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
