import React, { ReactNode, useMemo } from "react";
import "./GridContainer.css";

interface Props {
  size?: number;
  bkg?: string;
  children?: ReactNode;
  onClick: () => void;
}

const GridContainer: React.FC<Props> = ({ size = 1, children, onClick }) => {
  const setGridState = useMemo(() => {
    if (size === 2) return "medium-grid-size";
    if (size === 3) return "large-grid-size";
    return "";
  }, [size]);

  return (
    <div
      className={`complication__container ${setGridState}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GridContainer;
