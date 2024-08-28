import React, { CSSProperties, useMemo } from "react";
import "./NumberContainer.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  parameter1: DataItem | null;
  parameter2: DataItem | null;
}

function getColour(maxValue, value): string {
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
}

const DoubleNumberContainer: React.FC<Props> = ({ parameter1, parameter2 }) => {
  const setColour1 = getColour(parameter1.max, parameter1.value);
  const setColour2 = getColour(parameter2.max, parameter2.value);

  const setBarStyle1 = useMemo(() => {
    const barStyle: CSSProperties = {
      backgroundColor: setColour1,
    };
    return barStyle;
  }, [setColour1]);

  const setBarStyle2 = useMemo(() => {
    const barStyle: CSSProperties = {
      backgroundColor: setColour2,
    };
    return barStyle;
  }, [setColour2]);

  return (
    <div className="number__container">
      <div className="parameter">
        <div>
          <p className="number__text-label">{parameter1.name}</p>
          <div className="number_value_colour" style={setBarStyle1}>
            <p className="number__text-value">
              {parameter1.value}
              <span>{parameter1.unit}</span>
            </p>
          </div>
        </div>
        <div>
          <p className="number__text-label">{parameter2.name}</p>
          <div className="number_value_colour" style={setBarStyle2}>
            <p className="number__text-value">
              {parameter2.value}
              <span>{parameter2.unit}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleNumberContainer;
