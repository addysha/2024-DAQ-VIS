import React, { CSSProperties, useMemo } from "react";
import "./NumberContainer.css";
import { DataItem } from "../../pages/data.tsx";

interface Props {
  parameter1: DataItem | null;
  parameter2: DataItem | null;
  lightText?: boolean;
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

const DoubleNumberContainer: React.FC<Props> = ({
  parameter1,
  parameter2,
  lightText,
}) => {
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

  const computedTextColourClass1 =
    setColour1 === "#eac054"
      ? "text--dark"
      : lightText
      ? "text--light"
      : "text--dark";

  const computedTextColourClass2 =
    setColour2 === "#eac054"
      ? "text--dark"
      : lightText
      ? "text--light"
      : "text--dark";

  return (
    <div className="number__container">
      <div className="parameter">
        <div>
          <p className={`number__text-label ${computedTextColourClass1}`}>
            {parameter1.name}
          </p>
          <div className="number_value_colour" style={setBarStyle1}>
            <p className={`number__text-value ${computedTextColourClass1}`}>
              {parameter1.value}
              <span>{parameter1.unit}</span>
            </p>
          </div>
        </div>
        <div>
          <p className={`number__text-label ${computedTextColourClass2}`}>
            {parameter2.name}
          </p>
          <div className="number_value_colour" style={setBarStyle2}>
            <p className={`number__text-value ${computedTextColourClass2}`}>
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
