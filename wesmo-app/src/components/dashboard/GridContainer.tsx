import React, { ReactNode, useMemo } from "react";
import "./GridContainer.css";

interface Props {
  size?: number;
  bkg?: string;
  children?: ReactNode;
}

const GridContainer: React.FC<Props> = ({ size = 1, children }) => {
  const setGridState = useMemo(() => {
    if (size === 2) return "medium-grid-size";
    if (size === 3) return "large-grid-size";
    return "";
  }, [size]);

  return (
    <div className={`complication__container ${setGridState}`}>{children}</div>
  );
};

export default GridContainer;
