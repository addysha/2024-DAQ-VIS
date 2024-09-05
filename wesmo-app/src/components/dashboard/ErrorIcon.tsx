import React, { CSSProperties, useMemo } from "react";
import "./Icons.css";

interface Props {
  errors: string[];
}

const ErrorIcon: React.FC<Props> = ({ errors }) => {
  const setColour = useMemo(() => {
    let colour: string = "";

    if (errors.length > 0) {
      colour = "#eac054";
    } else {
      colour = "#bbb";
    }
    return colour;
  }, [errors]);

  const setStyle = useMemo(() => {
    const iconStyle: CSSProperties = {
      color: setColour,
    };
    return iconStyle;
  }, [setColour]);

  return (
    <div>
      <i
        className="fa-solid fa-triangle-exclamation error_icon"
        style={setStyle}
      ></i>
    </div>
  );
};

export default ErrorIcon;
