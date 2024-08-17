import React, { useMemo } from "react";
import "./FullDialContainer.css";

interface Props {
  textValue: string;
  currentValue: number;
  maxValue: number;
  unit?: string;
  lightText?: boolean;
}

const ProgressDial: React.FC<Props> = ({
  textValue,
  currentValue = 0,
  maxValue = 100,
  unit,
  lightText = false,
}) => {
  const size = 150;
  const radius = (size - 18) / 2;
  const circumference = 2 * Math.PI * radius;

  const setColour = useMemo(() => {
    let colour: string = "";
    const progressPercent = (currentValue / maxValue) * 100;

    if (progressPercent >= 66) {
      colour = "#4da14b";
    } else if (progressPercent >= 33) {
      colour = "#eac054";
    } else {
      colour = "#af1317";
    }
    return colour;
  }, [currentValue, maxValue]);

  const offset = useMemo(() => {
    return circumference - (currentValue / maxValue) * circumference;
  }, [currentValue, maxValue, circumference]);

  const computedTextColourClass = lightText ? "text--light" : "text--dark";

  return (
    <div className="progress-dial-wrapper">
      <p className={`dial_text-label ${computedTextColourClass}`}>
        {textValue}
      </p>
      <div className="progress-dial-container">
        <div>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              className="progress-dial-background"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={18}
            />
            <circle
              className="progress-dial-foreground"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={setColour}
              strokeWidth={18}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className={`progress-dial-text ${computedTextColourClass}`}
            >
              {currentValue}
              {`${unit}`}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProgressDial;
