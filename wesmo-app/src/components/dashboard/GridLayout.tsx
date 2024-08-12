import React, { ReactNode, useMemo } from "react";
import "./GridLayout.css";

interface Props {
  size?: number;
  bkg?: string;
  lightText?: boolean;
  children?: ReactNode;
}

const GridLayout: React.FC<Props> = ({
  size = 1,
  bkg = "#ffffff",
  lightText = false,
  children,
}) => {
  const containerClass = "complication__container";

  const setGridState = useMemo(() => {
    if (size === 1) return "";
    return size === 2 ? "medium-grid-size" : "large-grid-size";
  }, [size]);

  return (
    <div
      className={`${containerClass} ${setGridState}`}
      style={{ backgroundColor: bkg }}
      data-tilt
      data-tilt-glare
      data-tilt-max-glare="0.5"
      data-tilt-max="20"
    >
      {children}
    </div>
  );
};

export default GridLayout;
