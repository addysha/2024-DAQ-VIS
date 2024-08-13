import React from "react";
import "./NumberContainer.css";

interface Parameter {
  text: string;
  value: number | string;
  unit?: string;
}

interface Props {
  parameterOne: Parameter;
  bkg?: string;
  lightText?: boolean;
  warning_colour?: "good" | "average" | "warning" | "critical";
}

const NumberContainer: React.FC<Props> = ({
  parameterOne,
  bkg = "#ffffff",
  lightText = false,
  warning_colour = "good",
}) => {
  const textColourClass = lightText ? "text--light" : "text--dark";
  const colourClass = `number_value_colour ${warning_colour}`;

  return (
    <div className="number__container">
      <p className={`number__text-label ${textColourClass}`}>
        {parameterOne?.text}
      </p>
      <div className={`number_value_colour ${colourClass}`}>
        <p className={`number__text-value ${textColourClass}`}>
          {parameterOne?.value}
          <span>{parameterOne?.unit}</span>
        </p>
      </div>
    </div>
  );
};

export default NumberContainer;
