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
    if (size === 2) return "medium-grid-size";
    if (size === 3) return "large-grid-size";
    return "";
  }, [size]);

  return (
    <div
      className={`${containerClass} ${setGridState}`}
      style={{ backgroundColor: bkg }}
    >
      {children}
    </div>
  );
};

export default GridLayout;
