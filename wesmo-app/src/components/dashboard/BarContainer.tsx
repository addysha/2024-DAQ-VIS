import React, { CSSProperties, useMemo } from "react";
import "./BarContainer.css";

interface Props {
  textValue: string;
  currentValue: number;
  maxValue: number;
  unit?: string;
}

const BarContainer: React.FC<Props> = ({
  textValue,
  currentValue,
  maxValue,
  unit,
}) => {
  const setProgress = useMemo(() => {
    return Math.round((currentValue / maxValue) * 100);
  }, [currentValue, maxValue]);

  const setColour = useMemo(() => {
    let colour: string = "";
    if (setProgress >= maxValue * 100 * (2 / 3)) {
      colour = "#4da14b";
    } else if (setProgress >= maxValue * 100 * (1 / 3)) {
      colour = "#eac054";
    } else {
      colour = "#af1317";
    }
    return colour;
  }, [maxValue, setProgress]);

  const setBarStyle = useMemo(() => {
    const barStyle: CSSProperties = {
      width: `${setProgress}%`,
      backgroundColor: setColour,
    };
    return barStyle;
  }, [setProgress, setColour]);

  return (
    <div className="bar_parent">
      <div>
        <p className="bar_text-label">{textValue}</p>
      </div>
      <div className="bar_container">
        <span style={setBarStyle}></span>
      </div>
      <p className="bar_text-value">
        {setProgress}
        <span>{unit}</span>
      </p>
    </div>
  );
};

export default BarContainer;
