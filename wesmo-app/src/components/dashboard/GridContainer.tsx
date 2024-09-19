/*
 * File: components/dashboard/GridContainer.tsx
 * Author: Hannah Murphy
 * Date: 2024
 * Description: A container component which creates the background for a component of a given size.
 *
 * Copyright (c) 2024 WESMO. All rights reserved.
 * This code is part of the  WESMO Data Acquisition and Visualisation Project.
 */

import React, { ReactNode, useMemo } from "react";
import "./GridContainer.css";

interface Props {
  size?: number;
  bkg?: string;
  children?: ReactNode;
  onClick?: () => void;
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
