import React, { CSSProperties, useMemo } from "react";
import "./NumberContainer.css";

interface Props {
  text: string;
  value: number;
  unit?: string;
  maxValue?: number;
}

const NumberContainer: React.FC<Props> = ({ text, value, unit, maxValue }) => {
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
