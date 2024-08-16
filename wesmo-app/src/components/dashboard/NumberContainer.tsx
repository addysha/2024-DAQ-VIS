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
}

const NumberContainer: React.FC<Props> = ({
  parameterOne,
  lightText = false,
}) => {
  const setColour = useMemo(() => {
    let colour: string = "";

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

  const computedTextColourClass =
    setColour === "#eac054"
      ? "text--dark"
      : lightText
      ? "text--light"
      : "text--dark";

  return (
    <div className="number__container">
      <p className={`number__text-label ${computedTextColourClass}`}>
        {parameterOne?.text}
      </p>
      <div className="number_value_colour" style={setBarStyle}>
        <p className={`number__text-value ${computedTextColourClass}`}>
          {parameterOne?.value}
          <span>{parameterOne?.unit}</span>
        </p>
      </div>
    </div>
  );
};

export default NumberContainer;
