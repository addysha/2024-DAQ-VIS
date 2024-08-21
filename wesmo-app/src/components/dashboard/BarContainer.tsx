import React, { CSSProperties, useMemo } from "react";
import "./BarContainer.css";

interface Props {
  textValue: string;
  currentValue: number;
  maxValue: number;
  minValue?: number;
  unit?: string;
  lightText?: boolean;
}

const BarContainer: React.FC<Props> = ({
  textValue,
  currentValue,
  maxValue,
  minValue,
  unit,
  lightText,
}) => {
  if (minValue) {
    maxValue = maxValue - minValue;
    currentValue = currentValue - minValue;
  }
  const setPercent = useMemo(() => {
    return Math.round((currentValue / maxValue) * 100);
  }, [currentValue, maxValue]);

  const setColour = useMemo(() => {
    let colour: string = "";
    if (currentValue >= maxValue * (2 / 3)) {
      colour = "#4da14b";
    } else if (currentValue >= maxValue * (1 / 3)) {
      colour = "#eac054";
    } else {
      colour = "#af1317";
    }
    return colour;
  }, [maxValue, currentValue]);

  const setBarStyle = useMemo(() => {
    const barStyle: CSSProperties = {
      width: `${setPercent}%`,
      backgroundColor: setColour,
    };
    return barStyle;
  }, [setPercent, setColour]);

  const computedTextColourClass = lightText ? "text--light" : "text--dark";
  if (minValue) {
    currentValue = currentValue + minValue;
  }
  return (
    <div className="bar_parent">
      <div>
        <p className={`bar_text-label ${computedTextColourClass}`}>
          {textValue}
        </p>
      </div>
      <div className="bar_container">
        <span style={setBarStyle}></span>
      </div>
      <p className={`bar_text-value ${computedTextColourClass}`}>
        {currentValue}
        <span>{unit}</span>
      </p>
    </div>
  );
};

export default BarContainer;
