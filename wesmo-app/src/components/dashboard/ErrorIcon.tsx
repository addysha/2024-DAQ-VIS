import React, { CSSProperties, useMemo } from "react";
import "./Icons.css";

interface Props {
  errors: boolean;
}

const ErrorIcon: React.FC<Props> = ({ errors }) => {
  const setColour = useMemo(() => {
    let colour: string = "";

    if (errors) {
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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/font-awesome.min.css"
      ></link>
      <i
        className="fa-solid fa-triangle-exclamation error_icon"
        style={setStyle}
      ></i>
    </div>
  );
};

export default ErrorIcon;
