import React, { CSSProperties, useMemo } from "react";
import "./NumberContainer.css";

interface Parameter {
  text: string;
  value: number;
  unit?: string;
  maxValue: number;
}

interface Props {
  parameterOne: Parameter;
  lightText?: boolean;
  warning_colour?: "good" | "average" | "warning" | "critical";
}

const NumberContainer: React.FC<Props> = ({
  parameterOne,
  lightText = false,
}) => {
  const setColour = useMemo(() => {
    let colour: string = "";
    console.log(parameterOne?.value, parameterOne?.maxValue);
    if (parameterOne?.value >= parameterOne?.maxValue * (2 / 3)) {
      colour = "#4da14b";
    } else if (parameterOne?.value >= parameterOne?.maxValue * (1 / 3)) {
      colour = "#eac054";
    } else {
      colour = "#af1317";
    }
    return colour;
  }, [parameterOne?.maxValue, parameterOne?.value]);

  const setBarStyle = useMemo(() => {
    const barStyle: CSSProperties = {
      backgroundColor: setColour,
    };
    return barStyle;
  }, [setColour]);

  const textColourClass = lightText ? "text--light" : "text--dark";

  return (
    <div className="number__container">
      <p className={`number__text-label ${textColourClass}`}>
        {parameterOne?.text}
      </p>
      <div className="number_value_colour" style={setBarStyle}>
        <p className={`number__text-value ${textColourClass}`}>
          {parameterOne?.value}
          <span>{parameterOne?.unit}</span>
        </p>
      </div>
    </div>
  );
};

export default NumberContainer;
